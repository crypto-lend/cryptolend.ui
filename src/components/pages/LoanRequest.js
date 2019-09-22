import React, { Component } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { Link } from 'react-router';
import axios from 'axios';
import Loader from 'react-loader';
import { LoanCreatorABI, LoanContractABI, LoanCreatorAddress, LoanContractAddress, StandardTokenABI, CollateralAddress } from '../Web3/abi';

class LoanRequest extends Component {
  constructor(){
    super();
    this.state = {
      collateral:true,
      loan:false,
      currency:false,
      borrow:false,
      durationView:false,
      mprView:false,
      monthlyInterest:false,
      borrowLess:false,
      loaded:true,
      alertLoanAmount:false,
      createRequestAlert:false,
      approveRequestAlert:false,
      transferCollateralAlert:false,
      transferCollateralSuccessAlert:false,
      transferCollateralFailAlert:false,
      loanRequestContractAddress:'',
      ropstenTransactionhash:'',
      collateralValue: 0,
      loanAmount: null,
      duration: null,
      monthlyInt: 0,
      durationArr:[30,60,90,120,150,180,210,240,270,300,330,360],
      durationStart:0,
      durationEnd:360,
      totalPremium:null,
      monthlyInstallment:null,
      loanAmountInput:'',
      apr:0,
      originationFee:1,
      collateralCurrency:'ETH',
      erc20_tokens :  ['TTT', 'CHIG', 'BNB', 'GTO', 'QKC', 'NEXO',
          'PAX','EGT',  'MANA','POWR',
          'TUSD','LAMB','CTXC','ENJ',
          'CELR','HTB','ICX',  'WTC',
          'USD', 'BTM','EDO', 'SXDT',
          'OMG','CRO','TOP','SXUT',
          'MEDX','ITC','REP','STO',
          'LINK','CMT','WAX',
          'MATIC','ELF', 'COSM',
          'HT','BZ','NAS',
          'FET','PPT','MCO'],
           collateralAddress : CollateralAddress
    };
  }


createLoanRequest = async (principal, duration, interest, collateralAddress, collateralAmount) => {
  const res = await window.ethereum.enable();
      console.log(res);
      // expected output: "Success!"
      const LoanCreator = window.web3.eth.contract(LoanCreatorABI).at(LoanCreatorAddress);
        LoanCreator.createNewLoanRequest( window.web3.toWei(principal), duration, interest, collateralAddress, collateralAmount, window.web3.toWei(0.1), {
        from: window.web3.eth.accounts[0]
      }, async (err, res) => {
        if(!err){
          // console.log("Transaction in process", res)
          const receipt = await this.getTransactionReceipt(res)
          console.log('receipt.logs[0].data',receipt.logs[0].data);
          let address = receipt.logs[0].data;
          address = address.split("000000000000000000000000");
          address = "0x" + address[2];
          console.log("Data Address: ",address);

          this.setState({createRequestAlert:true, monthlyInt:0, approveRequestAlert:true, loanRequestContractAddress:address,ropstenTransactionhash:receipt.transactionHash})


        }
      });
  }

  getTransactionReceipt = async (hash) => {
        let receipt = null;
        while (receipt === null) {
          // we are going to check every second if transation is mined or not, once it is mined we'll leave the loop
          receipt = await this.getTransactionReceiptPromise(hash);
          setTimeout(function(){ console.log('Every second'); }, 1000);
        }
        return receipt;
      };

  getTransactionReceiptPromise = (hash) => {

        // here we just promisify getTransactionReceipt function for convenience

        return new Promise(((resolve, reject) => {
            window.web3.eth.getTransactionReceipt(hash, function(err, data) {
                if (err !== null) reject(err);
                else resolve(data);
            });
        }));
      }


  approveRequest = (collateralAddress, loanContractAddress, collateralAmount) => {

    // Transaction 1 Approval

    var self = this;
    const tokenContractInstance = window.web3.eth.contract(StandardTokenABI).at(collateralAddress);
    tokenContractInstance.approve(loanContractAddress, collateralAmount, {
          from: window.web3.eth.accounts[0]
        },
        async (err, res) => {
          if (!err) {
            console.log(res);
            const receipt = await this.getTransactionReceipt(res)
            // console.log("Receipt : ",receipt);
            self.setState({approveRequestAlert:false, transferCollateralAlert:true})
          } else {}
    });
  }

  handleTransferCollateral = (loanContractAddress) => {
    // Transfer Collateral to Loan Contract
      console.log("loanContractAddress",loanContractAddress);

      var self = this;
      // Transaction 2 Transfer to Loan Contract

      const LoanInstance = window.web3.eth.contract(LoanContractABI).at(loanContractAddress);
      LoanInstance.transferCollateralToLoan({
        from: window.web3.eth.accounts[0]
          }, async (err, res) => {
          if(!err)
              console.log(res);
              const receipt = await this.getTransactionReceipt(res)
              console.log("Receipt : ",receipt);
              if(receipt)
                self.setState({transferCollateralAlert:false, transferCollateralSuccessAlert:true})
              else
                self.setState({transferCollateralAlert:false, transferCollateralFailAlert:true})

          });
  }


  handleMonthlyInterest = (e) => {

    const { loanAmount, monthlyInt, duration, totalPremium, monthlyInstallment, apr, originationFee } = this.state;

    if(e.target.value=='plus' && monthlyInt<5){
      this.setState({monthlyInt: monthlyInt + 0.25});
      let totalRepayment = ((loanAmount *  (monthlyInt + 0.25) * ((duration/30)+1)) / (2 * 100) )
      this.setState({monthlyInstallment : (((loanAmount *  (monthlyInt + 0.25) * ((duration/30)+1)) / (2 * duration/30 * 100) ) + loanAmount / (duration/30))})
      this.setState({totalPremium: totalRepayment});
      this.setState({apr: (totalRepayment / loanAmount) * 100})
      console.log("apr : ",apr, totalRepayment);
    }
    else if(e.target.value=='minus' && monthlyInt>0){
      this.setState({monthlyInt: monthlyInt - 0.25});
      let totalRepayment = ((loanAmount *  (monthlyInt - 0.25) * ((duration/30)+1)) / (2 * 100) )
      this.setState({monthlyInstallment : (((loanAmount *  (monthlyInt - 0.25) * ((duration/30)+1)) / (2 * duration/30 * 100) ) + loanAmount / (duration/30))})
      this.setState({totalPremium: totalRepayment});
      this.setState({apr: (totalPremium / loanAmount )  * 100})
    }
  }

  handleCollateralConversion = () => {
    let { collateralCurrency,collateralValue,loanAmount } = this.state;
    var self = this;
    if(collateralCurrency==='CHIG'){
      axios.get(`https://min-api.cryptocompare.com/data/price?fsym=TTT&tsyms=ETH`).then(function (response) {
        self.setState({loanAmount:response.data.ETH * collateralValue * 0.6});
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    else
      axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${collateralCurrency}&tsyms=ETH`).then(function (response) {
        self.setState({loanAmount:response.data.ETH * collateralValue * 0.6});
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setState({currency:false, borrow:true});
}

  render() {


    const { loanAmount, duration, monthlyInt, collateralAddress, collateralValue, collateralCurrency, collateral, erc20_tokens, loan, currency, borrow,
      durationView, durationArr, monthlyInterest, borrowLess, totalPremium, monthlyInstallment, originationFee, apr, alertLoanAmount,
      loanAmountInput, createRequestAlert, loanRequestContractAddress, ropstenTransactionhash, approveRequestAlert, transferCollateralAlert, transferCollateralSuccessAlert, transferCollateralFailAlert } = this.state;


    return (
      <div className="LoanRequest text-center">
      <Loader loaded={this.state.loaded}/>
        <header className="header-global">
          <nav id="navbar-main" className="navbar navbar-main navbar-expand-lg navbar-transparent navbar-light">
            <div className="container" style={{maxWidth: '1080px'}}>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar_global" aria-controls="navbar_global" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="navbar-collapse collapse" id="navbar_global">
                <div className="navbar-collapse-header">
                  <div className="row">

                    <div className="col-6 collapse-close">
                      <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbar_global" aria-controls="navbar_global" aria-expanded="false" aria-label="Toggle navigation">
                        <span></span>
                        <span></span>
                      </button>
                    </div>
                  </div>
                </div>
                <ul className="navbar-nav navbar-nav-hover align-items-lg-center">
                  <li className="nav-item dropdown">
                    <a href="/myloans" className="nav-link" data-toggle="dropdown" role="button">
                      <i className="ni ni-ui-04 d-lg-none"></i>
                      <span className="nav-link-inner--text">My Loans</span>
                    </a>
                  </li>
                  <li className="nav-item dropdown">
                    <a href="#" className="nav-link" data-toggle="dropdown" href="/request" role="button">
                      <i className="ni ni-collection d-lg-none"></i>
                      <span className="nav-link-inner--text">Create Loan Request</span>
                    </a>
                  </li>
                  <li className="nav-item dropdown">
                    <a href="#" className="nav-link" data-toggle="dropdown" href="/offer" role="button">
                      <i className="ni ni-ui-04 d-lg-none"></i>
                      <span className="nav-link-inner--text">Create Loan Offers</span>
                    </a>
                  </li>
                  <li className="nav-item dropdown">
                    <a href="#" className="nav-link" data-toggle="dropdown" href="/view-requests" role="button">
                      <i className="ni ni-collection d-lg-none"></i>
                      <span className="nav-link-inner--text">View All Request</span>
                    </a>
                  </li>
                  <li className="nav-item dropdown">
                    <a href="#" className="nav-link" data-toggle="dropdown" href="/view-offers" role="button">
                      <i className="ni ni-ui-04 d-lg-none"></i>
                      <span className="nav-link-inner--text">View All Offers</span>
                    </a>
                  </li>

                  <li className="nav-item dropdown">
                    <a href="#" className="nav-link" data-toggle="tooltip" title="Statistics" href="#" role="button">
                      <i className="fa fa-bar-chart" aria-hidden="true"></i>
                    </a>
                  </li>

                  <li className="nav-item dropdown">
                    <a href="#" className="nav-link" data-toggle="dropdown" href="#" role="button">
                      <span className="nav-link-inner--text"> <i className="fa fa-question-circle" aria-hidden="true"></i></span>
                    </a>
                    <div className="dropdown-menu">
                      <a href="#" className="dropdown-item">FAQ</a>
                      <a href="#" className="dropdown-item">Legal</a>
                      <a href="#" className="dropdown-item">Fees</a>
                      <a href="#" className="dropdown-item">Live Support</a>
                      <a href="#" className="dropdown-item">Submit Ticket</a>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <a href="#" className="nav-link" data-toggle="tooltip" title="Wallet" role="button">
                      <svg x="0px" y="0px" viewBox="0 0 24 24" space="preserve" width="24" height="16">
                        <g className="nc-icon-wrapper" fill="#444444">
                          <path fill="#fff" d="M23,4H4H3C2.449,4,2,3.551,2,3s0.449-1,1-1h15v1h2V1c0-0.552-0.448-1-1-1H3C1.343,0,0,1.343,0,3v17 c0,2.209,1.791,4,4,4h19c0.552,0,1-0.448,1-1V5C24,4.448,23.552,4,23,4z M18,16c-1.105,0-2-0.895-2-2c0-1.105,0.895-2,2-2 s2,0.895,2,2C20,15.105,19.105,16,18,16z">
                          </path>
                        </g>
                      </svg>
                    </a>
                  </li>
                  <li className="nav-item dropdown">
                    <a href="#" className="nav-link" data-toggle="tooltip" title="My account" href="#" role="button">
                      <i className="ni ni-circle-08" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li className="nav-item dropdown">
                    <ReactCountryFlag code="IN" svg />
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        <div className="position-relative">
          <section className="section-hero section-shaped my-0">
            <div className="shape shape-style-1 shape-primary">
              <span className="span-150"></span>
              <span className="span-50"></span>
              <span className="span-50"></span>
              <span className="span-75"></span>
              <span className="span-100"></span>
              <span className="span-75"></span>
              <span className="span-50"></span>
              <span className="span-100"></span>
              <span className="span-50"></span>
              <span className="span-100"></span>
            </div>
            <div className="container shape- d-flex align-items-center">
              <div className="col-lg-7">
                <div className="card">
                  <div className="card-header text-center">
                    <h5> New Loan Request</h5>
                  </div>
                  <div className="card-body"  style={{display:collateral?'block':'none'}}>
                    <div className="alert alert-primary alert-dismissible fade show" role="alert">
                      <span className="alert-text">Choose your collateral currency.</span>
                    </div>
                    <div className="row mt-5">
                    <div className="col-md-6" style={{marginTop:'25px', marginBottom:'85px', cursor:'pointer'}} onClick={()=>{this.setState({collateral:false, loan:true});}}>
                      <span className="btn-inner--text"><img style={{width:'25px'}} src="/assets/img/eth.png"/></span>
                      <br/>
                      <p>Ethereum</p>
                    </div>
                  <div className="col-md-4 form-group mt-3">
                    <label id="exampleFormControlSelect1">ERC20 TOKENS</label>
                      <select className="form-control" id="exampleFormControlSelect1" onClick={ (e)=>{
                        this.setState({collateralCurrency:e.target.value});
                      }}>
                      {
                        erc20_tokens.map((item,i) => {
                          return <option>{item}</option>;
                      })
                      }
                      </select>
                    </div>

                    </div>
                    <div className="btn-wrapper" style={{marginTop:'20px', cursor:'pointer'}} onClick={()=>{this.setState({collateral:false,loan:true})}}>
                      <a href="#" className="btn btn-primary btn-icon mb-3 mb-sm-0 m-5">
                        <span className="btn-inner--text">Next</span>
                      </a>
                    </div>
                    </div>
                  <div className="card-body" style={{display:loan?'block':'none'}}>
                    <div className="alert alert-primary alert-dismissible fade show" role="alert">
                      <span className="alert-text">Insert the collateral amount.</span>
                    </div>
                    <input className="form-control form-control-lg" type="text" placeholder={collateralCurrency} onChange={(e)=>{this.setState({collateralValue:e.target.value});}}/>
                    <div className="row">
                    <div className="col-md-6" style={{marginTop:'153px', cursor:'pointer'}} onClick={()=>{this.setState({collateral:true,loan:false})}}>
                      <a href="#" className="btn btn-primary btn-icon mb-3 mb-sm-0 m-5">
                        <span className="btn-inner--text">Back</span>
                      </a>
                    </div>
                    <div className="col-md-6" style={{marginTop:'153px', cursor:'pointer'}} onClick={()=>{
                      this.setState({loan:false, currency:true});
                    }}>
                      <a href="#" className="btn btn-primary btn-icon mb-3 mb-sm-0 m-5">
                        <span className="btn-inner--text">Next</span>
                      </a>
                      </div>
                    </div>
                  </div>

                  <div className="card-body"  style={{display:currency?'block':'none'}}>
                    <div className="alert alert-primary alert-dismissible fade show" role="alert">
                      <span className="alert-text">Choose your loan currency.</span>
                    </div>
                    <div className="btn-wrapper" style={{marginTop:'25px', marginBottom:'247px', cursor:'pointer'}}  onClick={this.handleCollateralConversion}>
                      <span className="btn-inner--text"><img style={{width:'25px'}} src="/assets/img/eth.png"/></span>
                      <br/>
                      <p>Ethereum</p>
                    </div>
                    <div className="btn-wrapper" style={{marginTop:'20px', cursor:'pointer'}} onClick={()=>{this.setState({currency:false, loan:true});}}>
                      <a href="#" className="btn btn-primary btn-icon mb-3 mb-sm-0 m-5">
                        <span className="btn-inner--text">Back</span>
                      </a>
                    </div>

                  </div>

                  <div className="card-body"style={{display:borrow?'block':'none'}}>
                    <div className="alert alert-primary alert-dismissible fade show" role="alert">
                      <span className="alert-text">Great! you can borrow :</span>
                    </div>

                    {borrowLess?
                      <div>
                      <input className="form-control form-control-lg" type="number" min="1" max={loanAmount} placeholder='Enter loan amount' Value={loanAmount} onChange={(e)=>{
                        if(e.target.value>loanAmount)
                          this.setState({alertLoanAmount:true, loanAmountInput:e.target.value});
                        else
                          this.setState({alertLoanAmount:false, loanAmountInput:e.target.value});
                      }}/>
                      {alertLoanAmount && <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <span className="alert-text">Please select less than or equal to {loanAmount}</span>
                        </div>}
                      </div>
                  :
                  <div>
                    <p style={{border:'solid grey 1px'}}>{loanAmount} ETH</p>
                    <a className="text-right" style={{cursor:'pointer'}} onClick={()=>{this.setState({borrowLess:true})}}>want to borrow less ?</a>
                  </div>
                }
                <div className="row">
                <div className="col-md-6" style={{marginTop:'153px', cursor:'pointer'}} onClick={()=>{this.setState({currency:true, borrow:false});}}>
                  <a href="#" className="btn btn-primary btn-icon mb-3 mb-sm-0 m-5">
                    <span className="btn-inner--text">Back</span>
                  </a>
                </div>
                    <div className="col-md-6" style={{marginTop:'153px', cursor:'pointer'}}
                    onClick={()=>{this.setState({durationView:true, borrow:false, loanAmount:borrowLess?loanAmountInput:loanAmount});
                    console.log('LOANAMOUNT : ', loanAmount);

                    }}>
                      <a href="#" className="btn btn-primary btn-icon mb-3 mb-sm-0 m-5">
                        <span className="btn-inner--text">Next</span>
                      </a>
                      </div>
                    </div>
                  </div>
                  <div className="card-body"  style={{display:durationView?'block':'none'}}>
                    <div className="alert alert-primary alert-dismissible fade show" role="alert">
                      <span className="alert-text">Define loan duration.</span>
                    </div>
                    <br/>

                    <div className="btn-wrapper" style={{marginTop:'85px', cursor:'pointer'}}>
                      {
                        durationArr.map((item,i)=>{
                          return <button id={i} type="button" className="btn btn-outline-primary" onClick={()=>{this.setState({duration:item})}}>{item}</button>;
                        })
                      }
                    </div>
                    <div className="row">
                    <div className="col-md-6" style={{marginTop:'20px', cursor:'pointer'}} onClick={()=>{this.setState({durationView:false, borrow:true});}}>
                      <a href="#" className="btn btn-primary btn-icon mb-3 mb-sm-0 m-5">
                        <span className="btn-inner--text">Back</span>
                      </a>
                    </div>
                    <div className="col-md-6" style={{marginTop:'20px', cursor:'pointer'}} onClick={()=>{this.setState({durationView:false,monthlyInterest:true})}}>
                      <a href="#" className="btn btn-primary btn-icon mb-3 mb-sm-0 m-5">
                        <span className="btn-inner--text">Next</span>
                      </a>
                    </div>
                    </div>
                  </div>

                  <div className="card-body"style={{display:monthlyInterest?'block':'none', marginBottom:monthlyInt?'123px':'260px'}}>
                    <div className="alert alert-primary alert-dismissible fade show" role="alert">
                      <span className="alert-text">Choose the monthly interest percentage for this loan.</span>
                    </div>


                    <div className="text-left">
                    <button className="btn btn-icon btn-primary" type="button" value="minus" onClick={this.handleMonthlyInterest}>
                      -
                    </button>
                    </div>
                    <div className="text-right">
                      <input className="form-control" type="text" value={monthlyInt} style={{width:'60px', marginTop: '-43px', marginLeft: '373px'}} id="example-time-input"/>
                    </div>
                    <div className="text-right" style={{marginTop: '-44px'}}>
                    <button className="btn btn-icon btn-primary" type="button" value="plus" onClick={this.handleMonthlyInterest}>
                      +
                    </button>
                    </div>

                    <div className="btn-wrapper" style={{marginTop:'20px', cursor:'pointer'}} onClick={()=>{this.setState({durationView:true,monthlyInterest:false})}}>
                      <a href="#" className="btn btn-primary btn-icon mb-3 mb-sm-0 m-5">
                        <span className="btn-inner--text">Back</span>
                      </a>
                    </div>


                  </div>
                  {monthlyInt?<div>
                  <div className="alert alert-primary alert-dismissible fade show text-left pl-3 " role="alert">
                    <span className="alert-text">Total premium for this loan : {totalPremium} ETH ({apr.toFixed(2)}% APR)</span>
                  </div>
                  <h6 className="text-left pl-3" style={{fontSize:"12px"}}>Monthly installment : {monthlyInstallment} ETH</h6>
                  <p className="text-left pl-3" style={{fontSize:"12px"}}>The first installment will include the loan origination fee</p>
                  <h6 className="text-left pl-3" style={{fontSize:"13px"}}><span>Origination fee : {originationFee}%</span></h6>
                  </div>
                  :''
                }
                </div>
              </div>
              <div className="col-md-5">
                <div className="card">
                  <div className="card-header text-center">
                    Overview
                  </div>
                  <div className="card-body text-left mt-5" style={{marginBottom:monthlyInt?'176px':'253px'}}>
                  {collateralValue ?
                    <div><p>Collateral : {collateralValue} {collateralCurrency}</p></div>
                    :<div><p>Collateral : (not set)</p></div>
                  }
                  {
                    loanAmount ? <div><p>Loan amount : {loanAmount} ETH </p></div>
                    :
                     <div><p>Loan amount : (not set)</p></div>
                  }
                  {
                    duration?<p>Duration : {duration} days</p>
                    :
                    <p>Duration : (not set)</p>
                  }
                  {
                    monthlyInt ?
                    <p>Monthly interest (MPR) : {monthlyInt} %</p>
                    :
                    <p>Monthly interest (MPR) : (not set)</p>
                  }

                  </div>
                  { monthlyInt?
                    <div className="btn-wrapper text-center mb-5 mt-5" onClick={()=>{
                      this.createLoanRequest(loanAmount,duration,monthlyInt*100,collateralAddress,collateralValue);
                      }}>
                      <br/>
                      <a href="#" className="btn btn-primary btn-icon ">
                        <span className="btn-inner--text">Create</span>
                      </a>
                    </div>
                    :''
                  }
                  { approveRequestAlert &&
                    <div className="alert alert-primary" role="alert">
                        <strong>Approve Transfer collateral of {collateralValue} {collateralCurrency} tokens</strong>
                    </div>
                  }
                  { approveRequestAlert &&

                  <button className="btn btn-primary" type="button" onClick={()=>{
                    this.approveRequest(collateralAddress, loanRequestContractAddress, collateralValue)
                    }}>
                    Approve
                  </button>}

                  { transferCollateralAlert &&
                    <div className="alert alert-primary" role="alert">
                        <strong>Transfer collateral of {collateralValue} {collateralCurrency} tokens</strong>
                    </div>
                  }
                  {transferCollateralAlert &&
                  <button className="btn btn-primary" type="button" onClick={()=>{
                    this.handleTransferCollateral(loanRequestContractAddress)
                    }}>
                    Transfer
                  </button>}
                  {transferCollateralFailAlert && <div className="alert alert-warning mt-2" style={{marginLeft:'-1.5%',width:'104.5%'}} role="alert">
                      Collateral transfer has failed.
                  </div>}
                  {transferCollateralSuccessAlert && <div className="alert alert-success mt-2" style={{marginLeft:'-1.5%',width:'104.5%'}} role="alert">
                      Collateral has been transferred successfully. Your loan request is waiting to be funded now!
                  </div>}
                </div>
              </div>
            </div>
          </section>
        </div>
        {createRequestAlert && <div className="alert alert-success" style={{marginLeft:'9.5%',width:'46.5%', marginTop:'-7%'}} role="alert">
              <strong>Congratulations! Loan Request is Created successfully!</strong>
          </div>}
        {createRequestAlert && <Link href={"https://ropsten.etherscan.io/tx/"+ropstenTransactionhash} style={{color:'#fff'}}  target='_blank'> Check transation on Ropsten </Link>}
      </div>
    );
  }
}

export default LoanRequest;

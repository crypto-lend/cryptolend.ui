import React, { Component } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { Link } from 'react-router-dom';
import '../../assets/vendor/font-awesome/css/font-awesome.css';
import '../../assets/vendor/nucleo/css/nucleo.css';
import './LoanOffer.css';
import { LoanCreatorABI, LoanCreatorAddress, LoanContractABI, LoanContractAddress, FinocialLoanABI, FinocialABI, FinocialAddress, StandardTokenABI, CollateralAddress } from '../Web3/abi';

class LoanOffer extends Component {
  constructor(){
    super();
    this.state = {
      loanCurrency:true,
      collateral:false,
      loan:false,
      currency:false,
      borrow:false,
      durationView:false,
      ltv1:0,
      ltv2:0,
      ltv3:0,
      mpr1:0,
      mpr2:0,
      mpr3:0,
      mprView:false,
      collateralValue: '(not set)',
      loanAmount: '(not set)',
      duration: null,
      monthlyInt: '(not set)',
      collateralSafe: '(not set)',
      collateralCurrency1:null,
      collateralCurrency2:null,
      collateralCurrency3:null,
      createOfferAlert:false,
      approveOfferAlert:false,
      acceptLoanAlert:false,
      loanOfferContractAddress:'',
      ropstenTransactionhash:'',
      durationArr:[30,60,90,120,150,180,210,240,270,300,330,360],
      durationStart:1,
      durationEnd:360,
      stableCoins :  ['STABLE COINS','DAI', 'PAX', 'TUSD'],
      erc20_tokens :  ['BNB', 'GTO', 'QKC', 'NEXO',
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
          collateralCount : 0
    };
  }

  createLoanOffer = async (principal, duration, ltv1, ltv2, ltv3, mpr1, mpr2, mpr3, collateralCurrency1, collateralCurrency2, collateralCurrency3) => {
    const res = await window.ethereum.enable();
    let collateralItem1 = {}, collateralItem2 = {}, collateralItem3 = {};
    let collateralMetadata = [];

    collateralItem1.collateralCurrency1 = collateralCurrency1;
    collateralItem1.ltv1 = ltv1;
    collateralItem1.mpr1 = mpr1;
    collateralMetadata.push({collateralItem1:collateralItem1})

    collateralItem2.collateralCurrency2 = collateralCurrency2;
    collateralItem2.ltv2 = ltv2;
    collateralItem2.mpr2 = mpr2;
    collateralMetadata.push({collateralItem2:collateralItem2})

    collateralItem3.collateralCurrency3 = collateralCurrency3;
    collateralItem3.ltv3 = ltv3;
    collateralItem3.mpr3 = mpr3;
    collateralMetadata.push({collateralItem3:collateralItem3})

        console.log("collateralMetadata", collateralMetadata);
        // expected output: "Success!"
        const LoanCreator = window.web3.eth.contract(LoanCreatorABI).at(LoanCreatorAddress);
          LoanCreator.createNewLoanOffer( window.web3.toWei(principal), duration, window.web3.toHex(JSON.stringify(collateralMetadata)), {
          from: window.web3.eth.accounts[0]
        }, async (err, res) => {
          if(!err){
            console.log("Transaction in process", res)
            const receipt = await this.getTransactionReceipt(res)
            console.log('receipt.logs[0].data',receipt.logs[0].data);
            let address = receipt.logs[0].data;
            address = address.split("000000000000000000000000");
            address = "0x" + address[2];
            console.log("Data Address: ",address);
            this.setState({createOfferAlert:true, monthlyInt:0, approveOfferAlert:true, loanOfferContractAddress:address, ropstenTransactionhash:receipt.transactionHash})


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

  fundLoanOffer = async (loanAmount, loanOfferContractAddress) => {
    let self = this;
    const LoanContract = window.web3.eth.contract(LoanContractABI).at(loanOfferContractAddress);

     LoanContract.transferFundsToLoan({
      from: window.web3.eth.accounts[0],
      value: window.web3.toWei(loanAmount),
      gas: 30000
    },
    (err, res) => {
      if (!err) {
        console.log(res);
        // window.location="/myloans";
        self.setState({approveOfferAlert:false, acceptLoanAlert:true})
      } else {}
  });
  }

  acceptLoanOffer = async (interest, collateralAddress, loanOfferContractAddress, collateralAmount, collateralPrice, ltv) => {

    var self = this;
    const LoanContract = window.web3.eth.contract(LoanContractABI).at(loanOfferContractAddress);
    const acceptLoan = await LoanContract.acceptLoanOffer(interest, collateralAddress, collateralAmount, collateralPrice, ltv,{
      from: window.web3.eth.accounts[0],
      gas: 300000
    }, (err, transactionHash) => {
      if (!err)
        console.log(transactionHash);
    })
    console.log("ACCEPT LOAN :", acceptLoan);

  }

  handleAddCollateral = () => {
    this.setState({collateralCount:this.state.collateralCount + 1})
    console.log(this.state.collateralCount);
  }

  render() {
    const { loanAmount, duration, monthlyInt, loan, currency, borrow, durationView, durationArr, monthlyInterest, borrowLess, erc20_tokens, collateralCurrency1, collateralCurrency2, collateralCurrency3, collateralCount, collateralValue,
    ltv1,ltv2,ltv3, mpr1,mpr2,mpr3, createOfferAlert,approveOfferAlert, acceptLoanAlert, loanOfferContractAddress, ropstenTransactionhash } = this.state;

    return (
      <div className="LoanOffer text-center">
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
                    <h5> New Loan Offer</h5>
                  </div>
                  <div className="card-body"  style={{display:this.state.loanCurrency?'block':'none'}}>
                    <div className="alert alert-primary alert-dismissible fade show" role="alert">
                      <span className="alert-text"><strong>Choose your loan offer currency.</strong></span>
                    </div>
                    <div className="row mt-5">
                    <div className="col-md-6" style={{marginTop:'25px', marginBottom:'230px', cursor:'pointer'}} onClick={()=>{this.setState({loanCurrency:false, loan:true});}}>
                      <span className="btn-inner--text"><img style={{width:'25px'}} src="/assets/img/eth.png"/></span>
                      <br/>
                      <p>Ethereum</p>
                    </div>
                  <div class="col-md-4 form-group mt-3">
                      <select class="form-control" id="exampleFormControlSelect1">
                      {
                        this.state.stableCoins.map((item,i)=>{
                          return <option>{item}</option>;
                      })
                      }
                      </select>
                    </div>
                    </div>
                  </div>
                  <div className="card-body"style={{display:this.state.loan?'block':'none'}}>
                    <div className="alert alert-primary alert-dismissible fade show" role="alert">
                      <span className="alert-text"><strong>Insert the loan offer amount.</strong></span>
                    </div>
                    <input className="form-control form-control-lg" type="text" placeholder="ETH" onChange={(e)=>{this.setState({loanAmount:e.target.value});}}/>
                    <div className="btn-wrapper" style={{marginTop:'200px', cursor:'pointer'}} onClick={()=>{this.setState({loanCurrency:false,loan:false, borrow:true});}}>
                      <a href="#" className="btn btn-primary btn-icon mb-3 mb-sm-0 m-5">
                        <span className="btn-inner--text">Next</span>
                      </a>
                    </div>
                  </div>

                  <div className="card-body"  style={{display:this.state.currency?'block':'none'}}>
                    <div className="alert alert-primary alert-dismissible fade show" role="alert">
                      <span className="alert-text"><strong>Choose your loan currency.</strong></span>
                    </div>
                    <div className="btn-wrapper" style={{marginTop:'200px', cursor:'pointer'}} onClick={()=>{this.setState({currency:false});}}>
                      <span className="btn-inner--text"><img src="/assets/img/eth.png"/></span>
                      <br/>
                      <p>Ethereum</p>
                    </div>
                  </div>

                  <div className="card-body"style={{display:this.state.borrow?'block':'none'}}>
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                      <span className="alert-text"><strong>Are you willing to lend less?</strong></span>
                    </div>
                    <input className="form-control form-control-lg" type="text"  value={loanAmount} placeholder={loanAmount} onChange={(e)=>{this.setState({loanAmount:e.target.value});}}/>
                    <div className="btn-wrapper" style={{marginTop:'200px', cursor:'pointer'}} onClick={()=>{this.setState({collateral:true, borrow:false});}}>
                      <a href="#" className="btn btn-primary btn-icon mb-3 mb-sm-0 m-5">
                        <span className="btn-inner--text">Next</span>
                      </a>
                    </div>
                  </div>
                  <div className="card-body" style={{display:this.state.collateral?'block':'none'}}>
                    <div className="alert alert-primary alert-dismissible fade show" role="alert">
                      <span className="alert-text">Add your collateral.</span>
                    </div>

                    {<div className="row ml-2">

                           {!!collateralCount && <div className="card card-pricing bg-gradient-success border-0 col-md-3 mr-4" style={{height:'300px'}}>
                                <div className="col-md-12 form-group mt-5">
                                    <select className="form-control" id="exampleFormControlSelect1" style={{width:'80px', display: 'inline'}} onClick={ (e)=>{
                                      this.setState({collateralCurrency1:e.target.value});

                                    }}>
                                    {
                                      erc20_tokens.map((item) => {
                                        return <option>{item}</option>;
                                    })
                                    }
                                    </select>
                                    <h6 class="mt-4">LTV</h6>
                                    <input class="font-weight-bold mb-0" type="number" value={ltv1} style={{width: 'inherit', textAlign: 'center'}} onChange={(e)=>this.setState({ltv1:e.target.value>0 && e.target.value})} />
                                    <h6 class="mt-4">Interest</h6>
                                    <input class="font-weight-bold mb-0" type="number" value={mpr1} style={{width: 'inherit', textAlign: 'center'}} onChange={(e)=>this.setState({mpr1:e.target.value>0 && e.target.value})} />
                                  </div>
                               </div>
                           }

                               {!!(collateralCount>1) && <div className="card card-pricing bg-gradient-success border-0 col-md-3 mr-4" style={{height:'300px'}}>
                                    <div className="col-md-12 form-group mt-5">
                                        <select className="form-control" id="exampleFormControlSelect1" style={{width:'80px', display: 'inline'}} onClick={ (e)=>{
                                          this.setState({collateralCurrency2:e.target.value});
                                        }}>
                                        {
                                          erc20_tokens.map((item) => {
                                            return <option>{item}</option>;
                                        })
                                        }
                                        </select>
                                        <h6 class="mt-4">LTV</h6>
                                        <input class="font-weight-bold mb-0" type="number" value={ltv2} style={{width: 'inherit', textAlign: 'center'}} onChange={(e)=>this.setState({ltv2:e.target.value>0 && e.target.value})} />
                                        <h6 class="mt-4">Interest</h6>
                                        <input class="font-weight-bold mb-0" type="number" value={mpr2} style={{width: 'inherit', textAlign: 'center'}} onChange={(e)=>this.setState({mpr2:e.target.value>0 && e.target.value})} />
                                      </div>
                                   </div>}

                                   {!!(collateralCount>2) && <div className="card card-pricing bg-gradient-success border-0 col-md-3 mr-4" style={{height:'300px'}}>
                                        <div className="col-md-12 form-group mt-5">
                                            <select className="form-control" id="exampleFormControlSelect1" style={{width:'80px', display: 'inline'}} onClick={ (e)=>{

                                              this.setState({collateralCurrency3:e.target.value});
                                            }}>
                                            {
                                              erc20_tokens.map((item) => {
                                                return <option>{item}</option>;
                                            })
                                            }
                                            </select>
                                            <h6 class="mt-4">LTV</h6>
                                            <input class="font-weight-bold mb-0" type="number" value={ltv3} style={{width: 'inherit', textAlign: 'center'}} onChange={(e)=>this.setState({ltv3:e.target.value>0 && e.target.value})} />
                                            <h6 class="mt-4">Interest</h6>
                                            <input class="font-weight-bold mb-0" type="number" value={mpr3} style={{width: 'inherit', textAlign: 'center'}} onChange={(e)=>this.setState({mpr3:e.target.value>0 && e.target.value})} />
                                          </div>
                                        </div>}
                                     </div>

                    }

                    <div className="text-center mt-3">
                    <button className="btn btn-icon btn-primary" type="button" value="plus" onClick={this.handleAddCollateral}>
                      <span><i className="fa fa-plus"></i></span>
                    </button>
                    </div>

                    <div className="btn-wrapper" style={{marginTop:collateralCount?'-30px':'176px', cursor:'pointer'}} onClick={()=>{this.setState({durationView:true, collateral:false});}}>
                      <a href="#" className="btn btn-primary btn-icon mb-3 mb-sm-0 m-5">
                        <span className="btn-inner--text">Next</span>
                      </a>
                    </div>
                  </div>


                  <div className="card-body"  style={{display:this.state.durationView?'block':'none'}}>
                    <div className="alert alert-primary alert-dismissible fade show" role="alert">
                      <span className="alert-text">Define loan duration.</span>

                    </div>
                    <br/>

                    <div className="btn-wrapper" style={{marginTop:'245px', cursor:'pointer'}}>
                      {
                        this.state.durationArr.map((item,i)=>{
                          return <button id={i} type="button" className="btn btn-outline-primary"onClick={()=>{this.setState({duration:item})}}>{item}</button>;
                        })
                      }
                    </div>

                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <div className="card">
                  <div className="card-header text-center">
                    Overview
                  </div>
                  <div className="card-header text-left">
                    <p>Loan amount {loanAmount} ETH</p>
                  </div>

                  <div className="card-body text-left" style={{ marginBottom: !duration?'45%':'21%'}}>
                    <p>Collateral</p>
                    {collateralCurrency1 &&
                      <div className="col">
                      <img id="img1 "alt="img1" src={`/assets/img/32/color/${collateralCurrency1.toLowerCase()}.png`}/>
                      <p>LTV : {ltv1}</p>
                      <p>MPR: {mpr1}</p>
                    </div>
                    }
                    {collateralCurrency2 &&
                      <div className="col">
                      <img id="img2 "alt="img2" src={`/assets/img/32/color/${collateralCurrency2.toLowerCase()}.png`}/>
                      <p>LTV : {ltv2}</p>
                      <p>MPR: {mpr2}</p>
                    </div>
                    }
                    {collateralCurrency3 &&
                      <div className="col">
                      <img id="img3 "alt="img3" src={`/assets/img/32/color/${collateralCurrency3.toLowerCase()}.png`}/>
                      <p>LTV : {ltv3}</p>
                      <p>MPR: {mpr3}</p>
                    </div>
                    }
                    {duration ? <div className="mt-4"><p>Duration {duration} days</p></div>
                    :<div className="mt-4"><p>Duration  (not set) </p></div>}

                    {!!duration && <div className="btn-wrapper text-center" onClick={()=>{
                      this.createLoanOffer(loanAmount, duration, ltv1, ltv2, ltv3, mpr1, mpr2, mpr3, collateralCurrency1, collateralCurrency2, collateralCurrency3);
                    }}>
                      <br/>
                      <a href="#" className="btn btn-primary btn-icon mb-3 mb-sm-0 m-5">
                        <span className="btn-inner--text">Create</span>
                      </a>
                    </div>}
                    {approveOfferAlert &&
                    <div className="btn-wrapper text-center mt-3">
                      <button className="btn btn-primary" type="button" onClick={()=>{
                        this.fundLoanOffer(loanAmount, loanOfferContractAddress);
                        }}>
                        Fund Loan
                      </button>
                    </div>}
                  {acceptLoanAlert &&
                  <div className="btn-wrapper text-center mt-3">
                    <button className="btn btn-primary" type="button" onClick={()=>{
                      this.acceptLoanOffer(mpr1, CollateralAddress.toString(), loanOfferContractAddress, window.web3.toWei(loanAmount), window.web3.toWei(0.1), ltv1);
                      }}>
                      Accept Loan
                    </button>
                  </div>}

                  {acceptLoanAlert && <div className="alert alert-success mt-2" style={{marginLeft:'-1.5%',width:'104.5%', marginTop:'-7%'}} role="alert">
                      Your loan is funded successfully!
                  </div>}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        {createOfferAlert && <div className="alert alert-success" style={{marginLeft:'9.5%',width:'46.5%', marginTop:'-7%'}} role="alert">
              <strong>Congratulations! Loan Offer is Created successfully!</strong>
          </div>}
        {createOfferAlert && <Link to={"https://ropsten.etherscan.io/tx/"+ropstenTransactionhash} style={{color:'#fff'}}  target='_blank'> Check transation on Ropsten </Link>}
      </div>
    );
  }
}

export default LoanOffer;

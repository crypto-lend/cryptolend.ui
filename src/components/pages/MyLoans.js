import React, { Component } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { FinocialLoanABI, FinocialABI, FinocialAddress, StandardTokenABI, ERC20TokenABI } from '../Web3/abi';
import Loader from 'react-loader';
import '../../assets/vendor/font-awesome/css/font-awesome.css';
import '../../assets/vendor/nucleo/css/nucleo.css';
import './MyLoans.css';

class MyLoans extends Component {
  constructor(){
    super();
    this.viewAllRequest();

    this.state = {
      loanAmount:[],
      collateralValue: [],
      earnings:[],
      loanAddresses:[],
      duration: [],
      collateralAddress: [],
      status:[],
      loanStatuses:['INACTIVE','ACTIVE','FUNDED','REPAID','DEFAULTED'],
      repaymentAmount:[],
      dueDate:[],
      currentDate:'',
      fees:[],
      repaymentNumber:[],
      tokenSymbol:[],
      repaymentRows:[],
      repaymentDuration:0,
      currentLoanAddress:'',
      currentLoanNumber:0,
      currentDueDate:'',
      currentCollateralValue:'',
      loaded:true,
      borrowedLoans:true, fundedLoans:false, display1:false, display2:false, display3:false, display4:false, display5:false, display6:false, display7:false, display8:false
    };
  }

  //Get All Loans
  viewAllRequest = async () => {
    const FinocialInstance = window.web3.eth.contract(FinocialABI).at(FinocialAddress);

    FinocialInstance.getAllLoans((err, loanContractAddress) => {
      this.setState({loaded:false})
      let {loanAmount, collateralValue, duration, earnings,loanAddresses, collateralAddress, status, repaymentAmount, repaymentNumber, tokenSymbol, dueDate, currentDate} = this.state;

      if(!err){
        // res will be array of loanContractAddresses, iterate over these addresses using the function below to get loan data for each loan.
        loanContractAddress.map((loanAddress)=>{

                const FinocialLoanInstance = window.web3.eth.contract(FinocialLoanABI).at(loanAddress);


                // FinocialLoanInstance.getPaidRepaymentsCount((err, res)=>{
                //   console.log('getPaidRepaymentsCount',res.toNumber());
                // });

                FinocialLoanInstance.getLoanData((err, res)=>{
                  let startedOn = res[3].toNumber();
                  let date = startedOn;

                  currentDate = new Date();
                  currentDate = currentDate.toString()


                if(!err && window.web3.eth.defaultAccount==res[11]){
                  loanAmount.push(window.web3.fromWei(res[0].toFixed(2)));
                  collateralValue.push(res[6].toNumber());
                  duration.push(res[1].toNumber());
                  earnings.push(res[2].toFixed(2));
                  status.push(res[4].toNumber());
                  collateralAddress.push(res[5]);
                  loanAddresses.push(loanAddress);
                  dueDate.push(date);

                  const tokenContract = window.web3.eth.contract(ERC20TokenABI).at(res[5])

                  tokenContract.symbol((err,res)=>{
                    tokenSymbol.push(res);
                  })
                   this.setState({
                     loanAmount: loanAmount,
                     collateralValue: collateralValue,
                     duration: duration,
                     earnings: earnings,
                     status: status,
                     collateralAddress: collateralAddress,
                     loanAddresses: loanAddresses,
                     tokenSymbol:tokenSymbol,
                     dueDate:dueDate
                   })

                 }
                });

              });
            }
          });
        }

        getRepayments = (loanAddress) => {
        let {repaymentAmount, repaymentNumber,duration, loaded} = this.state;

        this.setState({loaded:!loaded})
          // Get repayment Amount to paid for a particular repayment duration
        const FinocialLoanInstance = window.web3.eth.contract(FinocialLoanABI).at(loanAddress);
        for (var i = 0; i < 12; i++) {
        FinocialLoanInstance.getRepaymentAmount(i+1, (err, repayResponse) => {
          if (!err){
            repayResponse.map((repay,i) => {
              console.log(window.web3.fromWei(repay.toNumber()));
              if(i==0)
                repaymentAmount.push(window.web3.fromWei(repay.toNumber()));
            })

            this.setState({repaymentAmount:repaymentAmount})
          }
        })}
        }


        handleRepayment = (loanContractAddress, repaymentAmount) => {
          // Repay Loan
          console.log('loanContractAddress', loanContractAddress,'repaymentAmount', repaymentAmount);
          const FinocialLoanInstance = window.web3.eth.contract(FinocialLoanABI).at(loanContractAddress);
          FinocialLoanInstance.repayLoan({
          from: window.web3.eth.accounts[0],
          value: window.web3.toWei(repaymentAmount)
           },function(err, res){
           if(!err)
              console.log(res);
           });
        }

        handleRepaymentRows = (currentLoanAddress,duration, currentDueDate, currentCollateralValue) => {
          let {repaymentRows, repaymentAmount, repaymentNumber, loanAddresses, dueDate, currentDate} = this.state;
          repaymentRows=[];

          for (var i = 0; i < (duration/30); i++) {

              repaymentRows.push(<tr id="repay" key={i}>
               <td>
               <div className="media-body">
                 <span className="mb-0 text-sm">Repayment No.</span>
               </div>
                 <span className="badge-dot">
                   <i className="bg-info"> </i>
                     {i+1}
                   </span>
               </td>
               <td>
               <div className="media-body">
                 <span className="mb-0 text-sm">Amount</span>
               </div>
                 <span>
                   {repaymentAmount[i]} ETH
                   </span>

               </td>
               <td>
               <div className="media-body">
                 <span className="mb-0 text-sm">Due Date</span>
               </div>
                 <span>
                   {  this.convertDate(currentDueDate,i).split(' GMT+0530 (India Standard Time)')[0]
                   }
                   </span>
               </td>
               <td>
               <div className="media-body">
                 <span className="mb-0 text-sm">Status</span>
               </div>
                 <span>
                   {currentDate>dueDate[i]?'Not Due':'Due'}
                   </span>
               </td>

               <td>
               <div className="media-body">
                 <span className="mb-0 text-sm">Action</span>
               </div>
                 <span>
                 <button className="btn btn-primary" style={{fontSize:'9px', padding:'2px', fontStyle:'bold' }} type="button" disabled={!!repaymentNumber[i]} onClick={
                   ()=>{
                     this.getRepayments(currentLoanAddress)
                     this.handleRepayment(currentLoanAddress,repaymentAmount[i])
                   }

                 } >Repay</button>
                   </span>
               </td>

               <td>
               <div className="media-body">
                 <span className="mb-0 text-sm">Comments</span>
               </div>
                 <span>
                 --
                   </span>
               </td>

               <td>
               <div className="media-body">
                 <span className="mb-0 text-sm">Collateral</span>
               </div>
                 <span>
                 Value : {currentCollateralValue} TTT
                   </span>
               </td>

               </tr>);

        }
        return repaymentRows;

      }

      approveRequest = (collateralAddress, loanContractAddress, collateralAmount) => {
        // Transfer Collateral to Loan Contract
        // this will be two transaction, first transaction will be to Token Contract and Second will be to Loan Contract

        // Transaction 1 Approval

        const tokenContractInstance = window.web3.eth.contract(StandardTokenABI).at(collateralAddress);
        tokenContractInstance.approve(loanContractAddress, collateralAmount, {
              from: window.web3.eth.accounts[0]
            },
            function(err, res) {
              if (!err) {
                console.log(res);


              } else {

              }
         });

      }



      handleTransferCollateral = (loanContractAddress) => {
        // Transfer Collateral to Loan Contract
        console.log('In handleTransferCollateral',loanContractAddress);
         // Transaction 2 Transfer to Loan Contract

        const FinocialLoanInstance = window.web3.eth.contract(FinocialLoanABI).at(loanContractAddress);
        FinocialLoanInstance.transferCollateralToLoan({
          from: window.web3.eth.accounts[0]
            },function(err, res){
            if(!err)
               console.log(res);
            });

      }

      convertDate = (currentDueDate,i) =>{
           let date = new Date(currentDueDate* 1000)
           date.setDate(date.getDate() + ((i+1)*30));
           date = date.toString()
           console.log(date);
           return date;
      }


  render() {
    const {
      borrowedLoans, fundedLoans, display1, display2, display3, display4, display5, display6, display7, display8, loanAmount, collateralValue, earnings, loanAddresses, duration, collateralAddress, status, repaymentAmount,
       repaymentNumber, tokenSymbol, loanStatuses, repaymentRows, repaymentDuration, currentLoanAddress, loaded, currentLoanNumber, dueDate, currentDueDate, currentCollateralValue
    } = this.state;
    return (
      <div className="MyLoans text-center">
      <Loader loaded={loaded}/>
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
                          <path fill="#00000080" d="M23,4H4H3C2.449,4,2,3.551,2,3s0.449-1,1-1h15v1h2V1c0-0.552-0.448-1-1-1H3C1.343,0,0,1.343,0,3v17 c0,2.209,1.791,4,4,4h19c0.552,0,1-0.448,1-1V5C24,4.448,23.552,4,23,4z M18,16c-1.105,0-2-0.895-2-2c0-1.105,0.895-2,2-2 s2,0.895,2,2C20,15.105,19.105,16,18,16z">
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
                  <div className="container shape-container d-flex align-items-center">
                      <div className="col px-0">
                        <div className="card" >
                    <div className="card-header text-left">
                      <a href="#" className={borrowedLoans? " btn btn-primary" : " btn btn-secondary"} onClick={()=>{this.setState({borrowedLoans:true, fundedLoans:false})}}>My loan Requests</a>
                      <a href="#" className={fundedLoans? "btn btn-primary" : "btn btn-secondary"} onClick={()=>{this.setState({borrowedLoans:false, fundedLoans:true})}}>My loan offers</a>
                    </div>
                    <div className="card-body">
                    <div>
                    {
                      borrowedLoans?    <div className="table-responsive" style={{marginTop:"-25px"}}>
              <table className="table align-items-center table-flush">
                <thead className="thead">
                  <tr>
                    <th scope="col">Loan Id</th>
                    <th scope="col">Loan Amount</th>
                    <th scope="col">Collateral Currency</th>
                    <th scope="col">Duration</th>
                    <th scope="col">MPR</th>
                    <th scope="col">Status</th>
                    <th scope="col">Expires on</th>
                    <th scope="col"><i className="fa fa-arrrow-down"></i></th>

                  </tr>
                </thead>
                <tbody>
                  {loanAmount.map((amount,i)=>{
                    return <tr key={i} style={{cursor:'pointer'}} onClick={()=>{
                      this.getRepayments(loanAddresses[i]);
                      this.setState({display1:!display1, display2:false, display3:false, display4:false, display5:false, display6:false, display7:false, display8:false,
                         repaymentDuration:duration[i], currentLoanAddress:loanAddresses[i], currentLoanNumber:i+1, currentDueDate:dueDate[i], currentCollateralValue:collateralValue[i]
                       })
                      if(display1==true)
                        window.location="/myloans";
                    }}>
                    <th scope="row mt-3">
                      <div className="media align-items-center">
                        <div className="media-body">
                          <span className="mb-0 text-sm">{i+1}</span>
                        </div>
                      </div>
                    </th>
                    <td>
                      <span className="badge-dot">
                        <i className="bg-info"></i> {amount} ETH
                      </span>
                    </td>
                    <td>
                      <div className="text-center">
                        <span className="">{tokenSymbol[i]}</span>
                        <div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="text-center">
                        <span className="">{duration[i]}</span>
                        <div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="text-center">
                        <span className="">{earnings[i]/100}%</span>
                        <div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="text-center">
                        <span className=""> {loanStatuses[status[i]]}</span>
                        <div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="">{this.convertDate(dueDate[i],-1).split(' GMT+0530 (India Standard Time)')[0]}</span>
                    </td>
                    <td className="">
                      <button className="btn btn-primary" type="button" disabled={status[i]>0?true:false} onClick={()=>{
                        this.approveRequest(collateralAddress[i], loanAddresses[i], collateralValue[i])
                        }}>
                        Approve
                      </button>
                    </td>
                    <td className="">
                      <button className="btn btn-primary" type="button" disabled={status[i]>0?true:false} onClick={()=>{
                        console.log('loanAddresses transferCollateral ',loanAddresses);
                        this.handleTransferCollateral(loanAddresses[i])
                        }}>
                        Transfer
                      </button>
                    </td>
                  </tr>;
                  })
                  }
                  { display1 && this.handleRepaymentRows(currentLoanAddress,repaymentDuration, currentDueDate, currentCollateralValue)}
                </tbody>
              </table>
            </div>
                      :
                      <div className="table-responsive" style={{marginTop:"-25px"}}>
              <table className="table align-items-center table-flush">
                <thead className="thead">
                  <tr>
                    <th scope="col">Loan Id</th>
                    <th scope="col">Loan Amount</th>
                    <th scope="col">Collateral Currency</th>
                    <th scope="col">Duration</th>
                    <th scope="col">MPR</th>
                    <th scope="col">Status</th>
                    <th scope="col">Expires on</th>
                    <th scope="col"><i className="fa fa-arrrow-down"></i></th>

                  </tr>
                </thead>
                <tbody>
                  <tr style={{cursor:'pointer'}} onClick={()=>{this.setState({display5:!display5, display2:false, display3:false, display4:false, display1:false, display6:false, display7:false, display8:false})}}>
                    <th scope="row mt-3">
                      <div className="media align-items-center">
                        <div className="media-body">
                          <span className="mb-0 text-sm">1</span>
                        </div>
                      </div>
                    </th>
                    <td>
                      <span className="badge-dot">
                        <i className="bg-info"></i> 1.6 ETH
                      </span>
                    </td>
                    <td>
                      <div className="text-center">
                        <span className="">DAI</span>
                        <div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="text-center">
                        <span className="">90 days</span>
                        <div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="text-center">
                        <span className="">2%</span>
                        <div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="text-center">
                        <span className="">Waiting for lender</span>
                        <div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="">January 10, 2020</span>
                    </td>
                  </tr>
                  { display5 && <tr id="repay">
                    <td>
                    <div className="media-body">
                      <span className="mb-0 text-sm">Repayments</span>
                    </div>
                      <span className="badge-dot">
                        <i className="bg-info"></i> R1</span>

                        <div className=" badge-dot">
                          <span className=""> <i className="bg-info"></i> R2</span>
                        </div>
                        <div className=" badge-dot">
                          <span className=""> <i className="bg-info"></i> R3</span>
                        </div>
                    </td>
                    <td>
                    <div className="media-body">
                      <span className="mb-0 text-sm">Amount</span>
                    </div>
                      <span>
                        1.7 ETH
                        </span>

                        <div>
                          <span>  1.6 ETH</span>
                        </div>
                        <div>
                          <span> 1.6 ETH</span>
                        </div>
                    </td>
                    <td>
                    <div className="media-body">
                      <span className="mb-0 text-sm">Due Date</span>
                    </div>
                      <span>
                        Oct 10, 2019
                        </span>

                        <div>
                          <span>  Nov 10, 2019</span>
                        </div>
                        <div>
                          <span> Dec 10, 2019</span>
                        </div>
                    </td>
                    <td>
                    <div className="media-body">
                      <span className="mb-0 text-sm">Status</span>
                    </div>
                      <span>
                        Paid
                        </span>

                        <div>
                          <span>  Unpaid</span>
                        </div>
                        <div>
                          <span> Defaulted/ Overdue</span>
                        </div>
                    </td>



                    <td>
                    <div className="media-body">
                      <span className="mb-0 text-sm">Comments</span>
                    </div>
                      <span>
                      --
                        </span>

                        <div>
                          <span>
                          --
                          </span>
                        </div>
                        <div>
                          <span> Paid from collateral</span>
                        </div>
                    </td>

                    <td>
                    <div className="media-body">
                      <span className="mb-0 text-sm">Collateral</span>
                    </div>
                      <span>
                      Value : 4 ETH
                        </span>

                        <div>
                          <span>
                          Remain : 2 ETH
                          </span>
                        </div>
                        <div>
                          <span>30% Loan Repaid</span>
                        </div>
                    </td>

                    </tr>
                  }

                  <tr style={{cursor:'pointer'}} onClick={()=>{this.setState({display6:!display6, display1:false, display3:false, display4:false, display5:false, display2:false, display7:false, display8:false})}}>
                    <th scope="row mt-3">
                      <div className="media align-items-center">
                        <div className="media-body">
                          <span className="mb-0 text-sm">2</span>
                        </div>
                      </div>
                    </th>
                    <td>
                      <span className="badge-dot">
                        <i className="bg-info"></i> 1.0  ETH
                      </span>
                    </td>
                    <td>
                      <div className="text-center">
                        <span className="">DAI</span>
                      </div>
                    </td>
                    <td>
                      <div className="text-center">
                        <span className="">60 Days</span>
                      </div>
                    </td>
                    <td>
                      <div className="text-center">
                        <span className="">2.5%</span>
                        <div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="text-center">
                        <span className="">Waiting for lender</span>
                        <div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="">January 10, 2020</span>
                    </td>

                  </tr>
                  { display6 && <tr id="repay">
                    <td>
                    <div className="media-body">
                      <span className="mb-0 text-sm">Repayments</span>
                    </div>
                      <span className="badge-dot">
                        <i className="bg-info"></i> R1</span>

                        <div className=" badge-dot">
                          <span className=""> <i className="bg-info"></i> R2</span>
                        </div>
                        <div className=" badge-dot">
                          <span className=""> <i className="bg-info"></i> R3</span>
                        </div>
                    </td>
                    <td>
                    <div className="media-body">
                      <span className="mb-0 text-sm">Amount</span>
                    </div>
                      <span>
                        1.7 ETH
                        </span>

                        <div>
                          <span>  1.6 ETH</span>
                        </div>
                        <div>
                          <span> 1.6 ETH</span>
                        </div>
                    </td>
                    <td>
                    <div className="media-body">
                      <span className="mb-0 text-sm">Due Date</span>
                    </div>
                      <span>
                        Oct 10, 2019
                        </span>

                        <div>
                          <span>  Nov 10, 2019</span>
                        </div>
                        <div>
                          <span> Dec 10, 2019</span>
                        </div>
                    </td>
                    <td>
                    <div className="media-body">
                      <span className="mb-0 text-sm">Status</span>
                    </div>
                      <span>
                        Paid
                        </span>

                        <div>
                          <span>  Unpaid</span>
                        </div>
                        <div>
                          <span> Defaulted/ Overdue</span>
                        </div>
                    </td>
                    <td>
                    <div className="media-body">
                      <span className="mb-0 text-sm">Comments</span>
                    </div>
                      <span>
                      --
                        </span>

                        <div>
                          <span>
                          --
                          </span>
                        </div>
                        <div>
                          <span> Paid from collateral</span>
                        </div>
                    </td>

                    <td>
                    <div className="media-body">
                      <span className="mb-0 text-sm">Collateral</span>
                    </div>
                      <span>
                      Value : 4 ETH
                        </span>

                        <div>
                          <span>
                          Remain : 2 ETH
                          </span>
                        </div>
                        <div>
                          <span>30% Loan Repaid</span>
                        </div>
                    </td>

                    </tr>
                  }

                  <tr style={{cursor:'pointer'}} onClick={()=>{this.setState({display7:!display7, display1:false,display2:false, display4:false, display5:false, display6:false, display3:false, display8:false})}}>
                    <th scope="row mt-3">
                      <div className="media align-items-center">

                        <div className="media-body">
                          <span className="mb-0 text-sm">3</span>
                        </div>
                      </div>
                    </th>
                    <td>
                      <span className="badge-dot">
                        <i className="bg-info"></i> 3.2 ETH
                      </span>
                    </td>
                    <td>
                      <div className="text-center">
                        <span className="">DAI</span>
                        <div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="text-center">
                        <span className="">360 days</span>
                        <div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="text-center">
                        <span className="">3.5%</span>
                        <div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="text-center">
                        <span className="">Waiting for lender</span>
                        <div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="">January 10, 2020</span>
                    </td>

                  </tr>
                  { display7 && <tr id="repay">
                    <td>
                    <div className="media-body">
                      <span className="mb-0 text-sm">Repayments</span>
                    </div>
                      <span className="badge-dot">
                        <i className="bg-info"></i> R1</span>

                        <div className=" badge-dot">
                          <span className=""> <i className="bg-info"></i> R2</span>
                        </div>
                        <div className=" badge-dot">
                          <span className=""> <i className="bg-info"></i> R3</span>
                        </div>
                    </td>
                    <td>
                    <div className="media-body">
                      <span className="mb-0 text-sm">Amount</span>
                    </div>
                      <span>
                        1.7 ETH
                        </span>

                        <div>
                          <span>  1.6 ETH</span>
                        </div>
                        <div>
                          <span> 1.6 ETH</span>
                        </div>
                    </td>
                    <td>
                    <div className="media-body">
                      <span className="mb-0 text-sm">Due Date</span>
                    </div>
                      <span>
                        Oct 10, 2019
                        </span>

                        <div>
                          <span>  Nov 10, 2019</span>
                        </div>
                        <div>
                          <span> Dec 10, 2019</span>
                        </div>
                    </td>
                    <td>
                    <div className="media-body">
                      <span className="mb-0 text-sm">Status</span>
                    </div>
                      <span>
                        Paid
                        </span>

                        <div>
                          <span>  Unpaid</span>
                        </div>
                        <div>
                          <span> Defaulted/ Overdue</span>
                        </div>
                    </td>



                    <td>
                    <div className="media-body">
                      <span className="mb-0 text-sm">Comments</span>
                    </div>
                      <span>
                      --
                        </span>

                        <div>
                          <span>
                          --
                          </span>
                        </div>
                        <div>
                          <span> Paid from collateral</span>
                        </div>
                    </td>

                    <td>
                    <div className="media-body">
                      <span className="mb-0 text-sm">Collateral</span>
                    </div>
                      <span>
                      Value : 4 ETH
                        </span>

                        <div>
                          <span>
                          Remain : 2 ETH
                          </span>
                        </div>
                        <div>
                          <span>30% Loan Repaid</span>
                        </div>
                    </td>

                    </tr>
                  }

                  <tr style={{cursor:'pointer'}} onClick={()=>{this.setState({display8:!display8, display1:false,display2:false, display3:false, display5:false, display6:false, display7:false, display4:false})}}>
                    <th scope="row mt-3">
                      <div className="media align-items-center">

                        <div className="media-body">
                          <span className="mb-0 text-sm">4</span>
                        </div>
                      </div>
                    </th>

                    <td>
                      <span className="badge-dot">
                        <i className="bg-info"></i> 5.0 ETH
                      </span>
                    </td>
                    <td>
                      <div className="text-center">
                        <span className="">DAI</span>
                        <div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="text-center">
                        <span className="">90 days</span>
                        <div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="text-center">
                        <span className="">1%</span>
                        <div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="text-center">
                        <span className="">Waiting for lender</span>
                        <div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="">January 10, 2020</span>
                    </td>

                  </tr>
                  { display8 && <tr id="repay">
                    <td>
                    <div className="media-body">
                      <span className="mb-0 text-sm">Repayments</span>
                    </div>
                      <span className="badge-dot">
                        <i className="bg-info"></i> R1</span>

                        <div className=" badge-dot">
                          <span className=""> <i className="bg-info"></i> R2</span>
                        </div>
                        <div className=" badge-dot">
                          <span className=""> <i className="bg-info"></i> R3</span>
                        </div>
                    </td>
                    <td>
                    <div className="media-body">
                      <span className="mb-0 text-sm">Amount</span>
                    </div>
                      <span>
                        1.7 ETH
                        </span>

                        <div>
                          <span>  1.6 ETH</span>
                        </div>
                        <div>
                          <span> 1.6 ETH</span>
                        </div>
                    </td>
                    <td>
                    <div className="media-body">
                      <span className="mb-0 text-sm">Due Date</span>
                    </div>
                      <span>
                        Oct 10, 2019
                        </span>

                        <div>
                          <span>  Nov 10, 2019</span>
                        </div>
                        <div>
                          <span> Dec 10, 2019</span>
                        </div>
                    </td>
                    <td>
                    <div className="media-body">
                      <span className="mb-0 text-sm">Status</span>
                    </div>
                      <span>
                        Paid
                        </span>

                        <div>
                          <span>  Unpaid</span>
                        </div>
                        <div>
                          <span> Defaulted/ Overdue</span>
                        </div>
                    </td>



                    <td>
                    <div className="media-body">
                      <span className="mb-0 text-sm">Comments</span>
                    </div>
                      <span>
                      --
                        </span>

                        <div>
                          <span>
                          --
                          </span>
                        </div>
                        <div>
                          <span> Paid from collateral</span>
                        </div>
                    </td>

                    <td>
                    <div className="media-body">
                      <span className="mb-0 text-sm">Collateral</span>
                    </div>
                      <span>
                      Value : 4 ETH
                        </span>

                        <div>
                          <span>
                          Remain : 2 ETH
                          </span>
                        </div>
                        <div>
                          <span>30% Loan Repaid</span>
                        </div>
                    </td>

                    </tr>
                  }
                </tbody>
              </table>
            </div>
                    }
                    {/*<span className="alert-text">You haven't lent yet. Check the available loan request below!</span>*/}
                    </div>
                    <div className="btn-wrapper">
                      <a href="/view-offers" className="btn btn-primary btn-icon" data-toggle="scroll">
                        <span className="btn-inner--text">View All Offers</span>
                      </a>
                      <a href="/view-requests" className="btn btn-primary btn-icon">
                        <span className="btn-inner--text">View All Requests</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </section>

        </div>

      </div>


    );
  }
}

export default MyLoans;

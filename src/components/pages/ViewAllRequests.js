import React, { Component } from 'react';
import Nouislider from "nouislider-react";
import Header  from '../pages/Header';
import { GetLoans } from '../../services/loanbook';
import { supported_erc20_token, getTokenBySymbol, getTokenByAddress } from '../Web3/erc20';
import { GetLoanDetails, ApproveAndFundLoanRequest } from '../../services/loanContract';
import '../../assets/vendor/font-awesome/css/font-awesome.css';
import '../../assets/vendor/nucleo/css/nucleo.css';
import './ViewAllOffers.css';

class ViewAllRequests extends Component {
  constructor(){
    super();
    this.viewAllRequest();
    this.state = {
      loanRequests: [],
      collateralMetadata:true,
      safeness: 'SAFE',
      expireIn: '5D 15H 30M',
      loanCurrency:'ETH',
      collateralCurrency:'ALL',
      waitingForLender:true,
      waitingForCollateral:false,
      waitingForPayback:false,
      finished:false,
      defaulted:false,
      minMonthlyInt:0,
      maxMonthlyInt:5,
      minDuration:0,
      maxDuration:12,
      erc20_tokens :  [{symbol:'ALL'}, ...supported_erc20_token]
    };
  }

  //Get All Loans
  viewAllRequest = async () => {

    try {

        const loans = await GetLoans();

        let  { loanRequests } = this.state;

        loans.map(async(loanAddress) => {
          const loan = await GetLoanDetails(loanAddress);

      /*    if(loan[5].toNumber() === 2){
            for request/active i have changed it to >= 2
      */

          if(loan[5].toNumber() >= 2 ){

            loanRequests.push({
              loanAddress: loanAddress,
              loanAmount: window.web3.fromWei(loan[0].toNumber()),
              duration: loan[1].toNumber(),
              interest: (loan[2].toNumber() / 100),
              collateral: {
                address: loan[6],
                amount: loan[7].toNumber()
              },
              status: loan[5].toNumber(),

            });

           // let date = startedOn;
            //               date = this.convertDate(date, -1);
            //               // console.log('startedOn:', date);

            this.setState({
              loanRequests: loanRequests,
            });
          }
        });
    } catch (e) {
        console.log(e);
    } finally {

    }
  }

  convertDate = (currentDueDate,i) =>{
       let date = new Date(currentDueDate* 1000)
       date.setMinutes(date.getMinutes() + ((i+1)*30));
       date = date.toString()
       return date;
  }

  approveAndFundLoanRequest = async(loanAmount,loanContractAddress) => {

    try {
      await ApproveAndFundLoanRequest(loanContractAddress, loanAmount);
    } catch (error) {
      console.log(error);
    }
    // const LoanInstance = window.web3.eth.contract(LoanContractABI).at(loanContractAddress);
    // LoanInstance.approveLoanRequest({
    //   from: window.web3.eth.accounts[0],
    //   value: window.web3.toWei(loanAmount),
    //   gas: 300000
    // },(err, res) => {
    //     if(!err)
    //        console.log('loanContractAddress', loanContractAddress);
    //     });
  }

  render() {
    const { erc20_tokens, duration, minDuration, maxDuration, earnings, minMonthlyInt, maxMonthlyInt, loanAddress, status, collateralAddress, collateralValue, loanAddresses, collateralCurrency, loanCurrency,
    collateralMetadata, loanRequests, waitingForLender, waitingForPayback, finished } = this.state;
    return (
      <div className="ViewAllRequests text-center">
        <Header/>
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

            <div className="container d-flex align-items-left" style={{marginLeft:'-15px'}}>



            <div className="card card-pricing border-0 col-md-4">
            <div className="card-header bg-transparent">
              <i className="fa fa-filter" aria-hidden="true"></i>
              <a className="ls-1 text-primary py-3 mb-0 ml-2">View All Requests</a>
            </div>
            <div className="card-body">

              <ul className="list-unstyled my-4">
                <li>
                  <div className="form-group">
                      <label for="exampleFormControlSelect1">Loan Currency</label>
                      <select className="form-control" id="exampleFormControlSelect1" onClick={ (e) => {
                        this.setState({loanCurrency:e.target.value});
                      }}>
                      <option>ETH</option>;
                      </select>
                  </div>
                </li>
                <li>
                <div className="form-group">
                    <label for="exampleFormControlSelect1">Collateral Currency</label>
                    <select className="form-control" id="exampleFormControlSelect1" onClick={ (e) => {
                      this.setState({collateralCurrency:e.target.value});
                    }}>
                    {
                      erc20_tokens.map((item,i) => {
                        return <option>{item.symbol}</option>;
                    })
                    }
                    </select>
                </div>
                </li>
                <li>
                <div className="card">
                  <label for="">Loan state</label>
                    <div className="card-body">
                      <form>
                        <div className="row">
                          <div className="col text-left">
                            <div className="custom-control custom-checkbox mb-3">
                              <input className="custom-control-input" id="customCheck1" type="checkbox" checked={this.state.waitingForLender} onClick={()=>{this.setState({waitingForLender:!this.state.waitingForLender})}}/>
                              <label className="custom-control-label" for="customCheck1">Waiting for Lenders</label>
                            </div>
                            {/*<div className="custom-control custom-checkbox mb-3">
                              <input className="custom-control-input" id="customCheck2" type="checkbox" checked={this.state.waitingForCollateral} onClick={()=>{this.setState({waitingForCollateral:!this.state.waitingForCollateral})}}/>
                              <label className="custom-control-label" for="customCheck2">Waiting for collateral</label>
                            </div>*/}
                            <div className="custom-control custom-checkbox mb-3">
                              <input className="custom-control-input" id="customCheck3" type="checkbox" checked={this.state.waitingForPayback} onClick={()=>{this.setState({waitingForPayback:!this.state.waitingForPayback})}}/>
                              <label className="custom-control-label" for="customCheck3">Waiting for Payback</label>
                            </div>
                            <div className="custom-control custom-checkbox mb-3">
                              <input className="custom-control-input" id="customCheck4" type="checkbox" checked={this.state.finished} onClick={()=>{this.setState({finished:!this.state.finished})}}/>
                              <label className="custom-control-label" for="customCheck4">Finished</label>
                            </div>
                            {/*<div className="custom-control custom-checkbox mb-3">
                                <input className="custom-control-input" id="customCheck5" type="checkbox" checked={this.state.defaulted} onClick={()=>{this.setState({defaulted:!this.state.defaulted})}}/>
                                <label className="custom-control-label" for="customCheck5">Defaulted</label>
                            </div>*/}
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </li>
                <li>
                <div className="mt-3">
                  <label for="">Monthly Interest</label>
                  <div className="">
                  <label style={{marginLeft:'-180px'}}> ({minMonthlyInt} %) </label>
                  </div>
                  <div className="" style={{marginRight:'-180px',marginTop:'-30px'}}>
                  <label> ({maxMonthlyInt} %)</label>
                  </div>
                  <Nouislider range={{ min: 0, max: 5 }} start={[0, 5]} connect onChange={(e)=>{this.setState({minMonthlyInt:e[0],maxMonthlyInt:e[1]});}} />
                </div>
                </li>
                <li>
                <div className="mt-3">
                  <label for="">Duration</label>
                  <div className="">
                  <label style={{marginLeft:'-180px'}}> ({minDuration} Month) </label>
                  </div>
                  <div className="" style={{marginRight:'-180px',marginTop:'-30px'}}>
                  <label> ({maxDuration} Month)</label>
                  </div>
                  <Nouislider range={{ min: 0, max: 12 }} start={[0, 12]} connect onChange={(e)=>{this.setState({minDuration:e[0],maxDuration:e[1]});}} />
                  </div>
                </li>
              </ul>
            </div>
            <div className="card-footer" style={{marginTop:'-40px'}} onClick={()=>{
              this.setState({ loanCurrency:'ETH',
                    collateralCurrency:'ALL',
                    waitingForLender:true,
                    waitingForCollateral:false,
                    waitingForPayback:false,
                    finished:false,
                    defaulted:false,
                    minMonthlyInt:0,
                    maxMonthlyInt:5,
                    minDuration:0,
                    maxDuration:12,})
            }}>
              <a href="#!" className=" text-muted">Reset Filters</a>
            </div>
          </div>
            <div className="ml-4 row">
              {
                loanRequests.map((loanRequest)=>{
                return ((waitingForLender && loanRequest.status==2) ||
                (waitingForPayback && loanRequest.status==3) ||
                (finished && loanRequest.status==4)) &&
                (collateralCurrency == 'ALL' || getTokenByAddress[loanRequest.collateral.address].symbol == collateralCurrency) &&
                loanRequest.duration/30>minDuration && loanRequest.duration/30<maxDuration &&
                loanRequest.interest>minMonthlyInt && loanRequest.interest<maxMonthlyInt &&
              <div className="col">
                 <div className="card">
                   <div className="card-header">

               <div className="row row-example" style={{fontSize:'60%'}}>
                 <div className="col-sm">
                   <span><p>Amount  </p></span>
                   <span className="btn-inner--text"><img style={{width:'20px'}} src="/assets/img/eth.png"/> {loanRequest.loanAmount} ETH </span>
                 </div>
                 <div className="col-sm">
                   <span><p>Collateral </p></span>
                    <span className="btn-inner--text"> {loanRequest.collateral.amount} {getTokenByAddress[loanRequest.collateral.address].symbol}</span>
                 </div>
               </div>
                   </div>
                   <div className="card-body text-left">
                   <p>Earnings : { loanRequest.interest } %</p>
                   <p>Duration  : {loanRequest.duration} days</p>
                   {/* <p>Safeness : {this.state.safeness}</p>
                   <p>Expires in : {this.state.expireIn}</p> */}
                   </div>
                  {loanRequest.status==2 &&
                  <div className="btn-wrapper text-center" onClick={()=>this.approveAndFundLoanRequest(loanRequest.loanAmount, loanRequest.loanAddress)}>
                   <a href="#" className="btn btn-primary btn-icon m-1">
                     <span className="btn-inner--text">Fund Now</span>
                   </a>
                 </div>}
                 </div>
                 <div
                   className="alert alert-primary alert-dismissible fade show text-center"
                   role="alert"
                 >
                   <span className="alert-text">{loanRequest.status==2?'Waiting for lender':loanRequest.status==3?'Waiting for payback':'Finished'}</span>
                 </div>
               </div>;
                })
            }
            </div>
              {/*
                this.state.waitingForPayback && duration[1]/30>minDuration && duration[1]/30<=maxDuration && earnings[1]>minMonthlyInt && earnings[1]<=maxMonthlyInt &&
                <div className="col-md-4">
                <div className="card">
                  <div className="card-header">

                  <div className="row row-example">
                <div className="col-sm">
                  <span><p>Loan amount  </p></span>
                  <span className="btn-inner--text"><img style={{width:'25px'}} src="/assets/img/eth.png"/> {this.state.loanAmount} ETH</span>

                </div>
                <div className="col-sm">
                  <span><p>Collateral </p></span>
                  <span className="btn-inner--text"><img style={{width:'25px'}} src="/assets/img/32/color/powr.png"/> 300 POWR</span>
                </div>
              </div>
                  </div>
                  <div className="card-body text-left" style={{marginBottom:'80px'}}>
                  <p>Earnings : {this.state.earnings[1]} %</p>
                  <p>Duration  : {this.state.duration[1]} days</p>
                  <p>Safeness : {this.state.safeness}</p>

                  </div>
                </div>
                <div className="alert alert-warning alert-dismissible fade show text-center" role="alert">
                  <span className="alert-text">Waiting for Payback</span>
                </div>
              </div>

              */}

            </div>
          </section>
        </div>

      </div>
    );
  }
}

export default ViewAllRequests;

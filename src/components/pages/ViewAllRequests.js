// Import libraries, services, styles and components 
import React, { Component } from 'react';
import Nouislider from "nouislider-react";
import Header from '../pages/Header';
import { GetLoans } from '../../services/loanbook';
import { supported_erc20_token, getTokenByAddress } from '../Web3/erc20';
import { GetLoanDetails, ApproveAndFundLoanRequest } from '../../services/loanContract';
import '../../assets/vendor/font-awesome/css/font-awesome.css';
import '../../assets/vendor/nucleo/css/nucleo.css';
import './ViewAllOffers.css';

// create a `ViewAllRequests` class Component imported from react
class ViewAllRequests extends Component {

  // create `constructor()` and call `super()` method of parent class
  constructor() {
    super();

    // call `viewAllRequest()` method
    this.viewAllRequest();

    // initialize the state variables
    this.state = {
      loanRequests: [],
      collateralMetadata: true,
      safeness: 'SAFE',
      expireIn: '5D 15H 30M',
      loanCurrency: 'ETH',
      collateralCurrency: 'ALL',
      waitingForLender: true,
      waitingForCollateral: false,
      waitingForPayback: false,
      finished: false,
      defaulted: false,
      minMonthlyInt: 0,
      maxMonthlyInt: 5,
      minDuration: 0,
      maxDuration: 12,
      erc20_tokens: [{ symbol: 'ALL' }, ...supported_erc20_token]
    };
  }

  // create `viewAllRequest()` method to get all Loans
  viewAllRequest = async () => {

    // try-catch block
    try {

      // assign `GetLoans()` method returned values to `loans`
      const loans = await GetLoans();

      // assign the `loanRequests` state variable to local variable
      let { loanRequests } = this.state;

      // traverse the loans and match the loan by address value
      loans.map(async (loanAddress) => {
        const loan = await GetLoanDetails(loanAddress);

        /*    if(loan[5].toNumber() === 2){
              for request/active i have changed it to >= 2
        */

        if (loan[4].toNumber() >= 2) {

          loanRequests.push({
            loanAddress: loanAddress,
            loanAmount: window.web3.fromWei(loan[0].toNumber()),
            duration: loan[1].toNumber(),
            interest: (loan[2].toNumber() / 100),
            collateral: {
              address: loan[5][0][0],
              amount: loan[7].toNumber()
            },
            status: loan[4].toNumber(),

          });

          console.log("loan reqests", loanRequests);
          this.setState({
            loanRequests: loanRequests
          });
        }
      });
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  // create a `convertDate()` method 
  convertDate = (currentDueDate, i) => {
    let date = new Date(currentDueDate * 1000)
    date.setMinutes(date.getMinutes() + ((i + 1) * 30));
    date = date.toString()
    return date;
  }

  // create `approveAndFundLoanRequest()` method
  approveAndFundLoanRequest = async (loanAmount, loanContractAddress) => {

    try {
      await ApproveAndFundLoanRequest(loanContractAddress, loanAmount);
    } catch (error) {
      console.log(error);
    }
  }


  // call `render()` method to display the frontend
  render() {

    // assign the state variables to their respective local variables
    const { erc20_tokens, minDuration, maxDuration, minMonthlyInt, maxMonthlyInt, collateralCurrency, loanRequests, waitingForLender, waitingForPayback, finished } = this.state;

    // call the `return()` method and create a parent `<div>`
    return (
      <div className="ViewAllRequests text-center">

        {/** call the `<Header>` component */}
        <Header />

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

            {/** create ViewAll requests components UI */}
            <div className="container d-flex align-items-left" style={{ marginLeft: '-15px' }}>
              <div className="card card-pricing border-0 col-md-4">
                <div className="card-header bg-transparent">
                  <i className="fa fa-filter" aria-hidden="true"></i>
                  <a className="ls-1 text-primary py-3 mb-0 ml-2">View All Requests</a>
                </div>
                <div className="card-body">
                  <ul className="list-unstyled my-4">
                    {/** choose Loan Currency filter */}
                    <li>
                      <div className="form-group">
                        <label for="exampleFormControlSelect1">Loan Currency</label>
                        <select className="form-control" id="exampleFormControlSelect1"
                          onClick={(e) => {
                            this.setState({ loanCurrency: e.target.value });
                          }}>
                          <option>ETH</option>;
                        </select>
                      </div>
                    </li>
                    {/** choose Collateral Currency filter*/}
                    <li>
                      <div className="form-group">
                        <label for="exampleFormControlSelect1">Collateral Currency</label>
                        <select className="form-control" id="exampleFormControlSelect1" onClick={(e) => {
                          this.setState({ collateralCurrency: e.target.value });
                        }}>
                          {
                            erc20_tokens.map((item, i) => {
                              return <option>{item.symbol}</option>;
                            })
                          }
                        </select>
                      </div>
                    </li>
                    {/** choose Loan State filter  */}
                    <li>
                      <div className="card">
                        <label for="">Loan state</label>
                        <div className="card-body">
                          <form>
                            <div className="row">
                              <div className="col text-left">
                                <div className="custom-control custom-checkbox mb-3">
                                  <input className="custom-control-input" id="customCheck1" type="checkbox" checked={this.state.waitingForLender}
                                    onClick={() => { this.setState({ waitingForLender: !this.state.waitingForLender }) }} />
                                  <label className="custom-control-label" for="customCheck1">Waiting for Lenders</label>
                                </div>
                                <div className="custom-control custom-checkbox mb-3">
                                  <input className="custom-control-input" id="customCheck3" type="checkbox" checked={this.state.waitingForPayback}
                                    onClick={() => { this.setState({ waitingForPayback: !this.state.waitingForPayback }) }} />
                                  <label className="custom-control-label" for="customCheck3">Waiting for Payback</label>
                                </div>
                                <div className="custom-control custom-checkbox mb-3">
                                  <input className="custom-control-input" id="customCheck4" type="checkbox" checked={this.state.finished}
                                    onClick={() => { this.setState({ finished: !this.state.finished }) }} />
                                  <label className="custom-control-label" for="customCheck4">Finished</label>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </li>
                    {/** select range of Monthly Interest */}
                    <li>
                      <div className="mt-3">
                        <label for="">Monthly Interest</label>
                        <div className="">
                          <label style={{ marginLeft: '-180px' }}> ({minMonthlyInt} %) </label>
                        </div>
                        <div className="" style={{ marginRight: '-180px', marginTop: '-30px' }}>
                          <label> ({maxMonthlyInt} %)</label>
                        </div>
                        {/** `Nouislider` component for Monthly Interest*/}
                        <Nouislider range={{ min: 0, max: 5 }} start={[0, 5]} connect
                          onChange={(e) => { this.setState({ minMonthlyInt: e[0], maxMonthlyInt: e[1] }); }} />
                      </div>
                    </li>
                    <li>
                      <div className="mt-3">
                        <label for="">Duration</label>
                        <div className="">
                          <label style={{ marginLeft: '-180px' }}> ({minDuration} Month) </label>
                        </div>
                        <div className="" style={{ marginRight: '-180px', marginTop: '-30px' }}>
                          <label> ({maxDuration} Month)</label>
                        </div>
                        {/** `Nouislider` component for Monthly Interest*/}
                        <Nouislider range={{ min: 0, max: 12 }} start={[0, 12]} connect
                          onChange={(e) => { this.setState({ minDuration: e[0], maxDuration: e[1] }); }} />
                      </div>
                    </li>
                  </ul>
                </div>
                {/** reset filters to default */}
                <div className="card-footer" style={{ marginTop: '-40px' }} onClick={() => {
                  this.setState({
                    loanCurrency: 'ETH',
                    collateralCurrency: 'ALL',
                    waitingForLender: true,
                    waitingForCollateral: false,
                    waitingForPayback: false,
                    finished: false,
                    defaulted: false,
                    minMonthlyInt: 0,
                    maxMonthlyInt: 5,
                    minDuration: 0,
                    maxDuration: 12,
                  })
                }}>
                  <a href="#!" className=" text-muted">Reset Filters</a>
                </div>
              </div>
              {/** map Loan Requests as per the filters */}
              <div className="ml-4 row">
                {
                  loanRequests.map((loanRequest) => {
                    return ((waitingForLender && loanRequest.status == 2) ||
                      (waitingForPayback && loanRequest.status == 3) ||
                      (finished && loanRequest.status == 4)) &&
                      (collateralCurrency == 'ALL' || getTokenByAddress[loanRequest.collateral.address].symbol == collateralCurrency) &&
                      loanRequest.duration / 30 > minDuration && loanRequest.duration / 30 < maxDuration &&
                      loanRequest.interest > minMonthlyInt && loanRequest.interest < maxMonthlyInt &&
                      <div className="col">
                        <div className="card">
                          <div className="card-header">
                            <div className="row row-example" style={{ fontSize: '60%' }}>
                              <div className="col-sm">
                                <span><p>Amount  </p></span>
                                <span className="btn-inner--text"><img style={{ width: '20px' }} src="/assets/img/eth.png" /> {loanRequest.loanAmount} ETH </span>
                              </div>
                              <div className="col-sm">
                                <span><p>Collateral </p></span>
                                <span className="btn-inner--text"> {loanRequest.collateral.amount} {getTokenByAddress[loanRequest.collateral.address] && getTokenByAddress[loanRequest.collateral.address].symbol}</span>
                              </div>
                            </div>
                          </div>
                          <div className="card-body text-left">
                            <p>Earnings : {loanRequest.interest} %</p>
                            <p>Duration  : {loanRequest.duration} days</p>
                          </div>
                          {/** if loanRequest status is active the approve and fund Loan Request */}
                          {loanRequest.status == 2 &&
                            <div className="btn-wrapper text-center"
                              onClick={() => this.approveAndFundLoanRequest(loanRequest.loanAmount, loanRequest.loanAddress)}>
                              <a href="#" className="btn btn-primary btn-icon m-1">
                                <span className="btn-inner--text">Fund Now</span>
                              </a>
                            </div>}
                        </div>
                        {/** Loan Request status Alert*/}
                        <div
                          className="alert alert-primary alert-dismissible fade show text-center"
                          role="alert"
                        >
                          <span className="alert-text">{loanRequest.status == 2 ? 'Waiting for lender' : loanRequest.status == 3 ? 'Waiting for payback' : 'Finished'}</span>
                        </div>
                      </div>;
                  })
                }
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

// export the `ViewAllRequests` component
export default ViewAllRequests;

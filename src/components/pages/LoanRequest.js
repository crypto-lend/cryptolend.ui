import React, { Component } from 'react';
import { Link } from 'react-router';
import Loader from 'react-loader';
import Header from '../pages/Header';
import { CreateNewLoanRequest, FetchCollateralPrice } from '../../services/loanbook';
import { ExecuteTokenApproval } from '../../services/token';
import { FinalizeCollateralTransfer } from '../../services/loanContract';
import { supported_erc20_token, getTokenBySymbol, getTokenByAddress } from '../Web3/erc20';

class LoanRequest extends Component {
  constructor() {
    super();
    this.state = {
      collateral: true,
      loan: false,
      currency: false,
      borrow: false,
      durationView: false,
      mprView: false,
      monthlyInterest: false,
      borrowLess: false,
      loaded: true,
      alertLoanAmount: false,
      createRequestAlert: false,
      approveRequestAlert: false,
      transferCollateralAlert: false,
      transferCollateralSuccessAlert: false,
      transferCollateralFailAlert: false,
      loanContractAddress: '',
      ropstenTransactionhash: '',
      collateralValue: 0,
      loanAmount: null,
      duration: null,
      monthlyInt: 0,
      durationArr: [30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360],
      durationStart: 0,
      durationEnd: 360,
      totalPremium: null,
      monthlyInstallment: null,
      loanAmountInput: '',
      apr: 0,
      originationFee: 1,
      collateralCurrency: 'ETH',
      erc20_tokens: supported_erc20_token
    };
  }

  createLoanRequest = async (principal, duration, interest, collateralCurrency, collateralAmount) => {

    try {
      const loanContractAddress = await CreateNewLoanRequest({
        principal: principal,
        duration: duration,
        interest: interest,
        collateralAddress: getTokenBySymbol[collateralCurrency] && getTokenBySymbol[collateralCurrency].address,
        collateralAmount: collateralAmount
      });

      this.setState({
        createRequestAlert: true,
        approveRequestAlert: true,
        loanContractAddress: loanContractAddress,
        collateralAddress: getTokenBySymbol[collateralCurrency] && getTokenBySymbol[collateralCurrency].address
      })

    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  handleERC20TokenApproval = async (collateralAddress, loanContractAddress, collateralValue) => {

    try {

      await ExecuteTokenApproval({
        ERC20Token: collateralAddress,
        loanContractAddress: loanContractAddress,
        tokenAmount: collateralValue
      });

      this.setState({
        approveRequestAlert: false,
        createRequestAlert: false,
        transferCollateralAlert: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleTransferCollateral = async (loanContractAddress, collateralAddress) => {

    try {

      await FinalizeCollateralTransfer(loanContractAddress, collateralAddress);

      this.setState({
        transferCollateralAlert: false,
        transferCollateralSuccessAlert: true
      });

    } catch (error) {
      this.setState({
        transferCollateralAlert: false,
        transferCollateralFailAlert: true
      });
    }
  }


  handleMonthlyInterest = (e) => {

    const { loanAmount, monthlyInt, duration, totalPremium, monthlyInstallment, apr, originationFee } = this.state;

    if (e.target.value == 'plus' && monthlyInt < 5) {
      this.setState({ monthlyInt: monthlyInt + 0.25 });
      let totalRepayment = ((loanAmount * (monthlyInt + 0.25) * ((duration / 30) + 1)) / (2 * 100))
      this.setState({ monthlyInstallment: (((loanAmount * (monthlyInt + 0.25) * ((duration / 30) + 1)) / (2 * duration / 30 * 100)) + loanAmount / (duration / 30)) })
      this.setState({ totalPremium: totalRepayment });
      this.setState({ apr: (totalRepayment / loanAmount) * 100 })
      console.log("apr : ", apr, totalRepayment);
    }
    else if (e.target.value == 'minus' && monthlyInt > 0) {
      this.setState({ monthlyInt: monthlyInt - 0.25 });
      let totalRepayment = ((loanAmount * (monthlyInt - 0.25) * ((duration / 30) + 1)) / (2 * 100))
      this.setState({ monthlyInstallment: (((loanAmount * (monthlyInt - 0.25) * ((duration / 30) + 1)) / (2 * duration / 30 * 100)) + loanAmount / (duration / 30)) })
      this.setState({ totalPremium: totalRepayment });
      this.setState({ apr: (totalPremium / loanAmount) * 100 })
    }
  }

  handleCollateralConversion = async (collateralAddress) => {

    let { collateralValue } = this.state;

    try {
      const collateralPrice = await FetchCollateralPrice({
        collateralAddress: collateralAddress
      });

      this.setState({
        loanAmount: (collateralValue * collateralPrice / 2),
        currency: false,
        borrow: true
      })

    } catch (error) {

    }
  }

  render() {


    const { loanAmount, duration, monthlyInt, collateralAddress, collateralValue, collateralCurrency, collateral, erc20_tokens, loan, currency, borrow,
      durationView, durationArr, monthlyInterest, borrowLess, totalPremium, monthlyInstallment, originationFee, apr, alertLoanAmount,
      loanAmountInput, createRequestAlert, loanContractAddress, ropstenTransactionhash, approveRequestAlert, transferCollateralAlert, transferCollateralSuccessAlert, transferCollateralFailAlert } = this.state;


    return (
      <div className="LoanRequest text-center">
        <Header />
        <Loader loaded={this.state.loaded} />
        <div className="position-relative">
          <section className="section-hero section-shaped my-0">
            <div className="">
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
            <div className="container d-flex">
              <div className="col-lg-7">
                <div className="card">
                  <div className="card-header text-center">
                    <h5> New Loan Request</h5>
                  </div>
                  <div className="card-body" style={{ display: collateral ? 'block' : 'none' }}>
                    <div className="alert alert-primary alert-dismissible fade show" role="alert">
                      <span className="alert-text">Choose your collateral currency.</span>
                    </div>
                    <div className="row mt-5">
                      <div className="col-md-6" style={{ marginTop: '25px', marginBottom: '85px', cursor: 'pointer' }} onClick={() => { this.setState({ collateral: false, loan: true }); }}>
                        <span className="btn-inner--text"><img style={{ width: '25px' }} src="/assets/img/eth.png" /></span>
                        <br />
                        <p>Ethereum</p>
                      </div>
                      <div className="col-md-4 form-group mt-3">
                        <label id="exampleFormControlSelect1">ERC20 TOKENS</label>
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

                    </div>
                    <div className="btn-wrapper" style={{ marginTop: '20px', cursor: 'pointer' }} onClick={() => { this.setState({ collateral: false, loan: true }) }}>
                      <a href="#" className="btn btn-primary btn-icon mb-3 mb-sm-0 m-5">
                        <span className="btn-inner--text">Next</span>
                      </a>
                    </div>
                  </div>
                  <div className="card-body" style={{ display: loan ? 'block' : 'none' }}>
                    <div className="alert alert-primary alert-dismissible fade show" role="alert">
                      <span className="alert-text">Insert the collateral amount.</span>
                    </div>
                    <input className="form-control form-control-lg" type="text" placeholder={collateralCurrency} onChange={(e) => { this.setState({ collateralValue: e.target.value }); }} />
                    <div className="row">
                      <div className="col-md-6" style={{ marginTop: '153px', cursor: 'pointer' }} onClick={() => { this.setState({ collateral: true, loan: false }) }}>
                        <a href="#" className="btn btn-primary btn-icon mb-3 mb-sm-0 m-5">
                          <span className="btn-inner--text">Back</span>
                        </a>
                      </div>
                      <div className="col-md-6" style={{ marginTop: '153px', cursor: 'pointer' }} onClick={() => {
                        this.setState({ loan: false, currency: true });
                      }}>
                        <a href="#" className="btn btn-primary btn-icon mb-3 mb-sm-0 m-5">
                          <span className="btn-inner--text">Next</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="card-body" style={{ display: currency ? 'block' : 'none' }}>
                    <div className="alert alert-primary alert-dismissible fade show" role="alert">
                      <span className="alert-text">Choose your loan currency.</span>
                    </div>
                    <div className="btn-wrapper" style={{ marginTop: '25px', marginBottom: '247px', cursor: 'pointer' }} onClick={() => this.handleCollateralConversion(getTokenBySymbol[collateralCurrency] && getTokenBySymbol[collateralCurrency].address)}>
                      <span className="btn-inner--text"><img style={{ width: '25px' }} src="/assets/img/eth.png" /></span>
                      <br />
                      <p>Ethereum</p>
                    </div>
                    <div className="btn-wrapper" style={{ marginTop: '20px', cursor: 'pointer' }} onClick={() => { this.setState({ currency: false, loan: true }); }}>
                      <a href="#" className="btn btn-primary btn-icon mb-3 mb-sm-0 m-5">
                        <span className="btn-inner--text">Back</span>
                      </a>
                    </div>

                  </div>

                  <div className="card-body" style={{ display: borrow ? 'block' : 'none' }}>
                    <div className="alert alert-primary alert-dismissible fade show" role="alert">
                      <span className="alert-text">Great! you can borrow :</span>
                    </div>

                    {borrowLess ?
                      <div>
                        <input className="form-control form-control-lg" type="number" min="1" max={loanAmount} placeholder='Enter loan amount' Value={loanAmount} onChange={(e) => {
                          if (e.target.value > loanAmount)
                            this.setState({ alertLoanAmount: true, loanAmountInput: e.target.value });
                          else
                            this.setState({ alertLoanAmount: false, loanAmountInput: e.target.value });
                        }} />
                        {alertLoanAmount && <div className="alert alert-danger alert-dismissible fade show" role="alert">
                          <span className="alert-text">Please select less than or equal to {loanAmount}</span>
                        </div>}
                      </div>
                      :
                      <div>
                        <p style={{ border: 'solid grey 1px' }}>{loanAmount} ETH</p>
                        <a className="text-right" style={{ cursor: 'pointer' }} onClick={() => { this.setState({ borrowLess: true }) }}>want to borrow less ?</a>
                      </div>
                    }
                    <div className="row">
                      <div className="col-md-6" style={{ marginTop: '153px', cursor: 'pointer' }} onClick={() => { this.setState({ currency: true, borrow: false }); }}>
                        <a href="#" className="btn btn-primary btn-icon mb-3 mb-sm-0 m-5">
                          <span className="btn-inner--text">Back</span>
                        </a>
                      </div>
                      <div className="col-md-6" style={{ marginTop: '153px', cursor: 'pointer' }}
                        onClick={() => {
                          this.setState({ durationView: true, borrow: false, loanAmount: borrowLess ? loanAmountInput : loanAmount });
                          console.log('LOANAMOUNT : ', loanAmount);

                        }}>
                        <a href="#" className="btn btn-primary btn-icon mb-3 mb-sm-0 m-5">
                          <span className="btn-inner--text">Next</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="card-body" style={{ display: durationView ? 'block' : 'none' }}>
                    <div className="alert alert-primary alert-dismissible fade show" role="alert">
                      <span className="alert-text">Define loan duration.</span>
                    </div>
                    <br />

                    <div className="btn-wrapper" style={{ marginTop: '85px', cursor: 'pointer' }}>
                      {
                        durationArr.map((item, i) => {
                          return <button id={i} type="button" className="btn btn-outline-primary" onClick={() => { this.setState({ duration: item }) }}>{item}</button>;
                        })
                      }
                    </div>
                    <div className="row">
                      <div className="col-md-6" style={{ marginTop: '20px', cursor: 'pointer' }} onClick={() => { this.setState({ durationView: false, borrow: true }); }}>
                        <a href="#" className="btn btn-primary btn-icon mb-3 mb-sm-0 m-5">
                          <span className="btn-inner--text">Back</span>
                        </a>
                      </div>
                      <div className="col-md-6" style={{ marginTop: '20px', cursor: 'pointer' }} onClick={() => { this.setState({ durationView: false, monthlyInterest: true }) }}>
                        <a href="#" className="btn btn-primary btn-icon mb-3 mb-sm-0 m-5">
                          <span className="btn-inner--text">Next</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="card-body" style={{ display: monthlyInterest ? 'block' : 'none', marginBottom: monthlyInt ? '123px' : '260px' }}>
                    <div className="alert alert-primary alert-dismissible fade show" role="alert">
                      <span className="alert-text">Choose the monthly interest percentage for this loan.</span>
                    </div>


                    <div className="text-left">
                      <button className="btn btn-icon btn-primary" type="button" value="minus" onClick={this.handleMonthlyInterest}>
                        -
                    </button>
                    </div>
                    <div className="text-right">
                      <input className="form-control" type="text" value={monthlyInt} style={{ width: '60px', marginTop: '-43px', marginLeft: '373px' }} id="example-time-input" />
                    </div>
                    <div className="text-right" style={{ marginTop: '-44px' }}>
                      <button className="btn btn-icon btn-primary" type="button" value="plus" onClick={this.handleMonthlyInterest}>
                        +
                    </button>
                    </div>

                    <div className="btn-wrapper" style={{ marginTop: '20px', cursor: 'pointer' }} onClick={() => { this.setState({ durationView: true, monthlyInterest: false }) }}>
                      <a href="#" className="btn btn-primary btn-icon mb-3 mb-sm-0 m-5">
                        <span className="btn-inner--text">Back</span>
                      </a>
                    </div>


                  </div>
                  {monthlyInt ? <div>
                    <div className="alert alert-primary alert-dismissible fade show text-left pl-3 " role="alert">
                      <span className="alert-text">Total premium for this loan : {totalPremium} ETH ({apr.toFixed(2)}% APR)</span>
                    </div>
                    <h6 className="text-left pl-3" style={{ fontSize: "12px" }}>Monthly installment : {monthlyInstallment} ETH</h6>
                    <p className="text-left pl-3" style={{ fontSize: "12px" }}>Origination fee will be taken once the loan has been funded.</p>
                    <h6 className="text-left pl-3" style={{ fontSize: "13px" }}><span>Origination fee : {originationFee}%</span></h6>
                  </div>
                    : ''
                  }
                </div>
              </div>
              <div className="col-md-5">
                <div className="card">
                  <div className="card-header text-center">
                    Overview
                  </div>
                  <div className="card-body text-left mt-5" style={{ marginBottom: monthlyInt ? '176px' : '253px' }}>
                    {collateralValue ?
                      <div><p>Collateral : {collateralValue} {collateralCurrency}</p></div>
                      : <div><p>Collateral : (not set)</p></div>
                    }
                    {
                      loanAmount ? <div><p>Loan amount : {loanAmount} ETH </p></div>
                        :
                        <div><p>Loan amount : (not set)</p></div>
                    }
                    {
                      duration ? <p>Duration : {duration} days</p>
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
                  {monthlyInt ?
                    <div className="btn-wrapper text-center mb-5 mt-5" onClick={() => {
                      this.createLoanRequest(loanAmount, duration, monthlyInt * 100, collateralCurrency, collateralValue);
                    }}>
                      <br />
                      <a className="btn btn-primary btn-icon " style={{ color: 'white' }}>
                        <span className="btn-inner--text">Create</span>
                      </a>
                    </div>
                    : ''
                  }
                  {approveRequestAlert &&
                    <div className="alert alert-primary" role="alert">
                      <strong>Approve Transfer collateral of {collateralValue} {collateralCurrency} tokens</strong>
                    </div>
                  }
                  {approveRequestAlert &&

                    <button className="btn btn-primary" type="button" onClick={() => {
                      this.handleERC20TokenApproval(collateralAddress, loanContractAddress, collateralValue)
                    }}>
                      Approve
                  </button>}

                  {transferCollateralAlert &&
                    <div className="alert alert-primary" role="alert">
                      <strong>Transfer collateral of {collateralValue} {collateralCurrency} tokens</strong>
                    </div>
                  }
                  {transferCollateralAlert &&
                    <button className="btn btn-primary" type="button" onClick={() => {
                      this.handleTransferCollateral(loanContractAddress, collateralAddress)
                    }}>
                      Transfer
                  </button>}
                  {transferCollateralFailAlert && <div className="alert alert-warning mt-2" style={{ marginLeft: '-1.5%', width: '104.5%' }} role="alert">
                    Collateral transfer has failed.
                  </div>}
                  {transferCollateralSuccessAlert && <div className="alert alert-success mt-2" style={{ marginLeft: '-1.5%', width: '104.5%' }} role="alert">
                    Collateral has been transferred successfully. Your loan request is waiting to be funded now!
                  </div>}
                </div>
              </div>
            </div>
          </section>
        </div>
        {createRequestAlert && <div className="alert alert-success" style={{ marginLeft: '9.5%', width: '46.5%', marginTop: '-7%' }} role="alert">
          <strong>Congratulations! Loan Request is Created successfully!</strong>
        </div>}
        {createRequestAlert && <Link href={"https://ropsten.etherscan.io/tx/" + ropstenTransactionhash} style={{ color: '#fff' }} target='_blank'> Check transation on Ropsten </Link>}
      </div>
    );
  }
}

export default LoanRequest;

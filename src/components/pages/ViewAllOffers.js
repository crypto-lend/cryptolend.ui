// import libraries, services, styles and components 
import React, { Component } from "react";
import Nouislider from "nouislider-react";
import { GetLoans, FetchCollateralPrice } from "../../services/loanbook";
import {
  GetLoanDetails,
  GetRepaymentData,
  AcceptLoanOffer,
  FinalizeCollateralTransfer
} from "../../services/loanContract";
import { ExecuteTokenApproval } from '../../services/token';
import { supported_erc20_token, getTokenBySymbol, getTokenByAddress } from '../Web3/erc20';
import SweetAlert from "react-bootstrap-sweetalert";
import "./ViewAllOffers.css";
import Header from "./Header";

// create a class Component imported from react
class ViewAllOffers extends Component {

  //create `constructor()` and call `super()` method of parent class
  constructor() {
    super();

    // call `viewAllOffers()` method
    this.viewAllOffers();

    // initialize the state variables
    this.state = {
      loanOffers: [],
      collateralMetadataAlert: false,
      transferCollateralAlert: false,
      acceptCollateralAlert: false,
      approveCollateralAlert: false,
      safeness: 'SAFE',
      expireIn: '5D 15H 30M',
      waitingForBorrower: true,
      waitingForCollateral: false,
      waitingForPayback: false,
      finished: false,
      minMonthlyInt: '0',
      maxMonthlyInt: '5',
      minDuration: '0',
      maxDuration: '12',
      defaulted: false,
      collateralCurrencyToken: '',
      collateralAddress: "",
      loanAddress: '',
      activeLoanOffer: [],
      activeCollateralValue: 0,
      loanCurrency: '',
      collateralCurrency: 'ALL',
      erc20_tokens: [{ symbol: 'ALL' }, ...supported_erc20_token],
      loanOfferCount: 1
    };
  }

  // create `viewAllOffers()` method to get all Loans
  viewAllOffers = async () => {

    // try-catch block
    try {

      // assign `GetLoans()` method returned values to `loans`
      const loans = await GetLoans();

      // assign the `loanOffers` state variable to local variable
      let { loanOffers } = this.state;

      // traverse the loans and match the loan by address value
      for (const loanAddress of loans) {
        const loan = await GetLoanDetails(loanAddress);

        if (loan[5].toNumber() > 0) {
          let collaterals = [];
          let finished = 'waiting';

          for (var i in loan[13]) {
            collaterals.push({
              address: loan[13][i][0].split('000000000000000000000000')[0],
              ltv: window.web3.toBigNumber(loan[13][i][1]).toNumber(),
              mpr: window.web3.toBigNumber(loan[13][i][2]).toNumber() / 100,
              collateralCurrency: loan[13][i][3],
            });
          }
          if (loan[5].toNumber() > 2) {
            finished = true;
            let repayments = [];
            let borrower = loan[10];
            let currentDate = new Date();
            let startedOn = loan[4].toNumber();
            let duration = loan[1].toNumber();


            repayments = await this.getActiveLoanRepayments(loanAddress, duration);

            let dueDate = this.convertDateEpoc(startedOn,
              repayments[(duration / 30) - 1].repaymentNumber - 1
            );


            repayments.map((repay) => {
              if (repay.repayee !== borrower &&
                currentDate > dueDate) {
                finished = false;
              }
            })
          }

          loanOffers.push({
            loanAddress: loanAddress,
            loanAmount: window.web3.fromWei(loan[0].toNumber()),
            duration: loan[1].toNumber(),
            interest: loan[2].toNumber() / 100,
            collaterals: collaterals,
            status: loan[5].toNumber(),
            finished: finished
          });
        }
      }

      console.log('loanOffers >>>>', loanOffers);


      this.setState({ loanOffers });
    } catch (e) {
      console.error(e);
    }
  };

  // create `getActiveLoanRepayments()` method
  getActiveLoanRepayments = async (loanAddress, duration) => {

    // assign the `repayments` state variable to local variable
    let { repayments } = this.state;

    // create a new repayments array
    repayments = new Array();

    // try-catch block
    try {

      // calculate number of repayments
      let totalNumberOfRepayments = duration / 30;

      for (var i = 1; i <= totalNumberOfRepayments; i++) {
        const repaymentData = await GetRepaymentData(loanAddress, i);
        repayments.push(repaymentData);
      }

      return repayments;
    } catch (error) {
      console.log(error);
    }
  };

  // create `handleAcceptLoanOffer()` method
  handleAcceptLoanOffer = async loanContractAddress => {

    // try-catch block
    try {

      // call the `AcceptLoanOffer()` method with selected collateral address
      await AcceptLoanOffer(loanContractAddress);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    } finally {
    }
  };

  // create `handleCollateralTransfer()` method
  handleCollateralTransfer = async (loanContractAddress, collateralCurrencyToken) => {

    // assign collateralAddress value
    let collateralAddress = getTokenBySymbol[collateralCurrencyToken] && getTokenBySymbol[collateralCurrencyToken].address;

    //try-catch block
    try {

      // call `FinalizeCollateralTransfer()` method
      await FinalizeCollateralTransfer(loanContractAddress, collateralAddress);
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  // create `handleCollateralConversion()` method
  handleCollateralConversion = async (activeLoanOffer, collateralCurrencyToken) => {

    // add LTV ratio of collateral as third argument to this function or use the default value 200
    let ltv = 200;

    // assign collateral address value
    let collateralAddress = getTokenBySymbol[collateralCurrencyToken] && getTokenBySymbol[collateralCurrencyToken].address;

    // traverse `activeLoanOffer` array and set state variables
    activeLoanOffer.collaterals.map((item, i) => {
      if (getTokenByAddress[item.address] && getTokenByAddress[item.address].symbol === collateralCurrencyToken) {
        ltv = item.ltv;
        this.setState({ collateralAddress: collateralAddress, collateralCurrencyToken: collateralCurrencyToken });
      }
    })

    // try-catch block
    try {

      // assign `FetchCollateralPrice()` value to collateralPrice
      const collateralPrice = await FetchCollateralPrice({
        collateralAddress: collateralAddress
      });


      /* while assigning state variable `activeCollateralValue` and calculating collateralValue, this formula is used
      ((window.web3.toWei(loanAmount) / window.web3.toWei(collateralPrice))* (ltv/100))*/
      this.setState({
        activeCollateralValue: ((window.web3.toWei(activeLoanOffer.loanAmount) / (window.web3.toWei(collateralPrice)) * (ltv / 100)))
      })

    } catch (error) {

    }
  }

  // create `hideAlertCancel()` method to hide the cancel option
  hideAlertCancel = () => {
    this.setState({ collateralMetadataAlert: false });
  };

  // create `hideAlertConfirm()` method to hide the confirm option
  hideAlertConfirm = () => {
    this.setState({
      collateralMetadataAlert: false,
      acceptCollateralAlert: true
    });
  };

  // create `hideAlertAcceptCollateralCancel()` method to hide the Accept Collateral's Cancel option
  hideAlertAcceptCollateralCancel = () => {
    this.setState({ acceptCollateralAlert: false });
  };

  // create `hideAlertTransferCollateralCancel()` method to hide the Transfer Collateral's Cancel option
  hideAlertTransferCollateralCancel = () => {
    this.setState({ transferCollateralAlert: false });
  };

  // create `hideAlertAcceptCollateralConfirm()` method to hide the Accept Collateral's Cancel option
  hideAlertAcceptCollateralConfirm = async () => {
    const { loanAddress } = this.state;
    const transferCollateralAlert = await this.handleAcceptLoanOffer(loanAddress);
    this.setState({ acceptCollateralAlert: false, approveCollateralAlert: true });
  }

  // create `hideAlertTransferCollateralConfirm()` method to hide the Transfer Collateral's Confirm option
  hideAlertTransferCollateralConfirm = async () => {
    let { loanAddress, collateralCurrencyToken } = this.state;
    this.setState({ transferCollateralAlert: false });
    this.handleCollateralTransfer(loanAddress, collateralCurrencyToken);
  }

  // create `hideAlertAppproveCollateralConfirm()` method to hide the Approve Collateral's Confirm option
  hideAlertAppproveCollateralConfirm = async (collateralCurrencyToken, loanContractAddress, collateralValue) => {
    let collateralAddress = getTokenBySymbol[collateralCurrencyToken] && getTokenBySymbol[collateralCurrencyToken].address;
    try {
      await ExecuteTokenApproval({
        ERC20Token: collateralAddress,
        loanContractAddress: loanContractAddress,
        tokenAmount: collateralValue
      });

      this.setState({
        approveCollateralAlert: false,
        transferCollateralAlert: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  // create `hideAlertApproveCollateralCancel()` method to hide the Approve Collateral's Cancel option
  hideAlertApproveCollateralCancel = async (collateralAddress, loanContractAddress, collateralValue) => {
    this.setState({ approveRequestAlert: false, acceptCollateralAlert: false });
    console.log("collateralAddress : ", collateralAddress);
  }

  // create `handleTakeThisLoan()` method to handle the take loan
  handleTakeThisLoan = (loanOffer) => {
    this.setState({ collateralMetadataAlert: true, loanAddress: loanOffer.loanAddress, activeLoanOffer: loanOffer });
  }

  /** create `convertDateEpoc()` method */
  convertDateEpoc = (currentDueDate, i) => {
    let date = new Date(currentDueDate * 1000);
    date.setMinutes(date.getMinutes() + (i + 1) * 30);
    return date;
  };

  // call `render()` method to display the frontend
  render() {

    // assign the state variables to their respective local variables
    let {
      erc20_tokens,
      minDuration,
      maxDuration,
      collateralMetadataAlert,
      transferCollateralAlert,
      acceptCollateralAlert,
      collateralCurrencyToken,
      activeLoanOffer,
      activeCollateralValue,
      loanAddress,
      approveCollateralAlert,
      loanOffers,
      maxMonthlyInt,
      minMonthlyInt,
      waitingForPayback,
      finished,
      defaulted,
      waitingForBorrower,
      collateralCurrency,
      loanOfferCount
    } = this.state;

    // call `render()` method to display the frontend
    return (
      <div className="ViewAllOffers text-center">

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

            {/** create ViewAll Offers components UI */}
            <div
              className="container d-flex align-items-left"
              style={{ marginLeft: "-15px" }}
            >
              <div className="card card-pricing border-0 col-md-4">
                <div className="card-header bg-transparent">
                  <i className="fa fa-filter" aria-hidden="true"></i>
                  <a className="ls-1 text-primary py-3 mb-0 ml-2">
                    View All Offers
                  </a>
                </div>
                <div className="card-body">
                  <ul className="list-unstyled my-4">
                    {/** Select Loan crrency */}
                    <li>
                      <div className="form-group">
                        <label for="exampleFormControlSelect1">
                          Loan Currency
                        </label>
                        <select
                          className="form-control"
                          id="exampleFormControlSelect1"
                          onClick={e => {
                            this.setState({
                              loanCurrency: e.target.value
                            });
                          }}
                        >
                          <option>ETH</option>;
                        </select>
                      </div>
                    </li>
                    {/** Select Collateral Currency */}
                    <li>
                      <div className="form-group">
                        <label for="exampleFormControlSelect1">
                          Collateral Currency
                        </label>
                        <select
                          className="form-control"
                          id="exampleFormControlSelect1"
                          onClick={e => {
                            this.setState({
                              collateralCurrency: e.target.value
                            });
                          }}
                        >
                          {erc20_tokens.map((item, i) => {
                            return <option>{item.symbol}</option>;
                          })}
                        </select>
                      </div>
                    </li>
                    {/** set Loan state */}
                    <li>
                      <div className="card">
                        <label for="">Loan state</label>
                        <div className="card-body">
                          <form>
                            <div className="row">
                              <div className="col text-left">
                                <div className="custom-control custom-checkbox mb-3 ">
                                  <input
                                    className="custom-control-input"
                                    id="customCheck1"
                                    type="checkbox"
                                    checked={this.state.waitingForBorrower}
                                    onClick={() => {
                                      this.setState({
                                        waitingForBorrower: !this.state
                                          .waitingForBorrower
                                      });
                                    }}
                                  />
                                  {/** Loan state: Waiting for Borrowers UI */}
                                  <label
                                    className="custom-control-label"
                                    for="customCheck1"
                                  >
                                    Waiting for Borrowers
                                  </label>
                                </div>

                                {/** Loan state: Waiting for Payback UI */}
                                <div className="custom-control custom-checkbox mb-3 ">
                                  <input
                                    className="custom-control-input"
                                    id="customCheck3"
                                    type="checkbox"
                                    checked={this.state.waitingForPayback}
                                    onClick={() => {
                                      this.setState({
                                        waitingForPayback: !this.state
                                          .waitingForPayback
                                      });
                                    }}
                                  />
                                  <label
                                    className="custom-control-label"
                                    for="customCheck3"
                                  >
                                    Waiting for Payback
                                  </label>
                                </div>
                                {/** Loan state: Finished UI */}
                                <div className="custom-control custom-checkbox mb-3 ">
                                  <input
                                    className="custom-control-input"
                                    id="customCheck4"
                                    type="checkbox"
                                    checked={this.state.finished}
                                    onClick={() => {
                                      this.setState({
                                        finished: !this.state.finished
                                      });
                                    }}
                                  />
                                  <label
                                    className="custom-control-label"
                                    for="customCheck4"
                                  >
                                    Finished
                                  </label>
                                </div>{" "}
                                {/** Loan state: Finished UI */}
                                <div className="custom-control custom-checkbox mb-3 ">
                                  <input
                                    className="custom-control-input"
                                    id="customCheck5"
                                    type="checkbox"
                                    checked={this.state.defaulted}
                                    onClick={() => {
                                      this.setState({
                                        defaulted: !this.state.defaulted
                                      });
                                    }}
                                  />
                                  <label
                                    className="custom-control-label"
                                    for="customCheck5"
                                  >
                                    Defaulted
                                  </label>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </li>
                    {/** Select minimum and maximum Montly Interest */}
                    <li>
                      <div className="mt-3">
                        <label for="">Monthly Interest</label>
                        <div className="">
                          <label style={{ marginLeft: "-180px" }}>
                            {" "}
                            ({minMonthlyInt} %){" "}
                          </label>
                        </div>
                        <div
                          className=""
                          style={{ marginRight: "-180px", marginTop: "-30px" }}
                        >
                          <label> ({maxMonthlyInt} %)</label>
                        </div>
                        {/** Nouislider component */}
                        <Nouislider
                          range={{ min: 0, max: 5 }}
                          start={[0, 5]}
                          connect
                          onChange={e => {
                            this.setState({
                              minMonthlyInt: e[0],
                              maxMonthlyInt: e[1]
                            });
                          }}
                        />
                      </div>
                    </li>
                    {/** Select minimum and maximum loan duration */}
                    <li>
                      <div className="mt-3">
                        <label for="">Duration</label>
                        <div className="">
                          <label style={{ marginLeft: "-180px" }}>
                            {" "}
                            ({this.state.minDuration} Month){" "}
                          </label>
                        </div>
                        <div
                          className=""
                          style={{ marginRight: "-180px", marginTop: "-30px" }}
                        >
                          <label> ({this.state.maxDuration} Month)</label>
                        </div>
                        {/** Nouislider component */}
                        <Nouislider
                          range={{ min: 0, max: 12 }}
                          start={[0, 12]}
                          connect
                          onChange={e => {
                            this.setState({
                              minDuration: e[0],
                              maxDuration: e[1]
                            });
                            console.log(this.state.maxDuration);
                          }}
                        />
                      </div>
                    </li>
                  </ul>
                </div>
                {/**Reset UI filters */}
                <div className="card-footer">
                  <a href="#!" className=" text-muted">
                    Reset Filters
                  </a>
                </div>
              </div>
              {/** map Loan Offers as per the filters */}
              <div className="ml-4 row">
                {loanOffers.map((loanOffer, index) => (
                  ((waitingForBorrower && loanOffer.status == 1) || (waitingForPayback && loanOffer.status == 3 && loanOffer.finished === 'waiting') || (finished && loanOffer.status == 3 && loanOffer.finished) || (defaulted && loanOffer.status == 3 && !loanOffer.finished)) &&
                    (loanOffer.duration / 30 > minDuration && loanOffer.duration / 30 < maxDuration) &&
                    ((loanOffer.collaterals[0] && loanOffer.collaterals[0].mpr > minMonthlyInt && loanOffer.collaterals[0].mpr < maxMonthlyInt) ||
                      (loanOffer.collaterals[1] && loanOffer.collaterals[1].mpr > minMonthlyInt && loanOffer.collaterals[1].mpr < maxMonthlyInt) ||
                      (loanOffer.collaterals[2] && loanOffer.collaterals[2].mpr > minMonthlyInt && loanOffer.collaterals[2].mpr < maxMonthlyInt) ||
                      (loanOffer.collaterals[3] && loanOffer.collaterals[3].mpr > minMonthlyInt && loanOffer.collaterals[3].mpr < maxMonthlyInt) ||
                      (loanOffer.collaterals[4] && loanOffer.collaterals[4].mpr > minMonthlyInt && loanOffer.collaterals[4].mpr < maxMonthlyInt) ||
                      (loanOffer.collaterals[5] && loanOffer.collaterals[5].mpr > minMonthlyInt && loanOffer.collaterals[5].mpr < maxMonthlyInt)) &&
                    ((collateralCurrency == 'ALL') || ((loanOffer.collaterals[0] && getTokenByAddress[loanOffer.collaterals[0].address] && getTokenByAddress[loanOffer.collaterals[0].address].symbol == collateralCurrency) ||
                      (loanOffer.collaterals[1] && getTokenByAddress[loanOffer.collaterals[1].address] && getTokenByAddress[loanOffer.collaterals[1].address].symbol == collateralCurrency) ||
                      (loanOffer.collaterals[2] && getTokenByAddress[loanOffer.collaterals[2].address] && getTokenByAddress[loanOffer.collaterals[2].address].symbol == collateralCurrency) ||
                      (loanOffer.collaterals[3] && getTokenByAddress[loanOffer.collaterals[3].address] && getTokenByAddress[loanOffer.collaterals[3].address].symbol == collateralCurrency) ||
                      (loanOffer.collaterals[4] && getTokenByAddress[loanOffer.collaterals[4].address] && getTokenByAddress[loanOffer.collaterals[4].address].symbol == collateralCurrency) ||
                      (loanOffer.collaterals[5] && getTokenByAddress[loanOffer.collaterals[5].address] && getTokenByAddress[loanOffer.collaterals[5].address].symbol == collateralCurrency))) && (loanOfferCount++) ?
                    <div key={index} className={loanOfferCount > 3 ? "col-md-4" : "col"}>
                      <div className="card">
                        <div className="card-header">
                          <div className="row row-example">
                            <div className="mx-auto mb-2">
                              {loanOffer.collaterals.map((collateral) => {
                                return getTokenByAddress[collateral.address] && <img src={`/assets/img/32/color/` + (getTokenByAddress[collateral.address] && getTokenByAddress[collateral.address].symbol) + `.png`} style={{ width: '30px' }} />;
                              })
                              }
                            </div>
                          </div>
                          <div
                            className="ml-3"
                            style={{ fontSize: "x-small" }}
                          >
                            LTV {loanOffer.collaterals.map((item) => {
                              return item.ltv + "% ";
                            })}

                          </div>
                          <div
                            className="ml-3"
                            style={{ fontSize: "x-small" }}
                          >
                            MPR {loanOffer.collaterals.map((item) => {
                              return item.mpr + "% ";
                            })}

                          </div>
                        </div>
                        <div className="card-body ">
                          <p style={{ fontSize: "small" }}>Duration  : {loanOffer.duration} days</p>
                          <p style={{ fontSize: "small" }}>Amount  : {loanOffer.loanAmount} ETH</p>

                          {/** if loanOffer status is active, then take this loan*/}
                          {loanOffer.status === 1 && <div className="btn-wrapper text-center" onClick={() => {
                            this.handleTakeThisLoan(loanOffer)
                          }}>
                            <a href="#" className="btn btn-primary btn-icon mt-2">
                              <span className="btn-inner--text">
                                Take this loan
                              </span>
                            </a>
                          </div>}
                        </div>
                      </div>
                      <div
                        className="alert alert-primary alert-dismissible fade show text-center"
                        role="alert"
                      >
                        <span className="alert-text">{(loanOffer.status == 1 && waitingForBorrower) ? 'Waiting for borrower'
                          : (loanOffer.status == 3 && waitingForPayback && loanOffer.finished == 'waiting') ? 'Waiting for payback'
                            : (loanOffer.status == 3 && finished && loanOffer.finished) ? 'Finished'
                              : (loanOffer.status == 3 && defaulted && !loanOffer.finished) ? 'Defaulted'
                                : 'Waiting for payback'}</span>
                      </div>
                    </div>
                    : ''
                ))}
                {/** Loan offer status SweetAlert components*/}
                {collateralMetadataAlert && (
                  <SweetAlert
                    info
                    showCancel
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    confirmBtnBsStyle="info"
                    cancelBtnBsStyle="default"
                    customIcon="thumbs-up.jpg"
                    title="Take this loan?"
                    onConfirm={this.hideAlertConfirm}
                    onCancel={this.hideAlertCancel}
                  >
                    <div
                      className="col-md-5 form-group mt-5"
                      style={{ marginLeft: "27%" }}
                    >
                      <label for="exampleFormControlSelect1">
                        Select collateral
                      </label>
                      {/** select collateral and handle its conversion in native currency say Matic/ETH */}
                      <select
                        className="form-control"
                        style={{ width: "80px", display: "inline" }}
                        onClick={e => {
                          this.handleCollateralConversion(activeLoanOffer, e.target.value);
                        }}
                      >
                        {activeLoanOffer.collaterals.map((item, i) => {
                          return <option>{getTokenByAddress[item.address] && getTokenByAddress[item.address].symbol}</option>;
                        })}
                      </select>

                      {activeLoanOffer.collaterals.map((item, i) => {
                        return (getTokenByAddress[item.address] && getTokenByAddress[item.address].symbol === collateralCurrencyToken) && <label for="exampleFormControlSelect1" key={i}>
                          MPR : {item.mpr} &nbsp; LTV : {item.ltv}%
                        </label>;
                      })}
                    </div>
                  </SweetAlert>
                )}

                {/** acceptCollateral status SweetAlert component*/}
                {acceptCollateralAlert && (
                  <SweetAlert
                    warning
                    showCancel
                    confirmBtnText="Accept"
                    confirmBtnBsStyle="info"
                    cancelBtnBsStyle="default"
                    title="Accept Loan Offer"
                    onConfirm={this.hideAlertAcceptCollateralConfirm}
                    onCancel={this.hideAlertAcceptCollateralCancel}
                  >
                    Accept Transfer collateral of {activeCollateralValue}{" "}
                    {collateralCurrencyToken} tokens
                  </SweetAlert>
                )}
                {/** approveCollateral status SweetAlert component*/}
                {approveCollateralAlert && (
                  <SweetAlert
                    warning
                    showCancel
                    confirmBtnText="Approve"
                    confirmBtnBsStyle="info"
                    cancelBtnBsStyle="default"
                    title="Approve Loan Offer"
                    onConfirm={() => { this.hideAlertAppproveCollateralConfirm(collateralCurrencyToken, loanAddress, activeCollateralValue) }}
                    onCancel={this.hideAlertApproveCollateralCancel}
                  >
                    Approve Transfer collateral of {activeCollateralValue}{" "}
                    {collateralCurrencyToken} tokens
                  </SweetAlert>
                )}
                {/** transferCollateral status SweetAlert component*/}
                {transferCollateralAlert && (
                  <SweetAlert
                    info
                    showCancel
                    confirmBtnText="Transfer"
                    confirmBtnBsStyle="info"
                    cancelBtnBsStyle="default"
                    title="Transfer Collateral"
                    onConfirm={this.hideAlertTransferCollateralConfirm}
                    onCancel={this.hideAlertTransferCollateralCancel}
                  >
                    Transfer collateral of {activeCollateralValue} {collateralCurrencyToken} tokens
                  </SweetAlert>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

// export class component `ViewAllOffers`
export default ViewAllOffers;

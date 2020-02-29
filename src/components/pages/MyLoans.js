import React, { Component } from "react";
import ReactCountryFlag from "react-country-flag";
import {
  LoanBookABI,
  LoanBookAddress,
  LoanContractABI,
  StandardTokenABI,
  ERC20TokenABI
} from "../Web3/abi";
import Loader from "react-loader";
import Header from "../pages/Header";
import { supported_erc20_token, getTokenBySymbol, getTokenByAddress } from '../Web3/erc20';
import { enableWeb3 } from '../Web3/enableWeb3';
import { GetLoans } from "../../services/loanbook";
import {
  GetLoanDetails,
  ApproveAndFundLoanRequest,
  GetRepaymentData,
  RepayLoan,
  ClaimCollateralByBorrower,
  ClaimCollateralByLender,
  LiquidateLoanCollateral
} from "../../services/loanContract";
import "../../assets/vendor/font-awesome/css/font-awesome.css";
import "../../assets/vendor/nucleo/css/nucleo.css";
import "./MyLoans.css";

class MyLoans extends Component {
  constructor() {
    super();
    enableWeb3();
    this.viewMyLoans();

    this.state = {
      myBorrowedLoans: [],
      myFundedLoans: [],
      repayments: [],
      activeLoan: [],
      loanStatuses: [
        "INACTIVE",
        "OFFER",
        "REQUEST",
        "ACTIVE",
        "FUNDED",
        "REPAID",
        "DEFAULT"
      ],
      currentDate: null,
      currentDueDate: null,
      repaymentDuration: 0,
      activeRepayment: 0,
      currentLoanAddress: "",
      currentLoanNumber: 0,
      repaymentIndex: 0,
      currentCollateralValue: "",
      loaded: true,
      approveRequestAlert: false,
      transferCollateralAlert: false,
      borrowedLoans: true,
      fundedLoans: false,
      showDropDown: null,
      loanRepaid:0
    };
  }

  //Get All Loans
  viewMyLoans = async () => {
    try {
      const loans = await GetLoans();

      let currentDate = new Date();
      this.setState({ currentDate: currentDate });

      let { myBorrowedLoans, myFundedLoans } = this.state;
      myBorrowedLoans = [];
      myFundedLoans = [];
      loans.map(async loanAddress => {
        const loan = await GetLoanDetails(loanAddress);
        const user = window.web3.eth.accounts[0];

        if (loan[10] === user && loan[5].toNumber()>2) {
          myBorrowedLoans.push({
            loanAddress: loanAddress,
            loanAmount: window.web3.fromWei(loan[0].toNumber()),
            duration: loan[1].toNumber(),
            interest: loan[2].toNumber(),
            createOn: loan[3].toNumber(),
            startedOn: loan[4].toNumber(),
            status: loan[5].toNumber(),
            collateralAddress: loan[6],
            collateralAmount: loan[7].toNumber(),
            collateralPrice: loan[8].toNumber(),
            collateralStatus: loan[9].toNumber(),
            borrower: loan[10],
            lender: loan[11],
            liquidatedAmount: window.web3.fromWei(loan[12].toNumber()),
            collaterals: {
              address: loan[13][0][0],
              ltv: loan[13][0][1],
              mpr: loan[13][0][2]
            }
          });
          this.setState({
            myBorrowedLoans: myBorrowedLoans
          });
        }
        if (loan[11] === user && loan[5].toNumber()>2 ) {
          myFundedLoans.push({
            loanAddress: loanAddress,
            loanAmount: window.web3.fromWei(loan[0].toNumber()),
            duration: loan[1].toNumber(),
            interest: loan[2].toNumber(),
            createOn: loan[3].toNumber(),
            startedOn: loan[4].toNumber(),
            status: loan[5].toNumber(),
            collateralAddress: loan[6],
            collateralAmount: loan[7].toNumber(),
            collateralPrice: loan[8].toNumber(),
            collateralStatus: loan[9].toNumber(),
            borrower: loan[10],
            lender: loan[11],
            liquidatedAmount: window.web3.fromWei(loan[12].toNumber()),
            collaterals: {
              address: loan[13][0][0],
              ltv: loan[13][0][1],
              mpr: loan[13][0][2]
            }
          });

          console.log(myFundedLoans);
          this.setState({
            myFundedLoans: myFundedLoans
          });
        }
      });
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  getActiveLoanRepayments = async (loanAddress, duration) => {
    let { repayments } = this.state;

    repayments = new Array();
    try {
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

  getInActiveLoanRepayments = loanAddress => {};

  handleLoanRepayment = async (loanContractAddress, repaymentAmount) => {
    // Repay Loan
    try {
      await RepayLoan(loanContractAddress, repaymentAmount);
    } catch (error) {
      console.log(error);
    }
  };

  handleLoanRepaid = async (repayments, activeLoan, currentDate) => {
    try {
      let {loanRepaid} = this.state;
      let totalRepayment = 0;
      let totalRepaid = 0;
      repayments.map((repayment) => {
        totalRepayment = totalRepayment + parseFloat(repayment.totalRepaymentAmount)
        if(activeLoan.borrower === repayment.repayee){
          totalRepaid = totalRepaid + parseFloat(repayment.totalRepaymentAmount)
        }
      })

      this.setState({loanRepaid:((totalRepaid/totalRepayment)*100)})
    } catch (error) {
      console.log(error);
    }

  }

  handleRepaymentRows = (
    currentLoanAddress,
    duration,
    currentDueDate,
    currentCollateralValue
  ) => {
    let {
      repaymentRows,
      repaymentAmount,
      repaymentNumber,
      loanAddresses,
      dueDate,
      currentDate,
      repaymentIndex,
      activeRepayment
    } = this.state;
    repaymentRows = [];

    for (var i = 0; i < duration / 30; i++) {
      repaymentRows.push(
        <tr id="repay" key={i}>
          <td>
            <div className="media-body">
              <span className="mb-0 text-sm">Repayment No.</span>
            </div>
            <span className="badge-dot">
              <i className="bg-info"> </i>
              {i + 1}
            </span>
          </td>
          <td>
            <div className="media-body">
              <span className="mb-0 text-sm">Amount</span>
            </div>
            <span>{repaymentAmount[i]} ETH</span>
          </td>
          <td>
            <div className="media-body">
              <span className="mb-0 text-sm">Due Date</span>
            </div>
            <span>
              {
                this.convertDate(currentDueDate, i).split(
                  " GMT+0530 (India Standard Time)"
                )[0]
              }
            </span>
          </td>
          <td>
            <div className="media-body">
              <span className="mb-0 text-sm">Status</span>
            </div>
            <span>{currentDate > dueDate[i] ? "Due" : "Defaulted"}</span>
          </td>

          <td>
            <div className="media-body">
              <span className="mb-0 text-sm">Action</span>
            </div>
            <span>
              <button
                className={
                  repaymentIndex == activeRepayment
                    ? "btn btn-success"
                    : "btn btn-primary"
                }
                style={{ fontSize: "9px", padding: "2px", fontStyle: "bold" }}
                type="button"
                onClick={() => {
                  console.log(
                    "currentLoanAddress",
                    currentLoanAddress,
                    "repaymentAmount",
                    repaymentAmount[repaymentIndex]
                  );
                  this.handleRepayment(
                    currentLoanAddress,
                    repaymentAmount[repaymentIndex]
                  );
                  this.setState({ repaymentIndex: repaymentIndex + 1 });
                }}
              >
                Repay
              </button>
            </span>
          </td>

          <td>
            <div className="media-body">
              <span className="mb-0 text-sm">Comments</span>
            </div>
            <span>--</span>
          </td>

          <td>
            <div className="media-body">
              <span className="mb-0 text-sm">Collateral</span>
            </div>
            <span>Value : {currentCollateralValue} {/*getTokenByAddress[loan.collateralAddress] && getTokenByAddress[loan.collateralAddress].symbol*/}</span>
          </td>
          {/*repaymentIndex==duration/30 && <td>
               <button className="btn btn-primary" type="button" onClick={()=>{
                 this.handleReturnCollateralToBorrower(loanAddresses[i])
                 }}>
                 Claim
               </button>
               </td>*/}
        </tr>
      );
    }
    return repaymentRows;
  };

  approveRequest = (
    collateralAddress,
    loanContractAddress,
    collateralAmount
  ) => {
    // Transfer Collateral to Loan Contract
    // this will be two transaction, first transaction will be to Token Contract and Second will be to Loan Contract

    // Transaction 1 Approval

    this.setState({ approveRequestAlert: true });

    const tokenContractInstance = window.web3.eth
      .contract(StandardTokenABI)
      .at(collateralAddress);
    tokenContractInstance.approve(
      loanContractAddress,
      collateralAmount,
      {
        from: window.web3.eth.accounts[0]
      },
      function(err, res) {
        if (!err) {
          console.log(res);
          window.location = "/myloans";
        } else {
        }
      }
    );
  };

  handleTransferCollateral = loanContractAddress => {
    // Transfer Collateral to Loan Contract

    // Transaction 2 Transfer to Loan Contract
    this.setState({ transferCollateralAlert: true });
    const LoanInstance = window.web3.eth
      .contract(LoanContractABI)
      .at(loanContractAddress);
    LoanInstance.transferCollateralToLoan(
      {
        from: window.web3.eth.accounts[0]
      },
      function(err, res) {
        if (!err) console.log(res);
        window.location = "/myloans";
      }
    );
  };

  handleReturnCollateralToBorrower = loanAddress => {
    const LoanInstance = window.web3.eth
      .contract(LoanContractABI)
      .at(loanAddress);
    LoanInstance.returnCollateralToBorrower((err, res) => {
      if (!err) {
        console.log(res);
      }
    });
  };

  convertDate = (currentDueDate, i) => {
    let date = new Date(currentDueDate * 1000);
    date.setMinutes(date.getMinutes() + (i + 1) * 30);
    date = date.toString();
    return date;
  };

  convertDateEpoc = (currentDueDate, i) => {
    let date = new Date(currentDueDate * 1000);
    date.setMinutes(date.getMinutes() + (i + 1) * 30);
    return date;
  };

  render() {
    const {
      myBorrowedLoans,
      myFundedLoans,
      repayments,
      activeLoan,
      loanRepaid,
      currentDate,
      borrowedLoans,
      fundedLoans,
      display1,
      loanStatuses,
      loaded,
      approveRequestAlert,
      transferCollateralAlert,
      showDropDown
    } = this.state;
    return (
      <div className="MyLoans text-center">
        {/*<Loader loaded={loaded}/>*/}
        <Header />
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
            <div className="d-flex align-items-center">
              <div className="col px-0">
                <div className="card">
                  <div className="card-header text-left">
                    <a
                      href="#"
                      className={
                        borrowedLoans
                          ? " btn btn-primary"
                          : " btn btn-secondary"
                      }
                      onClick={() => {
                        this.setState({
                          borrowedLoans: true,
                          fundedLoans: false
                        });
                      }}
                    >
                      My Borrowed Loans
                    </a>
                    <a
                      href="#"
                      className={
                        fundedLoans ? "btn btn-primary" : "btn btn-secondary"
                      }
                      onClick={() => {
                        this.setState({
                          borrowedLoans: false,
                          fundedLoans: true
                        });
                      }}
                    >
                      My Funded Loans
                    </a>
                  </div>
                  <div className="card-body">
                    <div>
                      {borrowedLoans ? (
                        <div
                          className="table-responsive"
                          style={{ marginTop: "-25px" }}
                        >
                          <table className="table align-items-center table-flush">
                            <thead className="thead">
                              <tr>
                                <th scope="col">Loan Address</th>
                                <th scope="col">Loan Amount</th>
                                <th scope="col">Collateral Currency</th>
                                <th scope="col">Duration</th>
                                <th scope="col">MPR</th>
                                <th scope="col">Status</th>
                                <th scope="col">Expires on</th>
                                <th scope="col">
                                  <i className="fa fa-arrrow-down"></i>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {myBorrowedLoans.map((loan,i) => {
                                return (
                                  <>
                                    <tr key={i}>
                                      <th scope="row mt-3">
                                        <div className="media align-items-center">
                                          <div className="media-body">
                                            <span className="mb-0 text-sm">
                                              {loan.loanAddress}
                                            </span>
                                          </div>
                                        </div>
                                      </th>
                                      <td>
                                        <span className="badge-dot">
                                          <i className="bg-info"></i>{" "}
                                          {loan.loanAmount} ETH
                                        </span>
                                      </td>
                                      <td>
                                        <div className="text-center">
                                          <span className="">{getTokenByAddress[loan.collateralAddress] && getTokenByAddress[loan.collateralAddress].symbol}</span>
                                          <div></div>
                                        </div>
                                      </td>
                                      <td>
                                        <div className="text-center">
                                          <span className="">
                                            {loan.duration}
                                          </span>
                                          <div></div>
                                        </div>
                                      </td>

                                      <td>
                                        <div className="text-center">
                                          <span className="">
                                            {loan.interest / 100}%
                                          </span>
                                          <div></div>
                                        </div>
                                      </td>
                                      <td>
                                        <div className="text-center">
                                          <span className="">
                                            {" "}
                                            {loanStatuses[loan.status]}
                                          </span>
                                          <div></div>
                                        </div>
                                      </td>
                                      <td>
                                        <span className="">
                                          {
                                            this.convertDate(
                                              loan.startedOn,
                                              -1
                                            ).split(
                                              " GMT+0530 (India Standard Time)"
                                            )[0]
                                          }
                                        </span>
                                      </td>

                                      {loan.status > 0 && (
                                        <td>
                                          <DropDown
                                            id={loan.loanAddress}
                                            show={
                                              showDropDown === loan.loanAddress && loan.loanAddress === ( repayments && repayments.loanContractAddress )
                                            }
                                            activeLoan={loan}
                                            loanAddress={loan.loanAddress}
                                            duration={loan.duration}
                                            currentDate = {currentDate}
                                            self={this}
                                          />
                                        </td>
                                      )}
                                    </tr>
                                    {showDropDown === loan.loanAddress &&
                                      repayments.map((repayment, i) => {
                                        return (
                                          <tr id="repay" key={i}>
                                            <td>
                                              <div className="media-body">
                                                <span className="mb-0 text-sm">
                                                  Repayments
                                                </span>
                                              </div>

                                              <span className="badge-dot">
                                                <i className="bg-info"></i>{" "}
                                                {repayment &&
                                                  repayment.repaymentNumber}
                                              </span>
                                            </td>
                                            <td>
                                              <div className="media-body">
                                                <span className="mb-0 text-sm">
                                                  Amount
                                                </span>
                                              </div>
                                              <span>
                                                {repayment &&
                                                  repayment.totalRepaymentAmount}{" "}
                                                ETH
                                              </span>
                                            </td>
                                            <td>
                                              <div className="media-body">
                                                <span className="mb-0 text-sm">
                                                  Due Date
                                                </span>
                                              </div>
                                              <span>
                                                {
                                                  this.convertDate(
                                                    activeLoan.startedOn,
                                                    repayment.repaymentNumber-1
                                                  ).split(
                                                    " GMT+0530 (India Standard Time)"
                                                  )[0]
                                                }
                                              </span>
                                            </td>
                                            <td>
                                              <div className="media-body">
                                                <span className="mb-0 text-sm">
                                                  Status
                                                </span>
                                              </div>
                                              <span>
                                                {activeLoan.borrower === repayment.repayee
                                                  ? "Paid"
                                                  : currentDate >
                                                  this.convertDateEpoc(
                                                    activeLoan.startedOn,
                                                    repayment.repaymentNumber-1
                                                  )
                                                  ? "Defaulted"
                                                  : "Due"}
                                              </span>
                                            </td>
                                            {(currentDate <
                                            this.convertDateEpoc(
                                              activeLoan.startedOn,
                                              repayment.repaymentNumber-1
                                            )) &&
                                            activeLoan.borrower != repayment.repayee &&
                                            <td>
                                              <button
                                                className="btn btn-info"
                                                onClick={() => {
                                                  this.handleLoanRepayment(
                                                    repayment &&
                                                      repayment.loanContractAddress,
                                                    repayment &&
                                                      repayment.totalRepaymentAmount
                                                  );

                                                }}
                                              >
                                                Repay
                                              </button>
                                            </td>}
                                          </tr>
                                        );
                                      })}
                                      {showDropDown === loan.loanAddress && <tr>
                                      <td>
                                        <div className="media-body">
                                          <span className="mb-0 text-sm">
                                            {" "}
                                            Collateral Amount
                                          </span>
                                        </div>
                                        <span>
                                          {parseFloat(activeLoan.collateralAmount)}
                                          {activeLoan && getTokenByAddress[activeLoan.collateralAddress] && getTokenByAddress[activeLoan.collateralAddress].symbol}
                                        </span>
                                      </td>
                                      <td>
                                        <span>
                                          Loan Repaid{" "}
                                        </span>
                                        <span>
                                           { loanRepaid.toFixed(2) + "% "}
                                        </span>
                                      </td>
                                      <td>
                                        <span>
                                          Collateral Left {" "}
                                        </span>
                                        <span>
                                          {activeLoan && activeLoan.collateralAmount}
                                          {activeLoan && getTokenByAddress[activeLoan.collateralAddress] && getTokenByAddress[activeLoan.collateralAddress].symbol}
                                        </span>
                                      </td>
                                      {currentDate >
                                        this.convertDateEpoc(
                                          activeLoan.startedOn,
                                          repayments[(activeLoan.duration/30)-1].repaymentNumber-1
                                        )
                                        && activeLoan.collateralStatus<2
                                        &&
                                        loanRepaid.toFixed(2) == 100.00 &&
                                        <td>
                                        <button
                                          className="btn btn-primary"
                                          type="button"
                                          onClick={() => {
                                            ClaimCollateralByBorrower(
                                              repayments[(activeLoan.duration/30)-1].loanContractAddress
                                            );
                                          }}
                                        >
                                          Claim
                                        </button>
                                      </td>}
                                      </tr>}
                                  </>
                                );
                              })}
                            </tbody>
                          </table>

                        </div>
                      ) : (
                        <div
                          className="table-responsive"
                          style={{ marginTop: "-25px" }}
                        >
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
                                <th scope="col">
                                  <i className="fa fa-arrrow-down"></i>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  this.setState({ display1: false });
                                }}
                              />
                              {myFundedLoans.map(loan => {
                                return (
                                  <>
                                    <tr key={loan.loanAddress}>
                                      <th scope="row mt-3">
                                        <div className="media align-items-center">
                                          <div className="media-body">
                                            <span className="mb-0 text-sm">
                                              {loan.loanAddress}
                                            </span>
                                          </div>
                                        </div>
                                      </th>
                                      <td>
                                        <span className="badge-dot">
                                          <i className="bg-info"></i>{" "}
                                          {loan.loanAmount} ETH
                                        </span>
                                      </td>
                                      <td>
                                        <div className="text-center">
                                          <span className="">{getTokenByAddress[loan.collateralAddress] && getTokenByAddress[loan.collateralAddress].symbol}</span>
                                          <div></div>
                                        </div>
                                      </td>
                                      <td>
                                        <div className="text-center">
                                          <span className="">
                                            {loan.duration}
                                          </span>
                                          <div></div>
                                        </div>
                                      </td>

                                      <td>
                                        <div className="text-center">
                                          <span className="">
                                            {loan.interest / 100}%
                                          </span>
                                          <div></div>
                                        </div>
                                      </td>
                                      <td>
                                        <div className="text-center">
                                          <span className="">
                                            {" "}
                                            {loanStatuses[loan.status]}
                                          </span>
                                          <div></div>
                                        </div>
                                      </td>
                                      <td>
                                        <span className="">
                                          {
                                            this.convertDate(
                                              loan.startedOn,
                                              -1
                                            ).split(
                                              " GMT+0530 (India Standard Time)"
                                            )[0]
                                          }
                                        </span>
                                      </td>

                                      {loan.status > 0 && (
                                        <td>
                                          <DropDown
                                            id={loan.loanAddress}
                                            show={
                                              showDropDown === loan.loanAddress
                                            }
                                            activeLoan={loan}
                                            loanAddress={loan.loanAddress}
                                            duration={loan.duration}
                                            self={this}
                                          />
                                        </td>
                                      )}
                                    </tr>
                                    {showDropDown === loan.loanAddress &&
                                      repayments.map((repayment, i) => {
                                        return (
                                          <tr id="repay" key={i}>
                                            <td>
                                              <div className="media-body">
                                                <span className="mb-0 text-sm">
                                                  Repayments
                                                </span>
                                              </div>

                                              <span className="badge-dot">
                                                <i className="bg-info"></i>{" "}
                                                {repayment &&
                                                  repayment.repaymentNumber}
                                              </span>
                                            </td>
                                            <td>
                                              <div className="media-body">
                                                <span className="mb-0 text-sm">
                                                  Amount
                                                </span>
                                              </div>
                                              <span>
                                                {repayment &&
                                                  repayment.totalRepaymentAmount}{" "}
                                                ETH
                                              </span>
                                            </td>
                                            <td>
                                              <div className="media-body">
                                                <span className="mb-0 text-sm">
                                                  Due Date
                                                </span>
                                              </div>
                                              <span>
                                                {
                                                  this.convertDate(
                                                    activeLoan.startedOn,
                                                    repayment.repaymentNumber-1
                                                  ).split(
                                                    " GMT+0530 (India Standard Time)"
                                                  )[0]
                                                }
                                              </span>
                                            </td>
                                            <td>
                                              <div className="media-body">
                                                <span className="mb-0 text-sm">
                                                  Status
                                                </span>
                                              </div>
                                              <span>
                                              {activeLoan.borrower === repayment.repayee
                                                ? "Paid"
                                                : currentDate >
                                                this.convertDateEpoc(
                                                  activeLoan.startedOn,
                                                  repayment.repaymentNumber-1
                                                )
                                                ? "Defaulted"
                                                : "Due"}
                                              </span>
                                            </td>
                                            {currentDate >
                                              this.convertDateEpoc(
                                                activeLoan.startedOn,
                                                repayment.repaymentNumber-1
                                              )
                                              && activeLoan.borrower !== repayment.repayee
                                              && activeLoan.lender !== repayment.repayee
                                              && <td>
                                              <button
                                                className="btn btn-primary"
                                                type="button"
                                                onClick={() => {
                                                  ClaimCollateralByLender(
                                                    repayments[0].loanContractAddress, repayment.repaymentNumber
                                                  );
                                                }}
                                              >
                                                Claim
                                              </button>
                                            </td>}
                                          </tr>
                                        );
                                      })}
                                      {showDropDown === loan.loanAddress && <tr>
                                      <td>
                                        <div className="media-body">
                                          <span className="mb-0 text-sm">
                                            {" "}
                                            Collateral Amount
                                          </span>
                                        </div>
                                        <span>
                                          {activeLoan && activeLoan.collateralAmount}
                                          {activeLoan && getTokenByAddress[activeLoan.collateralAddress] && getTokenByAddress[activeLoan.collateralAddress].symbol}
                                        </span>
                                      </td>
                                      <td>
                                        <span>
                                          Loan Repaid {" "}
                                        </span>
                                        <span>
                                           { loanRepaid.toFixed(2) + "% " }
                                        </span>
                                      </td>
                                      <td>
                                        <span>
                                          Collateral Left {"   "}
                                        </span>
                                        <span>
                                          {activeLoan && activeLoan.collateralAmount}
                                          {activeLoan && getTokenByAddress[activeLoan.collateralAddress] && getTokenByAddress[activeLoan.collateralAddress].symbol}
                                        </span>
                                      </td>
                                      <td>
                                        <button
                                          className="btn btn-danger"
                                          type="button"
                                          dataToggle="tooltip"
                                          title="You can liquidate a portion of the loan’s collateral if the LTV exceeds 75%!"
                                          onClick={() => {
                                            LiquidateLoanCollateral(
                                              repayments[0].loanContractAddress
                                            );
                                          }}
                                        >
                                          Liquidate
                                        </button>
                                      </td>
                                      </tr>}
                                  </>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                      {/*<span className="alert-text">You haven't lent yet. Check the available loan request below!</span>*/}
                    </div>
                    <div className="btn-wrapper">
                      <a
                        href="/view-offers"
                        className="btn btn-primary btn-icon"
                        data-toggle="scroll"
                      >
                        <span className="btn-inner--text">View All Offers</span>
                      </a>
                      <a
                        href="/view-requests"
                        className="btn btn-primary btn-icon"
                      >
                        <span className="btn-inner--text">
                          View All Requests
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {approveRequestAlert && (
            <div className="alert alert-success" role="alert">
              <strong>Loan request approved successfully!</strong>
            </div>
          )}

          {transferCollateralAlert && (
            <div className="alert alert-success" role="alert">
              <strong>Transfer collateral successfully.</strong>
            </div>
          )}
        </div>
      </div>
    );
  }
}

function DropDown(props) {
  const {  id, show, loanAddress, duration, self, activeLoan, currentDate } = props;
  let { repayments } = self.state;
  return (
    <div className="dropdown">
      <button
        className="btn btn-info"
        onClick={async () => {
          self.setState({ repayments: [], showDropDown: null });
          repayments = await self.getActiveLoanRepayments(
            loanAddress,
            duration
          );
          self.setState({
            repayments: repayments, activeLoan: activeLoan,
            showDropDown: id
          });
          console.log("repayments - ", repayments);
          console.log("activeLoan - ", activeLoan);

          self.handleLoanRepaid(
            repayments, activeLoan, currentDate
          );

          self.viewMyLoans();
        }}



        aria-haspopup="true"
        aria-expanded="true"
      >
        Details
      </button>
    </div>
  );
}

export default MyLoans;

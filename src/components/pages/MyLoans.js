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
import { GetLoans } from "../../services/loanbook";
import {
  GetLoanDetails,
  ApproveAndFundLoanRequest,
  GetRepaymentData,
  RepayLoan
} from "../../services/loanContract";
import "../../assets/vendor/font-awesome/css/font-awesome.css";
import "../../assets/vendor/nucleo/css/nucleo.css";
import "./MyLoans.css";

class MyLoans extends Component {
  constructor() {
    super();
    this.viewMyLoans();

    this.state = {
      myBorrowedLoans: [],
      myFundedLoans: [],
      repayments: [],
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
      currentDueDate: "",
      currentCollateralValue: "",
      loaded: true,
      approveRequestAlert: false,
      transferCollateralAlert: false,
      borrowedLoans: true,
      fundedLoans: false,
      display1: false,
      display2: false,
      display3: false,
      display4: false,
      display5: false,
      display6: false,
      display7: false,
      display8: false,
      showDropDown: null
    };
  }

  //Get All Loans
  viewMyLoans = async () => {
    try {
      const loans = await GetLoans();

      let { myBorrowedLoans, myFundedLoans } = this.state;

      loans.map(async loanAddress => {
        const loan = await GetLoanDetails(loanAddress);
        const user = window.web3.eth.accounts[0];

        // if(loan[10] === user){

        myBorrowedLoans.push({
          loanAddress: loanAddress,
          loanAmount: window.web3.fromWei(loan[0].toNumber()),
          duration: loan[1].toNumber(),
          interest: loan[2].toNumber() / 100,
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
        // } else if(loan[11] === user) {

        myFundedLoans.push({
          loanAddress: loanAddress,
          loanAmount: window.web3.fromWei(loan[0].toNumber()),
          duration: loan[1].toNumber(),
          interest: loan[2].toNumber() / 100,
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
        // }
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
        return repayments;
      }

      console.log(repayments);
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
            <span>{currentDate > dueDate[i] ? "Due" : "Not Due"}</span>
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
            <span>Value : {currentCollateralValue} TTT</span>
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

  toggleMenu = id => {
    this.setState({
      showDropDown: id
    });
  };

  render() {
    const {
      myBorrowedLoans,
      myFundedLoans,
      repayments,
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
                              {myBorrowedLoans.map(loan => {
                                return (
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
                                        <span className="">TTTT</span>
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
                                          onClick={this.toggleMenu}
                                          show={
                                            showDropDown === loan.loanAddress
                                          }
                                          loanAddress={loan.loanAddress}
                                          duration={loan.duration}
                                          self={this}
                                        />

                                      </td>
                                    )}
                                  </tr>
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
                                        <span className="">TTTT</span>
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

                                    {loan.status > 2 && (
                                      <td>
                                        <button
                                          className="btn btn-info"
                                          type="button"
                                          onClick={() => {
                                            this.getRepayments(
                                              loan.loanAddress
                                            );
                                            // this.setState({display1:!display1, display2:false, display3:false, display4:false, display5:false, display6:false, display7:false, display8:false,
                                            //    repaymentDuration:loan.duration, currentLoanAddress:loan.loanAddress, currentLoanNumber:i+1, currentDueDate:dueDate[i], currentCollateralValue:collateralValue[i]
                                            //  })
                                            if (display1 === true)
                                              console.log("jere");
                                            window.location = "/myloans";
                                            // this.getPaidRepaymentsCount(currentLoanAddress)
                                          }}
                                        >
                                          +
                                        </button>
                                      </td>
                                    )}
                                  </tr>
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
  const { onClick, id, show, loanAddress, duration, self } = props;
  let {repayments} = self.state;
  return (
    <div className="dropdown">
      <button
        className="btn btn-info"
        onClick={async () =>{
          onClick(id);
          repayments = await self.getActiveLoanRepayments(loanAddress, duration);
          console.log("repayments", repayments);
          self.setState({repayments:repayments});
        }}
        aria-haspopup="true"
        aria-expanded="true"
      >
        Details
      </button>
      <div
        className={`dropdown-menu dropdown-menu-right dropdown-menu-arrow ${
          show ? "show" : ""
        }`}
        x-placement="bottom-end"
        style={{
          position: "absolute",
          willChange: "transform",
          top: "0px",
          left: "0px",
          transform: "translate3d(-160px, 31px, 0px)"
        }}
      >
      <table className="table align-items-center table-flush">
        <thead className="thead">
          <tr>
            <th scope="col">Repayment</th>
          </tr>
        </thead>
        <tbody>
        {
          repayments.map((repayment,i)=>{
            return <tr className="dropdown-item" key={i}>
            <td className="text-center">
            <span>{repayment && repayment.repaymentNumber}</span>
            </td>
            <td className="text-center">
            <span>{repayment && repayment.totalRepaymentAmount}</span>
            </td>
            <td className="">
            <button className="btn btn-info" style={{marginTop:'-10%'}} onClick={()=>{self.handleLoanRepayment(repayment.loanContractAddress,repayment.totalRepaymentAmount)}}>Repay</button>
            </td>
            </tr>
          })
        }
        </tbody>
        </table>

      </div>
    </div>
  );
}

export default MyLoans;

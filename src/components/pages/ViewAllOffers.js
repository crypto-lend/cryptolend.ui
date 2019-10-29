import React, { Component } from "react";
import Nouislider from "nouislider-react";
import { GetLoans, FetchCollateralPrice } from "../../services/loanbook";
import {
  GetLoanDetails,
  AcceptLoanOffer,
  FinalizeCollateralTransfer
} from "../../services/loanContract";
import { ExecuteTokenApproval } from '../../services/token';
import { supported_erc20_token, getTokenBySymbol, getTokenByAddress } from '../Web3/erc20';
import SweetAlert from "react-bootstrap-sweetalert";
import "./ViewAllOffers.css";
import Header from "./Header";

class ViewAllOffers extends Component {
  constructor() {
    super();
    this.viewAllOffers();
    this.state = {
      loanOffers: [],
      collateralMetadataAlert:false,
      transferCollateralAlert:false,
      acceptCollateralAlert:false,
      approveCollateralAlert:false,
      safeness: 'SAFE',
      expireIn: '5D 15H 30M',
      waitingForBorrower:true,
      waitingForCollateral:true,
      waitingForPayback:true,
      finished:true,
      minMonthlyInt:'0',
      maxMonthlyInt:'5',
      minDuration:'0',
      maxDuration:'12',
      defaulted:true,
      erc20_tokens :  ['ERC20 TOKENS','BNB', 'GTO', 'QKC', 'NEXO',
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
      collateral_tokens: ['BNB', 'GTO', 'QKC'],
      collateralCurrencyToken:'',
      collateralAddress:"0xfCB0229a26C0087aFA7643D2Fb3Af94FC1885815",
      loanAddress:'',
      activeLoanOffer:[],
      activeCollateralValue:0,
    };
  }

  //Get All Loans
  viewAllOffers = async () => {
    try {
      const loans = await GetLoans();

      const loanOffers = [...this.state.loanOffers];

      for (const loanAddress of loans) {
        const loan = await GetLoanDetails(loanAddress);

        if (loan[5].toNumber() === 1) {
          let collaterals = [];
          for (var i in loan[13]) {
            collaterals.push({
              address: loan[13][i][0].split('000000000000000000000000')[0],
              ltv: window.web3.toBigNumber(loan[13][i][1]).toNumber(),
              mpr: window.web3.toBigNumber(loan[13][i][2]).toNumber()/100,
              collateralCurrency: loan[13][i][3],
            });
          }
          console.log('loan', loan);

          loanOffers.push({
            loanAddress: loanAddress,
            loanAmount: window.web3.fromWei(loan[0].toNumber()),
            duration: loan[1].toNumber(),
            interest: loan[2].toNumber() / 100,
            collaterals: collaterals,
            status: loan[5].toNumber()
          });
        }
      }

      this.setState({ loanOffers });
    } catch (e) {
      console.error(e);
    }
  };

  handleAcceptLoanOffer = async loanContractAddress => {
    try {
      await AcceptLoanOffer(loanContractAddress);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    } finally {
    }
  };

  handleCollateralTransfer = async (loanContractAddress, collateralAddress) => {
    try {
      await FinalizeCollateralTransfer(loanContractAddress, collateralAddress);
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

 handleCollateralConversion = async (collateralAddress, activeLoanOffer, collateralCurrencyToken) => {
   // add LTV ratio of collateral as third argument to this function.

    let {activeCollateralValue} = this.state;

    let ltv = 200;
    activeLoanOffer.collaterals.map((item,i) => {
      if(getTokenByAddress[item.address] && getTokenByAddress[item.address].symbol===collateralCurrencyToken){
        ltv = item.ltv;
      }
    })
    try {
      const collateralPrice = await FetchCollateralPrice({
        collateralAddress: collateralAddress
      });

      console.log("collateralPrice",collateralPrice);
      // when calculating collateralValue, use this formula
      //((window.web3.toWei(loanAmount) / window.web3.toWei(collateralPrice))* (ltv/100))
      this.setState({
        activeCollateralValue: ((window.web3.toWei(activeLoanOffer.loanAmount) / window.web3.toWei(collateralPrice))* ltv/100)
      })

    } catch (error) {

    }
}
  hideAlertCancel = () => {
    this.setState({ collateralMetadataAlert: false });
  };

  hideAlertConfirm = () => {
    this.setState({
      collateralMetadataAlert: false,
      acceptCollateralAlert: true
    });
  };

  hideAlertAcceptCollateralCancel = () => {
    this.setState({ acceptCollateralAlert: false });
  };

  hideAlertTransferCollateralCancel = () => {
    this.setState({ transferCollateralAlert: false });
  };

  hideAlertAcceptCollateralConfirm = async () => {
    const { loanAddress } = this.state;
    const transferCollateralAlert = await this.handleAcceptLoanOffer(loanAddress);
    this.setState({acceptCollateralAlert:false, approveCollateralAlert:true});
  }

  hideAlertTransferCollateralConfirm = async () => {
    let { loanAddress, collateralAddress } = this.state;
    this.setState({transferCollateralAlert:false});
    console.log("collateralAddress : ", collateralAddress);
    this.handleCollateralTransfer(loanAddress, collateralAddress);
  }

  hideAlertAppproveCollateralConfirm = async(collateralAddress, loanContractAddress, collateralValue) => {
    try {
      await ExecuteTokenApproval({
        ERC20Token: collateralAddress,
        loanContractAddress: loanContractAddress,
        tokenAmount: collateralValue
      });

      this.setState({
        approveCollateralAlert:false,
        transferCollateralAlert:true
      });
    } catch (error) {
      console.log(error);
    }
  }

  hideAlertApproveCollateralCancel = async (collateralAddress, loanContractAddress, collateralValue) => {
      this.setState({approveRequestAlert:true, acceptCollateralAlert:false});
      console.log("collateralAddress : ", collateralAddress);
  }






  render() {
    const {
      erc20_tokens,
      duration,
      minDuration,
      maxDuration,
      collateralMetadataAlert,
      collateral_tokens,
      transferCollateralAlert,
      acceptCollateralAlert,
      collateralCurrencyToken,
      activeLoanOffer,
      activeCollateralValue,
      collateralAddress,
      loanAddress,
      approveCollateralAlert
    } = this.state;
    return (
      <div className="ViewAllOffers text-center">
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

            <div
              className="container d-flex align-items-left"
              style={{ marginLeft: "-15px" }}
            >
              <div className="card card-pricing border-0 col-md-4">
                <div className="card-header bg-transparent">
                  <i className="fa fa-filter" aria-hidden="true"></i>
                  <a className="ls-1 text-primary py-3 mb-0 ml-2">
                    View All Requests
                  </a>
                </div>
                <div className="card-body">
                  <ul className="list-unstyled my-4">
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
                              collateralCurrency: e.target.value
                            });
                          }}
                        >
                          <option>ETH</option>;
                        </select>
                      </div>
                    </li>
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
                            return <option>{item}</option>;
                          })}
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
                                  <label
                                    className="custom-control-label"
                                    for="customCheck1"
                                  >
                                    Waiting for Borrowers
                                  </label>
                                </div>
                                <div className="custom-control custom-checkbox mb-3 ">
                                  <input
                                    className="custom-control-input"
                                    id="customCheck2"
                                    type="checkbox"
                                    checked={this.state.waitingForCollateral}
                                    onClick={() => {
                                      this.setState({
                                        waitingForCollateral: !this.state
                                          .waitingForCollateral
                                      });
                                    }}
                                  />
                                  <label
                                    className="custom-control-label"
                                    for="customCheck2"
                                  >
                                    Waiting for collateral
                                  </label>
                                </div>
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
                    <li>
                      <div className="mt-3">
                        <label for="">Monthly Interest</label>
                        <div className="">
                          <label style={{ marginLeft: "-180px" }}>
                            {" "}
                            ({this.state.minMonthlyInt} %){" "}
                          </label>
                        </div>
                        <div
                          className=""
                          style={{ marginRight: "-180px", marginTop: "-30px" }}
                        >
                          <label> ({this.state.maxMonthlyInt} %)</label>
                        </div>
                        <Nouislider
                          range={{ min: 0, max: 5 }}
                          start={[0, 5]}
                          connect
                          onChange={e => {
                            this.setState({
                              minMonthlyInt: e[0],
                              maxMonthlyInt: e[1]
                            });
                            console.log(this.state.maxMonthlyInt);
                          }}
                        />
                      </div>
                    </li>
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
                <div className="card-footer">
                  <a href="#!" className=" text-muted">
                    Reset Filters
                  </a>
                </div>
              </div>
              <div className="ml-4 row">
                {this.state.loanOffers.map((loanOffer, index) => (
                  <div key={index} className={this.state.loanOffers.length<3?"col":"col-md-4"}>
                    <div className="card">
                      <div className="card-header">
                        <div className="row row-example">
                          <div className="mx-auto mb-2">
                          {loanOffer.collaterals.map((collateral)=>{
                            return getTokenByAddress[collateral.address] && <img src={`/assets/img/32/color/` + ( getTokenByAddress[collateral.address] && getTokenByAddress[collateral.address].symbol )  +`.png`} style={{width:'30px'}}/>;
                          })
                            }
                          </div>
                        </div>
                        <div
                          className="text-left ml-3"
                          style={{ fontSize: "x-small" }}
                        >
                          LTV {loanOffer.collaterals.map((item) =>{
                              return item.ltv +"% ";
                          })}

                        </div>
                        <div
                          className="text-left ml-3"
                          style={{ fontSize: "x-small" }}
                        >
                          MPR {loanOffer.collaterals.map((item) =>{
                              return item.mpr +"% ";
                          })}

                        </div>
                      </div>
                      <div className="card-body text-left">
                        <p>Duration  : { loanOffer.duration } days</p>
                        <p>Amount  : { loanOffer.loanAmount } ETH</p>

                        <div className="btn-wrapper text-center" onClick={()=>{
                          this.setState({collateralMetadataAlert:true, loanAddress:loanOffer.loanAddress, collateralAddress:loanOffer.collaterals[0].address, activeLoanOffer:loanOffer});
                        }}>
                          <a href="#" className="btn btn-primary btn-icon mt-2">
                            <span className="btn-inner--text">
                              Take this loan
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div
                      className="alert alert-primary alert-dismissible fade show text-center"
                      role="alert"
                    >
                      <span className="alert-text">Waiting for borrower</span>
                    </div>
                  </div>
                ))}
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
                      <select
                        className="form-control"
                        style={{ width: "80px", display: "inline" }}
                        onChange={e => {
                          this.setState({
                            collateralCurrencyToken: e.target.value
                          });
                          this.handleCollateralConversion(getTokenBySymbol[collateralCurrencyToken] && getTokenBySymbol[collateralCurrencyToken].address, activeLoanOffer, collateralCurrencyToken);
                        }}
                      >
                        {activeLoanOffer.collaterals.map((item, i) => {
                          return <option id={i} value={getTokenByAddress[item.address] && getTokenByAddress[item.address].symbol}>{getTokenByAddress[item.address] && getTokenByAddress[item.address].symbol}</option>;
                        })}
                      </select>
                      {activeLoanOffer.collaterals.map((item,i) => {
                        return (getTokenByAddress[item.address] && getTokenByAddress[item.address].symbol===collateralCurrencyToken) && <label for="exampleFormControlSelect1" key={i}>
                          MPR : {item.mpr} &nbsp; LTV : {item.ltv}%
                        </label>;
                      })}
                    </div>
                  </SweetAlert>
                )}

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
                {approveCollateralAlert && (
                  <SweetAlert
                    warning
                    showCancel
                    confirmBtnText="Approve"
                    confirmBtnBsStyle="info"
                    cancelBtnBsStyle="default"
                    title="Approve Loan Offer"
                    onConfirm={() => {this.hideAlertAppproveCollateralConfirm(collateralAddress, loanAddress, activeCollateralValue)}}
                    onCancel={this.hideAlertApproveCollateralCancel}
                  >
                    Approve Transfer collateral of {activeCollateralValue}{" "}
                    {collateralCurrencyToken} tokens
                  </SweetAlert>
                )}
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

export default ViewAllOffers;

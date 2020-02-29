import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/vendor/font-awesome/css/font-awesome.css';
import '../../assets/vendor/nucleo/css/nucleo.css';
import './LoanOffer.css';
import Header from './Header';
import { CreateNewLoanOffer, FetchCollateralPrice } from '../../services/loanbook';
import { TransferFundsToLoanContract } from '../../services/loanContract';
import { supported_erc20_token, getTokenBySymbol, getTokenByAddress } from '../Web3/erc20';

class LoanOffer extends Component {
  constructor() {
    super();
    this.state = {
      loanCurrency: true,
      collateral: false,
      loan: false,
      currency: false,
      borrow: false,
      durationView: false,
      mprView: false,
      collateralValue: '(not set)',
      loanAmount: '(not set)',
      duration: null,
      monthlyInt: '(not set)',
      collateralSafe: '(not set)',
      ltv: 50,
      mpr: 1,
      collateralCurrency: null,
      createOfferAlert: true,
      approveOfferAlert: false,
      acceptLoanAlert: false,
      loanContractAddress: '',
      ropstenTransactionhash: '',
      durationArr: [30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360],
      durationStart: 1,
      durationEnd: 360,
      stableCoins: ['STABLE COINS', 'DAI', 'PAX', 'TUSD'],
      erc20_tokens: supported_erc20_token,
      collateralMetadata: [],
    };
  }

  arrayRemove = (arr, value) => {

    return arr.filter(function (ele) {
      return ele != value;
    });

  }


  createLoanOffer = async (principal, duration, collateralMetadata) => {
    try {
      console.log("collateralMetadata", collateralMetadata);
      let collaterals = [];
      let collateralAddress = [];
      collateralMetadata.map((collateral) => {
        collateralAddress = getTokenBySymbol[collateral.collateral] && getTokenBySymbol[collateral.collateral].address;
        collaterals.push({
          collateral: collateralAddress,
          ltv: collateral.ltv,
          mpr: collateral.mpr
        });
      })

      const loanContractAddress = await CreateNewLoanOffer({
        principal: principal,
        duration: duration,
        collaterals: collaterals
      });

      this.setState({
        createOfferAlert: false,
        approveOfferAlert: true,
        loanContractAddress: loanContractAddress
      });

    } catch (error) {

    }
  }



  fundLoanOffer = async (loanAmount, loanContractAddress) => {

    try {
      await TransferFundsToLoanContract(loanContractAddress, loanAmount);

      //window.location="/myloans";
      console.log("fundLoanOffer => loanContractAddress line 87", loanContractAddress);

      this.setState({
        approveOfferAlert: false,
        acceptLoanAlert: true
      });

    } catch (error) {
      console.log(error);
    }
  }

  acceptLoanOffer = async (interest, collateralAddress, loanContractAddress, collateralAmount, collateralPrice, ltv) => {
    console.log("acceptLoanOffer => loanContractAddress line 102", loanContractAddress);
    // var self = this;
    // const LoanContract = window.web3.eth.contract(LoanContractABI).at(loanContractAddress);
    // const acceptLoan = await LoanContract.acceptLoanOffer(interest, collateralAddress, collateralAmount, collateralPrice, ltv,{
    //   from: window.web3.eth.accounts[0],
    //   gas: 300000
    // }, (err, transactionHash) => {
    //   if (!err)
    //     console.log(transactionHash);
    // })
    // console.log("ACCEPT LOAN :", acceptLoan);

  }

  handleAddCollateral = (collateralCurrency, ltv, mpr) => {
    let { collateralMetadata, erc20_tokens } = this.state;
    collateralMetadata.push({
      collateral: collateralCurrency,
      ltv: ltv,
      mpr: mpr * 100
    });
    let array = [...erc20_tokens]; // make a separate copy of the array
    this.setState({
      erc20_tokens: array.filter((item) => {
        console.log(item.symbol, collateralCurrency);
        return item.symbol !== collateralCurrency
      })
    });
    this.setState({ collateralMetadata: collateralMetadata })
  }

  handleCollateralNext = () => {
    this.setState({ durationView: true, collateral: false });
  }

  render() {
    const { loanAmount, duration, monthlyInt, loan, currency, borrow, durationView, durationArr, monthlyInterest, borrowLess, erc20_tokens, collateralMetadata, collateralValue,
      collateralCurrency, ltv, mpr, createOfferAlert, approveOfferAlert, acceptLoanAlert, loanContractAddress, ropstenTransactionhash } = this.state;

    return (
      <div className="LoanOffer text-center">
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
            <div className="container d-flex">
              <div className="col-lg-7">
                <div className="card">
                  <div className="card-header text-center">
                    <h5> New Loan Offer</h5>
                  </div>
                  <div className="card-body" style={{ display: this.state.loanCurrency ? 'block' : 'none' }}>
                    <div className="alert alert-primary alert-dismissible fade show" role="alert">
                      <span className="alert-text"><strong>Choose your loan offer currency.</strong></span>
                    </div>
                    <div className="row mt-5">
                      <div className="col-md-6" style={{ marginTop: '25px', marginBottom: '230px', cursor: 'pointer' }} onClick={() => { this.setState({ loanCurrency: false, loan: true }); }}>
                        <span className="btn-inner--text"><img style={{ width: '25px' }} src="/assets/img/eth.png" /></span>
                        <br />
                        <p>Ethereum</p>
                      </div>
                      <div className="col-md-4 form-group mt-3">
                        <select className="form-control" id="exampleFormControlSelect1">
                          {
                            this.state.stableCoins.map((item, i) => {
                              return <option>{item}</option>;
                            })
                          }
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="card-body" style={{ display: this.state.loan ? 'block' : 'none' }}>
                    <div className="alert alert-primary alert-dismissible fade show" role="alert">
                      <span className="alert-text"><strong>Insert the loan offer amount.</strong></span>
                    </div>
                    <input className="form-control form-control-lg" type="text" placeholder="ETH" onChange={(e) => { this.setState({ loanAmount: e.target.value }); }} />
                    <div className="btn-wrapper" style={{ marginTop: '200px', cursor: 'pointer' }} onClick={() => { this.setState({ loanCurrency: false, loan: false, borrow: true }); }}>
                      <a href="#" className="btn btn-primary btn-icon mb-3 mb-sm-0 m-5">
                        <span className="btn-inner--text">Next</span>
                      </a>
                    </div>
                  </div>

                  <div className="card-body" style={{ display: this.state.currency ? 'block' : 'none' }}>
                    <div className="alert alert-primary alert-dismissible fade show" role="alert">
                      <span className="alert-text"><strong>Choose your loan currency.</strong></span>
                    </div>
                    <div className="btn-wrapper" style={{ marginTop: '200px', cursor: 'pointer' }} onClick={() => { this.setState({ currency: false }); }}>
                      <span className="btn-inner--text"><img src="/assets/img/eth.png" /></span>
                      <br />
                      <p>Ethereum</p>
                    </div>
                  </div>

                  <div className="card-body" style={{ display: this.state.borrow ? 'block' : 'none' }}>
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                      <span className="alert-text"><strong>Are you willing to lend less?</strong></span>
                    </div>
                    <input className="form-control form-control-lg" type="text" value={loanAmount} placeholder={loanAmount} onChange={(e) => { this.setState({ loanAmount: e.target.value }); }} />
                    <div className="btn-wrapper" style={{ marginTop: '200px', cursor: 'pointer' }} onClick={() => { this.setState({ collateral: true, borrow: false }); }}>
                      <a href="#" className="btn btn-primary btn-icon mb-3 mb-sm-0 m-5">
                        <span className="btn-inner--text">Next</span>
                      </a>
                    </div>
                  </div>
                  <div className="card-body" style={{ display: this.state.collateral ? 'block' : 'none' }}>
                    <div className="alert alert-primary alert-dismissible fade show" role="alert">
                      <span className="alert-text">Add your collateral.</span>
                    </div>

                    {<div className="row ml-2">

                      {<div className="card bg-gradient-success col-md-5" style={{ height: '300px', marginLeft: '30%' }}>
                        <div className="col-md-12 form-group mt-5">
                          <select className="form-control" id="exampleFormControlSelect1" style={{ width: '80px', display: 'inline' }} onClick={(e) => {
                            this.setState({ collateralCurrency: e.target.value });
                          }}>
                            {
                              erc20_tokens.map((item) => {
                                return <option>{item.symbol}</option>;
                              })
                            }
                          </select>
                          <h6 className="mt-4">LTV</h6>
                          <input className="font-weight-bold mb-0" type="number" value={ltv} style={{ width: 'inherit', textAlign: 'center' }} onChange={(e) => this.setState({ ltv: (e.target.value > 0 && e.target.value <= 50) ? e.target.value : 1 })} />
                          <h6 className="mt-4">Interest</h6>
                          <input className="font-weight-bold mb-0" type="number" value={mpr} style={{ width: 'inherit', textAlign: 'center' }} onChange={(e) => this.setState({ mpr: (e.target.value > 0 && e.target.value <= 5) ? e.target.value : 1 })} />
                        </div>
                      </div>
                      }
                    </div>

                    }

                    <div className="text-center mt-3">
                      <button className="btn btn-icon btn-primary" type="button" value="plus" onClick={() => this.handleAddCollateral(collateralCurrency, ltv, mpr)}>
                        <span><i className="fa fa-plus"></i></span>
                      </button>
                    </div>

                    <div className="btn-wrapper" style={{ marginTop: '-30px', cursor: 'pointer' }} onClick={this.handleCollateralNext}>
                      <a href="#" className="btn btn-primary btn-icon mb-3 mb-sm-0 m-5">
                        <span className="btn-inner--text">Next</span>
                      </a>
                    </div>
                  </div>


                  <div className="card-body" style={{ display: this.state.durationView ? 'block' : 'none' }}>
                    <div className="alert alert-primary alert-dismissible fade show" role="alert">
                      <span className="alert-text">Define loan duration.</span>

                    </div>
                    <br />

                    <div className="btn-wrapper" style={{ marginTop: '245px', cursor: 'pointer' }}>
                      {
                        this.state.durationArr.map((item, i) => {
                          return <button id={i} type="button" className="btn btn-outline-primary" onClick={() => { this.setState({ duration: item }) }}>{item}</button>;
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

                  <div className="card-body text-left" style={{ marginBottom: !duration ? '45%' : '21%' }}>
                    <p>Collateral</p>
                    {collateralMetadata.map((collateral, i) => {
                      console.log('collateralMetadata', collateral);
                      return <div className="col" key={i}>
                        <img id="img1 " alt="img1" src={`/assets/img/32/color/${collateral.collateral}.png`} alt={collateral.collateral} />
                        <p className="small">{collateral.collateral}</p>
                        <p className="small">LTV : {collateral.ltv}</p>
                        <p className="small">MPR: {collateral.mpr / 100}</p>
                      </div>;
                    })

                    }

                    {duration ? <div className="mt-4"><p>Duration {duration} days</p></div>
                      : <div className="mt-4"><p>Duration  (not set) </p></div>}

                    {!!duration &&
                      createOfferAlert &&
                      <div className="btn-wrapper text-center" onClick={() => {
                        this.createLoanOffer(loanAmount, duration, collateralMetadata);
                      }}>
                        <br />
                        <a className="btn btn-primary btn-icon mb-3 mb-sm-0 m-5" style={{ color: 'white' }}>
                          <span className="btn-inner--text">Create</span>
                        </a>
                      </div>}
                    {approveOfferAlert &&
                      <div className="btn-wrapper text-center mt-3">
                        <button className="btn btn-primary" type="button" onClick={() => {
                          this.fundLoanOffer(loanAmount, loanContractAddress);
                        }}>
                          Fund Loan
                      </button>
                      </div>}
                    {/*acceptLoanAlert &&
                  <div className="btn-wrapper text-center mt-3">
                    <button className="btn btn-primary" type="button" onClick={()=>{
                      this.acceptLoanOffer(mpr1, CollateralAddress.toString(), loanContractAddress, window.web3.toWei(loanAmount), window.web3.toWei(0.1), ltv1);
                      }}>
                      Accept Loan
                    </button>
                  </div>*/}

                    {acceptLoanAlert && <div className="alert alert-success mt-2" style={{ marginLeft: '-1.5%', width: '104.5%', marginTop: '-7%' }} role="alert">
                      Your loan is funded successfully!
                  </div>}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        {!createOfferAlert && <div className="alert alert-success" style={{ marginLeft: '9.5%', width: '46.5%', marginTop: '-7%' }} role="alert">
          <strong>Congratulations! Loan Offer is Created successfully!</strong>
        </div>}
        {createOfferAlert && <Link to={"https://ropsten.etherscan.io/tx/" + ropstenTransactionhash} style={{ color: '#fff' }} target='_blank'> Check transation on Ropsten </Link>}
      </div>
    );
  }
}

export default LoanOffer;

import React, { Component } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { Link } from 'react-router-dom';
import axios from 'axios';

class LoanRequest extends Component {
  constructor(){
    super();
    this.state = {
      collateral:true,
      loan:false,
      currency:false,
      borrow:false,
      durationView:false,
      mprView:false,
      monthlyInterest:false,
      collateralValue: null,
      loanAmount: null,
      duration: null,
      monthlyInt: 0,
      durationArr:[30,60,90,120,150,180,210,240,270,300,330,360],
      durationStart:0,
      durationEnd:360,
      collateralCurrency:'ETH',
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
          'FET','PPT','MCO']
    };
    axios.get('https://min-api.cryptocompare.com/data/price?fsym=BNB&tsyms=');
  }

  handleMonthlyInterest = () => {
    this.setState({monthlyInt: this.state.monthlyInt + 0.25});
  }
  render() {

    const { duration, monthlyInt } = this.state;
    return (
      <div className="LoanRequest text-center">
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
                    <a href="#" className="nav-link" data-toggle="dropdown" href="#" role="button">
                      <i className="ni ni-collection d-lg-none"></i>
                      <span className="nav-link-inner--text">View All Request</span>
                    </a>
                  </li>
                  <li className="nav-item dropdown">
                    <a href="#" className="nav-link" data-toggle="dropdown" href="#" role="button">
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
                      <span className="nav-link-inner--text" style={{color:'white'}}> <i className="fa fa-question-circle" aria-hidden="true"></i></span>
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
                    <h5> New Loan Request</h5>
                  </div>
                  <div className="card-body"  style={{display:this.state.collateral?'block':'none'}}>
                    <div className="alert alert-primary alert-dismissible fade show" role="alert">
                      <span className="alert-text">Choose your collateral currency.</span>
                    </div>
                    <div className="row mt-5">
                    <div className="col-md-6" style={{marginTop:'25px', marginBottom:'125px', cursor:'pointer'}} onClick={()=>{this.setState({collateral:false, loan:true});}}>
                      <span className="btn-inner--text"><img style={{width:'25px'}} src="/assets/img/eth.png"/></span>
                      <br/>
                      <p>Ethereum</p>
                    </div>
                  <div className="col-md-4 form-group mt-3">
                      <select className="form-control" id="exampleFormControlSelect1" onClick={ (e)=>{
                        this.setState({collateralCurrency:e.target.value});
                      }}>
                      {
                        this.state.erc20_tokens.map((item,i) => {
                          return <option>{item}</option>;
                      })
                      }
                      </select>
                    </div>

                    </div>
                    <div className="btn-wrapper" style={{marginTop:'20px', cursor:'pointer'}} onClick={()=>{this.setState({collateral:false,loan:true})}}>
                      <a href="#" className="btn btn-primary btn-icon mb-3 mb-sm-0 m-5">
                        <span className="btn-inner--text">Next</span>
                      </a>
                    </div>
                    </div>
                  <div className="card-body" style={{display:this.state.loan?'block':'none'}}>
                    <div className="alert alert-primary alert-dismissible fade show" role="alert">
                      <span className="alert-text">Insert the collateral amount.</span>
                    </div>
                    <input className="form-control form-control-lg" type="text" placeholder={this.state.collateralCurrency} onChange={(e)=>{this.setState({collateralValue:e.target.value});}}/>
                    <div className="btn-wrapper" style={{marginTop:'200px', cursor:'pointer'}} onClick={()=>{this.setState({collateral:false,loan:false, currency:true});}}>
                      <a href="#" className="btn btn-primary btn-icon mb-3 mb-sm-0 m-5">
                        <span className="btn-inner--text">Next</span>
                      </a>
                    </div>
                  </div>

                  <div className="card-body"  style={{display:this.state.currency?'block':'none'}}>
                    <div className="alert alert-primary alert-dismissible fade show" role="alert">
                      <span className="alert-text">Choose your loan currency.</span>
                    </div>
                    <div className="btn-wrapper" style={{marginTop:'25px', marginBottom:'230px', cursor:'pointer'}}  onClick={()=>{this.setState({currency:false, borrow:true});}}>
                      <span className="btn-inner--text"><img style={{width:'25px'}} src="/assets/img/eth.png"/></span>
                      <br/>
                      <p>Ethereum</p>
                    </div>
                  </div>

                  <div className="card-body"style={{display:this.state.borrow?'block':'none'}}>
                    <div className="alert alert-primary alert-dismissible fade show" role="alert">
                      <span className="alert-text">Great! you can borrow now.</span>
                    </div>
                    <input className="form-control form-control-lg" type="text" placeholder="ETH" onChange={(e)=>{this.setState({loanAmount:e.target.value});}}/>
                    <div className="btn-wrapper" style={{marginTop:'200px', cursor:'pointer'}} onClick={()=>{this.setState({durationView:true, borrow:false});}}>
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

                    <div className="btn-wrapper" style={{marginTop:'140px', cursor:'pointer'}}>
                      {
                        this.state.durationArr.map((item,i)=>{
                          return <button id={i} type="button" className="btn btn-outline-primary" onClick={()=>{this.setState({duration:item})}}>{item}</button>;
                        })
                      }
                    </div>
                    <div className="btn-wrapper" style={{marginTop:'20px', cursor:'pointer'}} onClick={()=>{this.setState({durationView:false,monthlyInterest:true})}}>
                      <a href="#" className="btn btn-primary btn-icon mb-3 mb-sm-0 m-5">
                        <span className="btn-inner--text">Next</span>
                      </a>
                    </div>
                  </div>

                  <div className="card-body"style={{display:this.state.monthlyInterest?'block':'none', marginBottom:'310px'}}>
                    <div className="alert alert-primary alert-dismissible fade show" role="alert">
                      <span className="alert-text">Choose the monthly interest percentage for this loan.</span>
                    </div>


                    <div className="text-left">
                    <button className="btn btn-icon btn-primary" type="button" onClick={()=>{this.setState({monthlyInt: monthlyInt - 0.25})}}>
                      <i className="fa fa-minus"></i>
                    </button>
                    </div>
                    <div className="text-right">
                      <input className="form-control" type="number" value={monthlyInt} style={{width:'68px', marginTop: '-43px',  marginLeft: '215px'}} id="example-time-input"/>
                    </div>
                    <div className="text-right" style={{marginTop: '-44px'}}>
                    <button className="btn btn-icon btn-primary" type="button" onClick={this.handleMonthlyInterest}>
                      <i className="fa fa-plus"></i>
                    </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <div className="card">
                  <div className="card-header text-center">
                    Overview
                  </div>
                  <div className="card-body text-left mt-5">
                  {this.state.collateralValue ?
                    <div><p>Collateral __________________________{this.state.collateralValue} {this.state.collateralCurrency}</p></div>
                    :<div><p>Collateral __________________________(not set)</p></div>
                  }
                  {
                    this.state.loanAmount ? <div><p>Loan amount _______________________{this.state.loanAmount} ETH </p></div>
                    :
                     <div><p>Loan amount _______________________(not set)</p></div>
                  }
                  {
                    duration?<p>Duration ___________________________{this.state.duration} days</p>
                    :
                    <p>Duration ___________________________(not set)</p>
                  }
                  {
                    monthlyInt ?
                    <p>Monthly interest (MPR) ______________{this.state.monthlyInt} %</p>
                    :
                    <p>Monthly interest (MPR) ______________(not set)</p>
                  }
                    <div className="btn-wrapper text-center" style={{marginTop:'120px'}} onClick={()=>{}}>
                      <br/>
                      <a href="#" className="btn btn-primary btn-icon mb-3 mb-sm-0 m-5">
                        <span className="btn-inner--text">Create</span>
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

export default LoanRequest;

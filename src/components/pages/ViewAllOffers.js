import React, { Component } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { Link } from 'react-router-dom';
import '../../assets/vendor/font-awesome/css/font-awesome.css';
import '../../assets/vendor/nucleo/css/nucleo.css';

class ViewAllOffers extends Component {
  constructor(){
    super();
    this.state={
      loanAmount:'1.5 ETH',
      collateralValue: '3 ETH',
      earnings:'3.4% (20% APR)',
      duration: '90 days',
      safeness: 'SAFE',
      expireIn: '5D 15H 30M',
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
    };
  }
  render() {
    const {erc20_tokens} = this.state;
    return (
      <div className="ViewAllOffers text-center">
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

            <div className="container d-flex align-items-left" style={{marginLeft:'-15px'}}>



            <div className="card card-pricing border-0 col-md-4">
            <div className="card-header bg-transparent">
              <i className="fa fa-filter" aria-hidden="true"></i>
              <a className="ls-1 text-primary py-3 mb-0 ml-2">View All Requests</a>
            </div>
            <div className="card-body px-lg-7">

              <ul className="list-unstyled my-4">
                <li>
                  <div className="form-group">
                      <label for="exampleFormControlSelect1">Loan Currency</label>
                      <select className="form-control" id="exampleFormControlSelect1" onClick={ (e)=>{
                        this.setState({collateralCurrency:e.target.value});
                      }}>
                      <option>ETH</option>;
                      </select>
                  </div>
                </li>
                <li>
                <div className="form-group">
                    <label for="exampleFormControlSelect1">Collateral Currency</label>
                    <select className="form-control" id="exampleFormControlSelect1" onClick={ (e)=>{
                      this.setState({collateralCurrency:e.target.value});
                    }}>
                    {
                      erc20_tokens.map((item,i) => {
                        return <option>{item}</option>;
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
                              <input className="custom-control-input" id="customCheck1" type="checkbox"/>
                              <label className="custom-control-label" for="customCheck1">Waiting for Lenders</label>
                            </div>
                            <div className="custom-control custom-checkbox mb-3">
                              <input className="custom-control-input" id="customCheck1" type="checkbox"/>
                              <label className="custom-control-label" for="customCheck1">Waiting for collateral</label>
                            </div>
                            <div className="custom-control custom-checkbox mb-3">
                              <input className="custom-control-input" id="customCheck1" type="checkbox"/>
                              <label className="custom-control-label" for="customCheck1">Waiting for Payback</label>
                            </div>
                            <div className="custom-control custom-checkbox mb-3">
                              <input className="custom-control-input" id="customCheck1" type="checkbox"/>
                              <label className="custom-control-label" for="customCheck1">Finished</label>
                            </div>  <div className="custom-control custom-checkbox mb-3">
                                <input className="custom-control-input" id="customCheck1" type="checkbox"/>
                                <label className="custom-control-label" for="customCheck1">Defaulted</label>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </li>
                <li>
                <div>
                  <div id="input-slider-range" data-range-value-min="100" data-range-value-max="500"></div>
                    <div className="row d-none">
                        <div className="col-6">
                            <span className="range-slider-value value-low" data-range-value-low="200" id="input-slider-range-value-low"></span>
                        </div>
                        <div className="col-6 text-right">
                            <span className="range-slider-value value-high" data-range-value-high="400" id="input-slider-range-value-high"></span>
                        </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="card-footer">
              <a href="#!" className=" text-muted">Reset Filters</a>
            </div>
          </div>

              <div className="col-md-5">
                <div className="card">
                  <div className="card-header">

                  <div className="row row-example">
                <div className="col-sm">
                  <span><p>Loan amount  </p></span>
                  <span className="btn-inner--text"><img style={{width:'25px'}} src="/assets/img/eth.png"/> {this.state.loanAmount}</span>

                </div>
                <div className="col-sm">
                  <span><p>Collateral </p></span>
                  <span className="btn-inner--text"><img style={{width:'25px'}} src="/assets/img/eth.png"/> {this.state.collateralValue}</span>
                </div>
              </div>
                  </div>
                  <div className="card-body text-left">
                  <p>Earnings : {this.state.earnings}</p>
                  <p>Duration  : {this.state.duration}</p>
                  <p>Safeness : {this.state.safeness}</p>
                  <p>Expires in : {this.state.expireIn}</p>
                    <div className="btn-wrapper text-center" onClick={()=>{}}>
                      <a href="#" className="btn btn-primary btn-icon mb-sm-0 m-5">
                        <span className="btn-inner--text">Fund Now</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="alert alert-primary alert-dismissible fade show text-center" role="alert">
                  <span className="alert-text">Waiting for lender(s)</span>
                </div>
              </div>
              <div className="col-md-5">
                <div className="card">
                  <div className="card-header">

                  <div className="row row-example">
                <div className="col-sm">
                  <span><p>Loan amount  </p></span>
                  <span className="btn-inner--text"><img style={{width:'25px'}} src="/assets/img/eth.png"/> {this.state.loanAmount}</span>

                </div>
                <div className="col-sm">
                  <span><p>Collateral </p></span>
                  <span className="btn-inner--text"><img style={{width:'25px'}} src="/assets/img/eth.png"/> {this.state.collateralValue}</span>
                </div>
              </div>
                  </div>
                  <div className="card-body text-left">
                  <p>Earnings : {this.state.earnings}</p>
                  <p>Duration  : {this.state.duration}</p>
                  <p>Safeness : {this.state.safeness}</p>
                  <p>Expires in : {this.state.expireIn}</p>
                    <div className="btn-wrapper text-center" onClick={()=>{}}>
                      <a href="#" className="btn btn-primary btn-icon mb-sm-0 m-5">
                        <span className="btn-inner--text">Fund Now</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="alert alert-primary alert-dismissible fade show text-center" role="alert">
                  <span className="alert-text">Waiting for lender(s)</span>
                </div>
              </div>
              <div className="col-md-5">
                <div className="card">
                  <div className="card-header">

                  <div className="row row-example">
                <div className="col-sm">
                  <span><p>Loan amount  </p></span>
                  <span className="btn-inner--text"><img style={{width:'25px'}} src="/assets/img/eth.png"/> {this.state.loanAmount}</span>

                </div>
                <div className="col-sm">
                  <span><p>Collateral </p></span>
                  <span className="btn-inner--text"><img style={{width:'25px'}} src="/assets/img/eth.png"/> {this.state.collateralValue}</span>
                </div>
              </div>
                  </div>
                  <div className="card-body text-left">
                  <p>Earnings : {this.state.earnings}</p>
                  <p>Duration  : {this.state.duration}</p>
                  <p>Safeness : {this.state.safeness}</p>
                  <p>Expires in : {this.state.expireIn}</p>
                    <div className="btn-wrapper text-center" onClick={()=>{}}>
                      <a href="#" className="btn btn-primary btn-icon mb-sm-0 m-5">
                        <span className="btn-inner--text">Fund Now</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="alert alert-primary alert-dismissible fade show text-center" role="alert">
                  <span className="alert-text">Waiting for lender(s)</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default ViewAllOffers;

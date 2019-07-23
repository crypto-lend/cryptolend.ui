import React, { Component } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { Link } from 'react-router-dom';
import Nouislider from "nouislider-react";
import './ViewAllOffers.css';

class ViewAllOffers extends Component {
  constructor(){
    super();
    this.state = {
      loanAmount:'1.5 ETH',
      collateralValue: '3 ETH',
      earnings:[3.5,1.25,5],
      duration: [90, 30, 120],
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
    };
  }
  render() {
    const {erc20_tokens,duration,minDuration,maxDuration} = this.state;
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
                          <div className="custom-control custom-checkbox mb-3 ">
                            <input className="custom-control-input" id="customCheck1" type="checkbox" checked={this.state.waitingForBorrower} onClick={()=>{this.setState({waitingForBorrower:!this.state.waitingForBorrower})}}/>
                            <label className="custom-control-label" for="customCheck1">Waiting for Borrowers</label>
                          </div>
                          <div className="custom-control custom-checkbox mb-3 ">
                            <input className="custom-control-input" id="customCheck2" type="checkbox" checked={this.state.waitingForCollateral} onClick={()=>{this.setState({waitingForCollateral:!this.state.waitingForCollateral})}}/>
                            <label className="custom-control-label" for="customCheck2">Waiting for collateral</label>
                          </div>
                          <div className="custom-control custom-checkbox mb-3 ">
                            <input className="custom-control-input" id="customCheck3" type="checkbox" checked={this.state.waitingForPayback} onClick={()=>{this.setState({waitingForPayback:!this.state.waitingForPayback})}}/>
                            <label className="custom-control-label" for="customCheck3">Waiting for Payback</label>
                          </div>
                          <div className="custom-control custom-checkbox mb-3 ">
                            <input className="custom-control-input" id="customCheck4" type="checkbox" checked={this.state.finished} onClick={()=>{this.setState({finished:!this.state.finished})}}/>
                            <label className="custom-control-label" for="customCheck4">Finished</label>
                          </div>  <div className="custom-control custom-checkbox mb-3 ">
                              <input className="custom-control-input" id="customCheck5" type="checkbox" checked={this.state.defaulted} onClick={()=>{this.setState({defaulted:!this.state.defaulted})}}/>
                              <label className="custom-control-label" for="customCheck5">Defaulted</label>
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
                  <label style={{marginLeft:'-180px'}}> ({this.state.minMonthlyInt} %) </label>
                  </div>
                  <div className="" style={{marginRight:'-180px',marginTop:'-30px'}}>
                  <label> ({this.state.maxMonthlyInt} %)</label>
                  </div>
                  <Nouislider range={{ min: 0, max: 5 }} start={[0, 5]} connect onChange={(e)=>{this.setState({minMonthlyInt:e[0],maxMonthlyInt:e[1]}); console.log(this.state.maxMonthlyInt);}} />
                </div>
                </li>
                <li>
                <div className="mt-3">
                  <label for="">Duration</label>
                  <div className="">
                  <label style={{marginLeft:'-180px'}}> ({this.state.minDuration} Month) </label>
                  </div>
                  <div className="" style={{marginRight:'-180px',marginTop:'-30px'}}>
                  <label> ({this.state.maxDuration} Month)</label>
                  </div>
                  <Nouislider range={{ min: 0, max: 12 }} start={[0, 12]} connect onChange={(e)=>{this.setState({minDuration:e[0],maxDuration:e[1]}); console.log(this.state.maxDuration);}} />
                  </div>
                </li>
              </ul>
            </div>
            <div className="card-footer">
              <a href="#!" className=" text-muted">Reset Filters</a>
            </div>
          </div>

              {
                this.state.waitingForBorrower && duration[0]/30>minDuration && duration[0]/30<maxDuration && 
                <div className="col-md-4">
                    <div className="card">
                      <div className="card-header">
                      <div className="row row-example">

                        <div className="ml-5">
                          <img src='/assets/img/32/color/btc.png'/>
                          <img src='/assets/img/32/color/bnb.png'/>
                          <img src='/assets/img/32/color/mana.png'/>
                          <img src='/assets/img/32/color/gto.png'/>
                          <img src='/assets/img/32/color/powr.png'/>
                       </div>
                    </div>
                    <div className="text-left ml-3" style={{fontSize:'.875rem'}}>MPR 0.4% 0.25% 0.25% 0.8% 0.4%</div>
                    <div className="text-left ml-3" style={{fontSize:'.875rem'}}>LTV 50% 50% 50% 50% 50% 50%</div>
                  </div>
                  <div className="card-body text-left">
                  <p>Duration  : {this.state.duration[0]} days</p>
                  <p>Amount  : 1 ETH</p>

                    <div className="btn-wrapper text-center" onClick={()=>{}}>
                      <a href="#" className="btn btn-primary btn-icon mt-2">
                        <span className="btn-inner--text">Take this loan</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="alert alert-primary alert-dismissible fade show text-center" role="alert">
                  <span className="alert-text">Waiting for borrower</span>
                </div>
              </div>
          }
          {
            this.state.waitingForBorrower  && duration[1]/30>minDuration && duration[1]/30<maxDuration &&
              <div className="col-md-4">
                    <div className="card">
                      <div className="card-header">
                      <div className="row row-example">

                        <div className="ml-5">
                          <img src='/assets/img/32/color/btc.png'/>
                          <img src='/assets/img/32/color/bnb.png'/>
                          <img src='/assets/img/32/color/mana.png'/>
                          <img src='/assets/img/32/color/gto.png'/>
                          <img src='/assets/img/32/color/powr.png'/>
                       </div>
                    </div>
                    <div className="text-left ml-3" style={{fontSize:'.875rem'}}>MPR 0.4% 0.25% 0.25% 0.8% 0.4%</div>
                    <div className="text-left ml-3" style={{fontSize:'.875rem'}}>LTV 50% 50% 50% 50% 50% 50%</div>
                  </div>
                  <div className="card-body text-left">
                  <p>Duration  : {this.state.duration[1]} days</p>
                  <p>Amount  : 1.5 ETH</p>


                    <div className="btn-wrapper text-center" onClick={()=>{}}>
                      <a href="#" className="btn btn-primary btn-icon mt-2">
                        <span className="btn-inner--text">Take this loan</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="alert alert-primary alert-dismissible fade show text-center" role="alert">
                  <span className="alert-text">Waiting for borrower</span>
                </div>
              </div>
          }
              {
                this.state.waitingForBorrower && duration[2]/30>minDuration && duration[2]/30<maxDuration &&
              <div className="col-md-4">
                    <div className="card">
                      <div className="card-header">
                      <div className="row row-example">

                        <div className="ml-5">
                          <img src='/assets/img/32/color/btc.png'/>
                          <img src='/assets/img/32/color/bnb.png'/>
                          <img src='/assets/img/32/color/mana.png'/>
                          <img src='/assets/img/32/color/gto.png'/>
                          <img src='/assets/img/32/color/powr.png'/>
                       </div>
                    </div>
                    <div className="text-left ml-3" style={{fontSize:'.875rem'}}>MPR 0.4% 0.25% 0.25% 0.8% 0.4%</div>
                    <div className="text-left ml-3" style={{fontSize:'.875rem'}}>LTV 50% 50% 50% 50% 50% 50%</div>
                  </div>
                  <div className="card-body text-left">
                  <p>Duration  : {this.state.duration[2]} days</p>
                  <p>Amount  : 2 ETH</p>

                    <div className="btn-wrapper text-center" onClick={()=>{}}>
                      <a href="#" className="btn btn-primary btn-icon mt-2">
                        <span className="btn-inner--text">Take this loan</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="alert alert-primary alert-dismissible fade show text-center" role="alert">
                  <span className="alert-text">Waiting for borrower</span>
                </div>
              </div>
            }
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default ViewAllOffers;

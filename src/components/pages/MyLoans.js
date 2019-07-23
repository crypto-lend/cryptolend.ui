import React, { Component } from 'react';
import ReactCountryFlag from 'react-country-flag';
import '../../assets/vendor/font-awesome/css/font-awesome.css';
import '../../assets/vendor/nucleo/css/nucleo.css';

class MyLoans extends Component {
  constructor(){
    super();

    this.state = {
      borrowedLoans:true,
      fundedLoans:false,
      display1:'none',
      display2:'none',
      display3:'none',
      display4:'none'
    };
  }
  render() {
    return (
      <div className="MyLoans text-center">
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
                  <div className="container shape-container d-flex align-items-center">
                      <div className="col px-0">
                        <div className="card">
                    <div className="card-header text-left">
                      <a href="#" className={this.state.borrowedLoans? " btn btn-primary" : " btn btn-secondary"} onClick={()=>{this.setState({borrowedLoans:true, fundedLoans:false})}}>My loan Requests</a>
                      <a href="#" className={this.state.fundedLoans? "btn btn-primary" : "btn btn-secondary"} onClick={()=>{this.setState({borrowedLoans:false, fundedLoans:true})}}>My loan offers</a>
                    </div>
                    <div className="card-body">
                    <div>
                    {
                      this.state.borrowedLoans?    <div className="table-responsive" style={{marginTop:"50px"}}>
              <table className="table align-items-center table-flush">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Link</th>
                    <th scope="col">Status</th>
                    <th scope="col">Completion</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr onClick={()=>{this.state.display1=='none'?this.setState({display1:'block'}):this.setState({display1:'none'})}}>
                    <th scope="row">
                      <div className="media align-items-center">
                        <a href="#" className="avatar rounded-circle mr-3">
                          <img alt="Image placeholder" src="insta.jpeg"/>
                        </a>
                        <div className="media-body">
                          <span className="mb-0 text-sm">Instagram</span>
                        </div>
                      </div>
                    </th>
                    <td>
                      <span className="badge badge-dot mr-4">
                        <i className="bg-warning"></i> pending
                      </span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">60%</span>
                        <div>
                          <div className="progress">
                            <div className="progress-bar bg-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: '60%'}}></div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <button className="btn btn-primary" type="button" >Edit</button>
                      <div className="dropdown">
                        <a className="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i className="fa fa-trash"></i>
                        </a>
                      </div>
                    </td>
                  </tr>
                  <div style={{height:'200px', display:this.state.display1}}>
                    <div className="link-item__body"><div className="link-body-info">
                      <div className="hidden-wrap">
                        <div className="link-info-url small line-clamp">
                        <a target="_blank"></a>
                        </div>
                        <div className="link-info-date small">created on January 10, 2019</div>
                        </div>
                        <div className="link-pixel-sets mt1"><span className="small">Tracking Pixels:</span>&nbsp;
                        </div>
                      </div>
                    </div>
                  </div>
                  <tr onClick={()=>{this.state.display2=='none'?this.setState({display2:'block'}):this.setState({display2:'none'})}}>
                    <th scope="row">
                      <div className="media align-items-center">
                        <a href="#" className="avatar rounded-circle mr-3">
                          <img alt="Image placeholder" src="fb.png"/>
                        </a>
                        <div className="media-body">
                          <span className="mb-0 text-sm">Facebook</span>
                        </div>
                      </div>
                    </th>
                    <td>
                      <span className="badge badge-dot">
                        <i className="bg-success"></i> completed
                      </span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">100%</span>
                        <div>
                          <div className="progress">
                            <div className="progress-bar bg-success" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: '100%'}}></div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <button className="btn btn-primary" type="button">Edit</button>
                      <div className="dropdown">
                        <a className="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i className="fa fa-trash"></i>
                        </a>
                      </div>
                    </td>
                  </tr>
                  <div style={{height:'200px', display:this.state.display2}}>
                  <div className="link-item__body"><div className="link-body-info">
                    <div className="hidden-wrap">
                      <div className="link-info-url small line-clamp">
                      <a target="_blank"></a>
                      </div>
                      <div className="link-info-date small">created on January 10, 2019</div>
                      </div>
                      <div className="link-pixel-sets mt1"><span className="small">Tracking Pixels:</span>&nbsp;
                      </div>
                    </div>
                  </div>
                  </div>
                  <tr onClick={()=>{this.state.display3=='none'?this.setState({display3:'block'}):this.setState({display3:'none'})}}>
                    <th scope="row">
                      <div className="media align-items-center">
                        <a href="#" className="avatar rounded-circle mr-3">
                          <img alt="Image placeholder" src="whatsapp.jpeg"/>
                        </a>
                        <div className="media-body">
                          <span className="mb-0 text-sm">Whatsapp</span>
                        </div>
                      </div>
                    </th>
                    <td>
                      <span className="badge badge-dot mr-4">
                        <i className="bg-danger"></i> delayed
                      </span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">72%</span>
                        <div>
                          <div className="progress">
                            <div className="progress-bar bg-danger" role="progressbar" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100" style={{width: '72%'}}></div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                    <button className="btn btn-primary" type="button">Edit</button>
                      <div className="dropdown">
                        <a className="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i className="fa fa-trash"></i>
                        </a>
                      </div>
                    </td>
                  </tr>
                  <div style={{height:'200px', display:this.state.display3}}>
                  <div className="link-item__body"><div className="link-body-info">
                    <div className="hidden-wrap">
                      <div className="link-info-url small line-clamp">
                      <a target="_blank"></a>
                      </div>
                      <div className="link-info-date small">created on January 10, 2019</div>
                      </div>
                      <div className="link-pixel-sets mt1"><span className="small">Tracking Pixels:</span>&nbsp;
                      </div>
                    </div>
                  </div>
                  </div>
                  <tr onClick={()=>{this.state.display4=='none'?this.setState({display4:'block'}):this.setState({display4:'none'})}}>
                    <th scope="row">
                      <div className="media align-items-center">
                        <a href="#" className="avatar rounded-circle mr-3">
                          <img alt="Image placeholder" src="telegram.png"/>
                        </a>
                        <div className="media-body">
                          <span className="mb-0 text-sm">Telegram</span>
                        </div>
                      </div>
                    </th>

                    <td>
                      <span className="badge badge-dot">
                        <i className="bg-info"></i> on schedule
                      </span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">90%</span>
                        <div>
                          <div className="progress">
                            <div className="progress-bar bg-info" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100" style={{width: '90%'}}></div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <button className="btn btn-primary" type="button">Edit</button>
                      <div className="dropdown">
                        <a className="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i className="fa fa-trash"></i>
                        </a>
                      </div>
                    </td>
                  </tr>
                  <div style={{height:'200px', display:this.state.display4}}>
                  <div className="link-item__body"><div className="link-body-info">
                    <div className="hidden-wrap">
                      <div className="link-info-url small line-clamp">
                      <a target="_blank"></a>
                      </div>
                      <div className="link-info-date small">created on January 10, 2019</div>
                      </div>
                      <div className="link-pixel-sets mt1"><span className="small">Tracking Pixels:</span>&nbsp;
                      </div>
                    </div>
                  </div>
                  </div>
                </tbody>
              </table>
            </div>
                      :
                      <span className="alert-text">You haven't lent yet. Check the available loan request below!</span>
                    }
                    </div>
                    <div className="btn-wrapper" style={{marginTop:'200px'}}>
                      <a href="/view-offers" className="btn btn-primary btn-icon mb-3 mb-sm-0" data-toggle="scroll">
                        <span className="btn-inner--text">View All Offers</span>
                      </a>
                      <br/>
                      <a href="/view-requests" className="btn btn-primary btn-icon mb-3 mb-sm-0 m-5">
                        <span className="btn-inner--text">View All Requests</span>
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

export default MyLoans;

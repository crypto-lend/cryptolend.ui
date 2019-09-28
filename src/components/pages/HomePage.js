import React, { Component } from 'react';
import ReactCountryFlag from 'react-country-flag';
import {InstallMetaMask}  from '../Web3/InstallMetaMask';
import { EthereumIcon } from '../Web3/EthereumIcon';
import {fetchNetwork, fetchAccounts, getAccounts} from '../../services/Web3Service';
import blocklendr from '../../assets/img/brand/blocklendrLogo.jpg';

class HomePage extends Component {
  constructor(props){
    super(props);
    this.fetchWeb3();

  }

  componentDidMount() {
    this.fetchWeb3();
  }

  fetchWeb3 = async () => {
    const res = await fetchAccounts();
    console.log('window.web3 : ',window.web3);

    window.addEventListener('load', () => {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    console.log('window.web3 : ',window.web3);

    if (typeof window.web3 !== 'undefined') {
      console.log('Login metamask web3');
      // Use Mist/MetaMask's provider
    } else {
      console.log('No web3? You should consider trying MetaMask!');
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    }
  });
  }



  render() {
    const web3 = window.web3;
    return (
      <div>
        <div className="HomePage text-center" style={{color:'fff'}}>
          <header className="header-global">
            <nav id="navbar-main" className="navbar navbar-main navbar-expand-lg navbar-light">
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
                    <img src={blocklendr} alt="Blocklendr" style={{width: '50%'}} />
                  </li>
                    <li className="nav-item dropdown">
                      <a href="/features" className="nav-link" data-toggle="dropdown" role="button">
                        <i className="ni ni-ui-04 d-lg-none"></i>
                        <span className="nav-link-inner--text">Features</span>
                      </a>
                    </li>
                    <li className="nav-item dropdown">
                      <a href="#" className="nav-link" data-toggle="dropdown" href="/request" role="button">
                        <i className="ni ni-collection d-lg-none"></i>
                        <span className="nav-link-inner--text">Earn Interest</span>
                      </a>
                    </li>
                    <li className="nav-item dropdown">
                      <a href="#" className="nav-link" data-toggle="dropdown" href="/offer" role="button">
                        <i className="ni ni-ui-04 d-lg-none"></i>
                        <span className="nav-link-inner--text">Company</span>
                      </a>
                    </li>
                    <li className="nav-item dropdown">
                      <a href="#" className="nav-link" data-toggle="dropdown" href="/view-requests" role="button">
                        <i className="ni ni-collection d-lg-none"></i>
                        <span className="nav-link-inner--text">Support</span>
                      </a>
                    </li>
                    <li className="nav-item dropdown">
                      <a href="#" className="nav-link" data-toggle="dropdown" href="/view-offers" role="button">
                        <i className="ni ni-ui-04 d-lg-none"></i>
                        <span className="nav-link-inner--text">Enterprise</span>
                      </a>
                    </li>
                    <li className="nav-item dropdown">
                      <a href="#" className="nav-link" data-toggle="dropdown" href="/view-offers" role="button">
                        <i className="ni ni-ui-04 d-lg-none"></i>
                        <span className="nav-link-inner--text">Login</span>
                      </a>
                    </li>
                    <li className="nav-item dropdown">
                      <a href="#" className="nav-link" data-toggle="dropdown" href="/view-offers" role="button">
                        <i className="ni ni-ui-04 d-lg-none"></i>
                        <span className="nav-link-inner--text">Register</span>
                      </a>
                    </li>
                    <li className="nav-item dropdown">
                      <ReactCountryFlag code="UK" svg />
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
                  {
                    !web3 &&
                    <InstallMetaMask/>
                  }
                  <div className="col-lg-7 text-center">
                    <strong style={{marginTop: '15%', fontSize:'50px'}}> THE GLOBAL LENDING MARKETPLACE</strong>
                    <div className="btn-wrapper" style={{marginTop:'80px'}}>
                      <a href="#" className="btn btn-info btn-icon mb-3 mb-sm-0" data-toggle="scroll">
                        <span className="btn-inner--icon"><i className="fa fa-calculator"></i></span>
                        <span className="btn-inner--text">Loan Calculator</span>
                      </a>
                      <a href="/request" className="btn btn-white btn-icon mb-3 mb-sm-0">
                        <span className="btn-inner--icon"><i className="ni ni-money-coins"></i></span>
                        <span className="btn-inner--text">Start Borrowing</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div>

       </div>
      </div>
    );
  }
}

export default HomePage;

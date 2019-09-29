import React, { Component } from "react";
import ReactCountryFlag from "react-country-flag";
import { InstallMetaMask } from "../Web3/InstallMetaMask";
import { EthereumIcon } from "../Web3/EthereumIcon";
import {
  fetchNetwork,
  fetchAccounts,
  getAccounts
} from "../../services/Web3Service";
import blocklendr from "../../assets/img/brand/blocklendrLogo.jpg";
import P2pPoints from "./landingpagecomponents/p2pworks/p2pPoints";
import Blocklendr from "./landingpagecomponents//blockLenderWorks/blockleander";
import Clients from "./landingpagecomponents/ourclients/clients";
import Navbar from "./Navbar";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.fetchWeb3();
  }

  componentDidMount() {
    this.fetchWeb3();
  }

  fetchWeb3 = async () => {
    const res = await fetchAccounts();
    console.log("window.web3 : ", window.web3);

    window.addEventListener("load", () => {
      // Checking if Web3 has been injected by the browser (Mist/MetaMask)
      console.log("window.web3 : ", window.web3);

      if (typeof window.web3 !== "undefined") {
        console.log("Login metamask web3");
        // Use Mist/MetaMask's provider
      } else {
        console.log("No web3? You should consider trying MetaMask!");
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      }
    });
  };

  render() {
    const web3 = window.web3;
    return (
      <div>
        <div className="HomePage text-center" style={{ color: "fff" }}>
          <Navbar />
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
                  <div className="pricing card-group flex-column flex-md-row mb-3">
                    <div className="card card-pricing border-0 text-center mb-4">
                      <div className="card-header bg-transparent">
                        <h4 className="text-uppercase ls-1 text-primary py-3 mb-0">
                          Instant Loans on blockchain{" "}
                        </h4>
                      </div>

                      <div style={{ margin: "60px" }}>
                        <h4>
                          {" "}
                          Access Finance in minutes while retaining 100%
                          ownesrship of your crypto{" "}
                        </h4>
                      </div>

                      <div className="card-body" style={{ margin: "10%" }}>
                        <ul className="list-unstyled my-4">
                          <li>
                            <div className="d-flex align-items-center">
                              <div>
                                <div className="icon icon-xs"></div>
                              </div>
                              <div></div>
                            </div>
                          </li>
                          <li>
                            <div className="d-flex align-items-center">
                              <div>
                                <div className="icon icon-xs "></div>
                              </div>
                              <div></div>
                            </div>
                          </li>
                          <li>
                            <div className="d-flex align-items-center">
                              <div>
                                <div className="icon icon-xs"></div>
                              </div>
                              <div>
                                <span className="pl-2"></span>
                              </div>
                            </div>
                          </li>
                        </ul>
                        <button type="button" className="btn btn-primary mb-3">
                          Start free trial
                        </button>
                      </div>
                    </div>
                    <div className="card card-pricing bg-gradient-success zoom-in shadow-lg rounded border-0 text-center mb-4">
                      <div className="card-header bg-transparent">
                        <h4 className="text-uppercase ls-1 text-white py-3 mb-0"></h4>
                      </div>
                      <div className="card-body px-lg-7">
                        <div className="display-1 text-white"></div>
                        <span className="text-white"></span>
                        <ul className="list-unstyled my-4">
                          <li>
                            <div className="d-flex align-items-center">
                              <div>
                                <span className="pl-2 text-white"></span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="d-flex align-items-center">
                              <div></div>
                              <div>
                                <span className="pl-2 text-white"></span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="d-flex align-items-center">
                              <div>
                                <span className="pl-2 text-white"></span>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="card-footer bg-transparent"></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
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
                  <div className="pricing card-group flex-column flex-md-row mb-3">
                    <div className="card card-pricing bg-gradient-success zoom-in shadow-lg rounded border-0 text-center mb-4">
                      <div className="card-header bg-transparent">
                        <h4 className="text-uppercase ls-1 text-white py-3 mb-0"></h4>
                      </div>
                      <div className="card-body px-lg-7">
                        <div className="display-1 text-white"></div>
                        <span className="text-white"></span>
                        <ul className="list-unstyled my-4">
                          <li>
                            <div className="d-flex align-items-center">
                              <div>
                                <span className="pl-2 text-white"></span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="d-flex align-items-center">
                              <div></div>
                              <div>
                                <span className="pl-2 text-white"></span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="d-flex align-items-center">
                              <div>
                                <span className="pl-2 text-white"></span>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="card-footer bg-transparent"></div>
                    </div>
                    <div className="card card-pricing border-0 text-center mb-4">
                      <div className="card-header bg-transparent">
                        <h4 className="text-uppercase ls-1 text-primary py-3 mb-0">
                          How Blocklendr p2p works{" "}
                        </h4>
                      </div>
                      <div className="card-body" style={{ margin: "10%" }}>
                        <P2pPoints />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div>
          <Blocklendr />
          <Clients />
        </div>
      </div>
    );
  }
}

export default HomePage;

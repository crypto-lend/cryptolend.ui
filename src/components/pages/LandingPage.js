import React, { Component } from "react";

import { fetchAccounts } from "../../services/Web3Service";
import P2pPoints from "./landingpagecomponents/p2pworks/p2pPoints";
import Blocklendr from "./landingpagecomponents//blockLenderWorks/blockleander";
import Clients from "./landingpagecomponents/ourclients/clients";
import Navbar from "./Navbar";
import macbookScreen from "../images/macbook.png";

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
    return (
      <div>
        <div className="HomePage text-center" style={{ color: "fff" }}>
          <Navbar />
          <div className="position-relative pt-5">
            <section className="section-hero section-shaped my-0">
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
                        <button type="button" className="btn btn-primary mb-3">
                          Register Now
                        </button>
                      </div>
                    </div>
                    <div className="card card-pricing  zoom-in rounded border-0 text-center mb-4">
                      <img
                        className="card-img"
                        src={macbookScreen}
                        alt="Show Screen"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="position-relative">
            <section className="section-hero section-shaped my-0">
              <div className="container shape-container d-flex align-items-center">
                <div className="col px-0">
                  <div className="pricing card-group flex-column flex-md-row mb-3">
                    <div className="card card-pricing zoom-in rounded border-0 text-center mb-4 d-flex justify-content-center">
                      <img
                        className="card-img"
                        src={macbookScreen}
                        alt="App screens"
                      />
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

import React, { Component } from "react";

import { fetchAccounts } from "../../services/Web3Service";
import P2P from "./landingpagecomponents/p2p";
import Blocklendr from "./landingpagecomponents//blockLenderWorks/blockleander";
import Clients from "./landingpagecomponents/ourclients/clients";
import BlockLendrCash from "./landingpagecomponents/blockLenderCashWorks";
import macbookScreen from "../images/macbook.png";
import SupportedCrypto from "./landingpagecomponents/SupportedCrypto";
import Vision from "./landingpagecomponents/Vison";
import Events from "./landingpagecomponents/Events";
import NewsLetter from "./landingpagecomponents/NewsLetter";
import Footer from "./Footer";

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
          <div className="position-relative pt-5 mt-5">
            <section className="section-shaped my-0">
              <div className="container shape-container d-flex align-items-center">
                <div className="col px-0">
                  <div className="pricing card-group flex-column flex-md-row mb-3">
                    <div className="card card-pricing border-0 text-center mt-3 justify-content-center">
                      <div className="card-header bg-transparent border-0">
                        <h2 className="text-uppercase ls-1 text-primary pt-1 mb-0">
                          Instant Loans on blockchain{" "}
                        </h2>
                      </div>

                      <div className="card-body">
                        <h4 className="mb-5">
                          Be your own bank and let your crypto work for you, or
                          get cash in minutes with our instant crypto-backed
                          loans, all while retaining 100% ownership of your
                          digital assets
                        </h4>
                        <button type="button" className="btn btn-primary mb-3">
                          Register Now
                        </button>
                      </div>
                    </div>
                    <div className="card card-pricing justify-content-center zoom-in rounded border-0 text-center mb-4">
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
          <P2P />
          <BlockLendrCash />
          <Blocklendr />
          <Clients />
          <SupportedCrypto />
          <Vision />
          <Events background={"bg-secondary"} />
          <NewsLetter />
          <Footer />
        </div>
      </div>
    );
  }
}

export default HomePage;

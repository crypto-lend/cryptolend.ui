import React, { Component } from "react";
import { Link } from "react-router-dom";

import { fetchAccounts } from "../../services/Web3Service";
import P2P from "./landingpagecomponents/p2p";
import Cryptolendr from "./landingpagecomponents/cryptolendr";
import Clients from "./landingpagecomponents/clients";
import CryptolendrCash from "./landingpagecomponents/blockLenderCashWorks";
import macbookScreen from "../images/macbook.png";
import SupportedCrypto from "./landingpagecomponents/SupportedCrypto";
import Vision from "./landingpagecomponents/Vison";
import Events from "./landingpagecomponents/Events";
import NewsLetter from "./landingpagecomponents/NewsLetter";
import Footer from "./Footer";
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
    return (
      <div>
        <Navbar />
        <div className="HomePage text-center">
          <div className="position-relative py-5">
            <section className="section-shaped my-0">
              <div className="container shape-container d-flex align-items-center">
                <div className="col px-0">
                  <div className="pricing card-group flex-column flex-md-row mb-2">
                    <div className="card card-pricing border-0 text-center mt-3 align-items-center justify-content-center">
                      <div className="card-header bg-transparent border-0">
                        <h2 className="text-uppercase ls-1 text-primary pt-1 mb-0">
                          Instant Loans on blockchain{" "}
                        </h2>
                      </div>

                      <div className="card-body">
                        <h4 className="my-4">
                          Be your own bank and let your crypto work for you, or
                          get cash in minutes with our instant crypto-backed
                          loans, all while retaining 100% ownership of your
                          digital assets
                        </h4>
                      </div>
                    </div>
                    <div className="card card-pricing align-items-center justify-content-center zoom-in rounded border-0 text-center">
                      <img
                        className="card-img"
                        src={macbookScreen}
                        alt="Show Screen"
                      />
                    </div>
                  </div>
                  <div className="w-50">
                    <Link
                      to="/register-form"
                      role="button"
                      className="btn btn-primary"
                    >
                      Register Now
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <P2P />
          <CryptolendrCash />
          <Cryptolendr />
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

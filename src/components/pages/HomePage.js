import React, { Component } from "react";
import {
  fetchAccounts,
} from "../../services/Web3Service";
import Header from "./Header";

class LandingPage extends Component {
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
        <Header/>
        <div className="LandingPage text-center">
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
                  <div className="col-lg-7 text-center">
                    <strong style={{ marginTop: "15%", fontSize: "50px", color: "#fff" }}>
                      {" "}
                      THE GLOBAL LENDING MARKETPLACE
                    </strong>
                    <div className="btn-wrapper" style={{ marginTop: "80px" }}>
                      <a
                        href="#"
                        className="btn btn-info btn-icon mb-3 mb-sm-0"
                        data-toggle="scroll"
                      >
                        <span className="btn-inner--icon">
                          <i className="fa fa-calculator"></i>
                        </span>
                        <span className="btn-inner--text">Loan Calculator</span>
                      </a>
                      <a
                        href="/request"
                        className="btn btn-white btn-icon mb-3 mb-sm-0"
                      >
                        <span className="btn-inner--icon">
                          <i className="ni ni-money-coins"></i>
                        </span>
                        <span className="btn-inner--text">Start Borrowing</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div></div>
      </div>
    );
  }
}

export default LandingPage;

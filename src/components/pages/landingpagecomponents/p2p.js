import React from "react";

import iphone from "../../images/iphone.png";
import Point1 from "../../images/bullet-points/1.png";
import Point2 from "../../images/bullet-points/2.png";
import Point3 from "../../images/bullet-points/3.png";
import Point4 from "../../images/bullet-points/4.png";
import Point5 from "../../images/bullet-points/5.png";

const DATA = [
  {
    img: Point1,
    text: "Create Wallet or connect Metamask"
  },

  {
    img: Point2,
    text:
      "Choose your own lending or borrowing terms and rates or choose from existing offers or requests"
  },
  {
    img: Point3,
    text:
      "Send funds to personal smart contract address as lender to activate loan offer or collateral for loan request"
  },

  {
    img: Point4,
    text:
      "Pay back in monthly installments as borrower or get paid as lender secured by crypto collateral"
  },

  {
    img: Point5,
    text:
      "Borrowers can withdraw their crypto-collateral once loan is paid back"
  }
];

export default function p2p() {
  return (
    <div className="position-relative my-5 bg-secondary">
      <section className=" section-shaped my-0">
        <div className="container shape-container d-flex align-items-center">
          <div className="col px-0">
            <div className="pricing card-group flex-column flex-md-row my-5">
              <div className="card bg-secondary card-pricing zoom-in rounded border-0 text-center d-flex justify-content-center align-items-center">
                <img
                  className="card-img px-0 col-12"
                  style={{
                    objectFit: "contain",
                    width: "50%",
                    marginLeft: "-20%"
                  }}
                  src={iphone}
                  alt="App screens"
                />
              </div>
              <div className="card bg-secondary card-pricing border-0 text-center mb-4">
                <div className="card-header bg-secondary">
                  <h2 className="text-uppercase ls-1 text-primary py-3 mb-0">
                    How Cryptolendr p2p works{" "}
                  </h2>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush list my--3">
                    {DATA.map(({ img, text }, index) => (
                      <li
                        key={index}
                        className="list-group-item px-0 bg-secondary"
                      >
                        <div className="row align-items-center">
                          <div className="col-auto">
                            <img
                              className="icon icon-xs icon-shape bg-gradient-primary shadow rounded-circle text-white"
                              src={img}
                              alt="Bullet Point"
                            />
                          </div>
                          <div className="col">
                            <h5>{text}</h5>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

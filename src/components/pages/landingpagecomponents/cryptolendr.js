import React from "react";

import Point1 from "../../images/the-why/1.png";
import Point2 from "../../images/the-why/2.png";
import Point3 from "../../images/the-why/3.png";

const DATA = [
  {
    title: "Decentralised P2P Lending",
    text:
      "Take control of your finance with your own lending & borrowing rates and terms in our global crypto lending marketplace. Accessible to anyone in the world",
    img: Point1
  },
  {
    title: "Instant Cash Loans",
    text:
      "Spend your money straight away with the Cryptolendr card or withdraw to your back account. From 8% APR on what you use. This service is currently available to enterprise-clients only, but we will be removing this restriction in the coming months.",
    img: Point2
  },
  {
    title: "Insured custodial wallets",
    text:
      "Keep your crypto safe with our secure custodial wallets, insured with leading insurer Lloyds of London for up to $100 million USD",
    img: Point3
  }
];
const Cryptolendr = () => {
  return (
    <div className="bg-secondary pb-5">
      <div className="position-relative container ">
        <div className="row">
          <div className="col-sm">
            <div
              style={{ textAlign: "center" }}
              className="card-header bg-transparent"
            >
              <h2 className="text-uppercase ls-1 text-primary py-3 mb-0">
                Why Cryptolendr{" "}
              </h2>
            </div>
          </div>
        </div>

        <div className="card-deck  mt-5">
          {DATA.map(({ title, text, img }, index) => (
            <div className="card bg-secondary" key={index}>
              <img
                className="card-img-top p-0 mt-4 mx-auto "
                src={img}
                alt={title}
                style={{
                  height: "10rem",
                  width: "10rem"
                }}
              />
              <div className="card-body">
                <h5 style={{ textAlign: "center" }} className="card-title">
                  {title}
                </h5>
                <p className="card-text">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cryptolendr;

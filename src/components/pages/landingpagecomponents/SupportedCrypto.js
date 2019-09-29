import React from "react";
import EthIcon from "../../images/eth.png";

const DATA = [
  {
    img: EthIcon,
    name: "Bitcoin"
  },
  {
    img: EthIcon,
    name: "Ethereum"
  },
  {
    img: EthIcon,
    name: "Litecoin"
  },
  {
    img: EthIcon,
    name: "Ripple"
  },
  {
    img: EthIcon,
    name: "Omise GO"
  },
  {
    img: EthIcon,
    name: "Bitcoin Cash"
  },
  {
    img: EthIcon,
    name: "Ox"
  },
  {
    img: EthIcon,
    name: "Bitcoin Gold"
  },
  {
    img: EthIcon,
    name: "Z Cash"
  },
  {
    img: EthIcon,
    name: "Stellar"
  },
  {
    img: EthIcon,
    name: "Dash"
  },
  {
    img: EthIcon,
    name: "True USD"
  },
  {
    img: EthIcon,
    name: "Gemini Dollar"
  },
  {
    img: EthIcon,
    name: "Paxos"
  },
  {
    img: EthIcon,
    name: "USD Coin"
  },
  {
    img: EthIcon,
    name: "DAI"
  },
  {
    img: EthIcon,
    name: "Orbs"
  },
  {
    img: EthIcon,
    name: "Tether"
  }
];
export default function SupportedCrypto() {
  return (
    <div className="position-relative container mt-5">
      <div className="row">
        <div className="col-sm">
          <div
            style={{ textAlign: "center" }}
            className="card-header bg-transparent"
          >
            <h4 className="text-uppercase ls-1 text-primary py-3 mb-0">
              {" "}
              Supported Crypto
            </h4>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        {DATA.map(({ name, img }, index) => (
          <div
            className="col-2 d-flex flex-column align-items-center p-4"
            key={index}
          >
            <img className="avatar rounded-circle" src={img} alt="Coin Logo" />
            <div className="my-3">{name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

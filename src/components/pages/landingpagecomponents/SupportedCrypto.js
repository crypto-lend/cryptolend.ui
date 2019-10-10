import React from "react";
import BTC from "../../images/coins/BTC.png";
import ETH from "../../images/coins/ETH.png";
import LTC from "../../images/coins/LTC.png";
import XRP from "../../images/coins/XRP.png";
import OMG from "../../images/coins/OMG.png";
import BCH from "../../images/coins/BCH.png";
import ZRX from "../../images/coins/ZRX.png";
import BitcoinGold from "../../images/coins/Bitcoin-Gold.png";
import ZEC from "../../images/coins/ZEC.png";
import XLM from "../../images/coins/XLM.png";
import DASH from "../../images/coins/DASH.png";
import trueusd from "../../images/coins/trueusd.png";
import gemini from "../../images/coins/gemini.png";
import Paxos from "../../images/coins/Paxos.png";
import USDT from "../../images/coins/USDT.png";
import dai from "../../images/coins/dai.png";
import orbs from "../../images/coins/orbs.png";
import USDC from "../../images/coins/USDC.png";

const DATA = [
  {
    img: BTC,
    name: "Bitcoin"
  },
  {
    img: ETH,
    name: "Ethereum"
  },
  {
    img: LTC,
    name: "Litecoin"
  },
  {
    img: XRP,
    name: "Ripple"
  },
  {
    img: OMG,
    name: "Omise GO"
  },
  {
    img: BCH,
    name: "Bitcoin Cash"
  },
  {
    img: ZRX,
    name: "Ox"
  },
  {
    img: BitcoinGold,
    name: "Bitcoin Gold"
  },
  {
    img: ZEC,
    name: "Z Cash"
  },
  {
    img: XLM,
    name: "Stellar"
  },
  {
    img: DASH,
    name: "Dash"
  },
  {
    img: trueusd,
    name: "True USD"
  },
  {
    img: gemini,
    name: "Gemini Dollar"
  },
  {
    img: Paxos,
    name: "Paxos"
  },
  {
    img: USDC,
    name: "USD Coin"
  },
  {
    img: dai,
    name: "DAI"
  },
  {
    img: orbs,
    name: "Orbs"
  },
  {
    img: USDT,
    name: "Tether"
  }
];
export default function SupportedCrypto() {
  return (
    <div className="bg-secondary">
      <div className="position-relative container my-5 py-5">
        <div className="row">
          <div className="col-sm">
            <div
              style={{ textAlign: "center" }}
              className="card-header bg-transparent"
            >
              <h2 className="text-uppercase ls-1 text-primary py-3 mb-0">
                {" "}
                Supported Crypto
              </h2>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          {DATA.map(({ name, img }, index) => (
            <div
              className="col-md-2 col-4 d-flex flex-column align-items-center p-4"
              key={index}
            >
              <img
                className="avatar rounded-circle p-0"
                src={img}
                alt="Coin Logo"
              />
              <div className="my-3">{name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Icon1 from "../../images/clients/1.png";
import Icon2 from "../../images/clients/2.png";
import Icon3 from "../../images/clients/3.png";
import Icon4 from "../../images/clients/4.png";
import Icon5 from "../../images/clients/5.png";
import Icon6 from "../../images/clients/6.png";

const DATA = [
  {
    text:
      "No more idle assets. Using Cryptolendr’s instant cash loans they can unlock the value of their crypto in minutes. No hefty exchange fees, bank fees or capital gains tax. All while retaining 100% ownership of their crypto. Or earn guaranteed monthly interest by becoming a lender on our global p2p network.",
    label: "Crypto Investors",
    img: Icon1
  },
  {
    text:
      "Crypto miners are notorious hodlers. Cryptolendr’s instant cash loans allow them to finance their operations and expansion in this competitive space without selling their hard-earned crypto at lower prices, empowering them to stay competitive and profitable. Or use their mined crypto to generate new income streams by lending on our p2p network.",
    label: "Crypto Miners",
    img: Icon2
  },
  {
    text:
      "The ever growing number of crypto investment funds are direct beneficiaries of Cryptolendr’s loans. By holding their assets in Cryptolendr’s insured accounts, they gain leverage that allows them to access additional capital, giving them greater flexibility in structuring their portfolios. They can also earn interest by lending the crypto in their portfolio to other institutions in our network.",
    label: "Hedge Funds",
    img: Icon3
  },
  {
    text:
      "Cryptolendr’s crypto-backed loans give companies the opportunity to liquidate their crypto assets, allowing them to access the cash they need to finance their business, while retaining ownership of their assets and all upside potential. Any increase in the value of their assets while held with Cryptolendr can also give them access to additional capital.",
    label: "Crypto Companies",
    img: Icon4
  },
  {
    text:
      "Cryptolendr’s crypto-backed loans allows exchanges to access the finance they need to stay competitive as well as to support their margin trading operations, allowing them to reach higher capital efficiencies. They are also direct beneficiaries of our White-Label program, using our secure insured wallets to allow their users to earn interest on the crypto they hold, raising their competitive advantage.",
    label: "Crypto Exchanges",
    img: Icon5
  },
  {
    text:
      "From tokenised precious metals to ETN’s and ETF’s, the market of tokenisation is growing rapidly. Our p2p platform allows these assets to be lent to anyone in the world, or used to secure additional capital with Cryptolendr Cash loans. Who ever said that Gold doesn’t pay dividends?",
    label: "Owners of tokenized assets",
    img: Icon6
  }
];
const Clients = () => {
  return (
    <div className="position-relative container mt-5">
      <div className="row">
        <div className="col-sm">
          <div
            style={{ textAlign: "center" }}
            className="card-header bg-transparent"
          >
            <h2 className="text-uppercase ls-1 text-primary py-3 mb-0">
              {" "}
              Our Clients
            </h2>
          </div>
        </div>
      </div>

      <div className="mt-5 row justify-content-around">
        {DATA.map(({ label, img, text }, index) => (
          <div className="col-12 mb-5 col-lg-4 col-sm-6" key={index}>
            <div className="card p-1 m-1 h-100">
              <img
                className="card-img-top p-0 mt-4 mx-auto"
                src={img}
                style={{
                  width: "50%"
                }}
                alt={label + "logo"}
              />
              <div className="card-body">
                <h5 style={{ textAlign: "center" }} className="card-title">
                  {label}
                </h5>
                <p className="card-text">{text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ justifyContent: "center" }} className="row">
        <div className="col-12 col-md-8">
          <h4 style={{ padding: "2em", textAlign: "center" }}>
            Cryptolendr caters to a wide range of clients from institutions to
            individuals with our cash lending service as well as our global
            peer-to-peer marketplace
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Clients;

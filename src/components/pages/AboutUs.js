import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const DATA = [
  {
    title: "Instant Cash Loans",
    text:
      "By depositing crypto to our bank-grade-security, insured custodial accounts (insured up to $100 million with Lloyds of London, provided by our partner, Bitgo) you can enjoy instant cash loans deposited to your bank account. Our interest rates are dependant on the loan value and can be viewed on the ‘my account’ page after registration. Unlike banks and traditional loan providers, Cryptolendr requires no minimum repayments, no maximum loan terms, and as long as your account’s collateral stays within the maximum loan-to-value ratio (also viewable on your ‘my account page’), you can pay back as much or a little as you want, whenever you want. Once the loan is fully repaid, you can withdraw your crypto instantly. This service is currently available to enterprise-clients only, but we will be removing this restriction in the coming months."
  },
  {
    title: "Peer-To-Peer Crypto Lending Marketplace",
    text:
      "Our advanced crypto p2p lending service allows you to lend or borrow crypto with other users around the world. The advantage to this is that we can serve a larger number of clients in a broader geographical range of areas. This service is the most financially inclusive to date, also allowing the interest rates to be determined purely by the market and not by traditional banking institutions. The p2p lending marketplace also includes a slightly broader range of assets, however we only work with the most stable and liquid crypto assets to ensure safety and minimise risk for our users."
  },

  {
    title: "Interest on Fiat and Stable-Coin deposits",
    text:
      "Our newest service allows users to make fiat deposits and earn daily-compounding interest in EUR, GBP, USD, RUB and their stable-coin counterparts. The amount of interest we provide ranges from 2% up to 10% annually, depending on the currency and value of currency that’s deposited. At first we require a minimum lock-up period of 3 months but we will soon be removing the lock-up period and users will be able to withdraw at any time. This service is currently available to enterprise-clients only, but we will be removing this restriction in the coming months."
  }
];
export default function AboutUs() {
  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-5">
        <div className="row  justify-content-center text-center">
          <div className="col-12">
            <h2>About Us</h2>
          </div>
        </div>
        <div className="row mt-5 justify-content-center text-center">
          <div className="col-12">
            Cryptolendr is a blockchain-based financial services provider. We are
            utilising blockchain technology to solve inefficiencies in the
            global lending marketplace, with a strong focus on financial
            inclusion throughout the world. Our relentless research and
            development activities allow us to stay at the cutting edge of
            blockchain-based financial services.
          </div>
        </div>
        <div className="row mt-5 pt-5">
          <div className="col-12">
            <h5>
              We are currently offering {DATA.length} services to our clients
            </h5>
          </div>
        </div>
        <div className="row mt-4">
          {DATA.map(({ title, text }, index) => (
            <div key={index} className="col-12 mb-5">
              <h6>
                {index + 1}. {title}
              </h6>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <div className="row mt-2 mb-5 pb-5">
          <div className="col-12">
            <p>
              The services we offer at this time form the basis of our research
              and development activities in which we aim to offer more
              innovative services to our clients that compliment the ones we are
              currently offering.
              <br />
              We will be issuing regular updates to our members and newsletter
              subscribers on our activities so be sure to sign up and get the
              latest news on what we’re up to!
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

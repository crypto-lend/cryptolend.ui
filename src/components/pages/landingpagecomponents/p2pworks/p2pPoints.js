import React from "react";

import Point1 from "../../../images/bullet-points/1.png";
import Point2 from "../../../images/bullet-points/2.png";
import Point3 from "../../../images/bullet-points/3.png";
import Point4 from "../../../images/bullet-points/4.png";
import Point5 from "../../../images/bullet-points/5.png";

const DATA = [
  {
    img: Point1,
    text: "Create Wallet or connect Metamask"
  },

  {
    img: Point2,
    text:
      "Choose your own lending or borrowing terms and rates or choose from existing offers or request"
  },
  {
    img: Point3,
    text:
      "Send funds to personal smart contract address lender to activate loan offer or collateral for loan request"
  },

  {
    img: Point4,
    text:
      "Pay back in monthly installments as borrower or get paid as leander by crypto-collateral"
  },

  {
    img: Point5,
    text:
      "Borrowers can withdraw their crypto-collateral once loan is paid back"
  }
];

const p2pPoints = () => {
  return (
    <ul className="list-group list-group-flush list my--3">
      {DATA.map(({ img, text }, index) => (
        <li key={index} className="list-group-item px-0">
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
  );
};

export default p2pPoints;

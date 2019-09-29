import React from "react";
import macbookScreen from "../../images/macbook.png";

const DATA = [
  "Register Account",
  "Add funds to secure Blocklendr account",
  "Credit line becomes instantly available",
  "Spend money instantly with Blocklendr card or withdraw to Bank Account",
  "No minimum payments or hidden fee"
];
const Points = ({ points }) => (
  <ul className="list-group list-group-flush list my--3">
    {points.map((point, index) => (
      <li key={index} className="list-group-item px-0">
        <div className="row align-items-center">
          <div className="col-auto">
            <div className="icon icon-xs icon-shape bg-gradient-primary shadow rounded-circle text-white"></div>
          </div>
          <div className="col">
            <h5>{point}</h5>
          </div>
        </div>
      </li>
    ))}
  </ul>
);

export default function() {
  return (
    <div className="position-relative">
      <section className="section-shaped my-0">
        <div className="container shape-container d-flex align-items-center">
          <div className="col px-0">
            <div className="pricing card-group flex-column flex-md-row mb-3">
              <div className="card card-pricing border-0 text-center mb-4">
                <div className="card-header bg-transparent">
                  <h4 className="text-uppercase ls-1 text-primary py-3 mb-0">
                    How Blocklendr Cash Works{" "}
                  </h4>
                </div>
                <div className="card-body" style={{ margin: "10%" }}>
                  <Points points={DATA} />
                </div>
              </div>
              <div className="card card-pricing zoom-in rounded border-0 text-center mb-4 d-flex justify-content-center">
                <img
                  className="card-img"
                  src={macbookScreen}
                  alt="App screens"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

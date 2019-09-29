import React from "react";
import CashFlow from "../../images/blocklendr-cash.png";

export default function() {
  return (
    <div className="position-relative">
      <section className="section-shaped my-0">
        <div className="container shape-container d-flex align-items-center">
          <div className="col px-0">
            <img
              className="image-fluid"
              style={{
                height: "40rem"
              }}
              src={CashFlow}
              alt="Cash Flow"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

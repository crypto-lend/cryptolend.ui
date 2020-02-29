import React from "react";

export default function Vision() {
  return (
    <div className="position-relative container my-5">
      <div className="row">
        <div className="col-sm">
          <div
            style={{ textAlign: "center" }}
            className="card-header bg-transparent"
          >
            <h2 className="text-uppercase ls-1 text-primary py-3 mb-0">
              {" "}
              Our Vision
            </h2>
          </div>
        </div>
      </div>
      <h5
        className="row mx-lg-5 px-lg-4"
        style={{
          marginTop: "2rem",
          lineHeight: "1.75",
          marginBottom: "8rem"
        }}
      >
        At Cryptolendr, we stand for financial equality without boarders or
        prejudice. We believe that everybody around the world should have the
        opportunity to access a fair banking system, credit and financial
        support no matter where they’re from or what their history is. We are
        building the tools that empower people to take control of their money
        and take part in the global revolution of personal finances and the new
        banking sector. We are open to forming strong partnerships to
        relentlessly improve our capacity to do this. We are proud to be a part
        of this change and we have made it our mission to ensure that people are
        respected and treated fairly.
      </h5>
    </div>
  );
}

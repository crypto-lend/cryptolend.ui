import React from "react";

export default function AboutUs() {
  return (
    <div className="container mt-5 pt-5">
      <div className="row  justify-content-center text-center">
        <div className="col-lg-6 col-10">
          <h2>About Us</h2>
        </div>
      </div>
      <div className="row mt-5 justify-content-center text-center">
        <div
          className="col-lg-6 col-12 py-5 px-5 border"
          style={{
            borderRadius: "1rem"
          }}
        >
          At Blocklendr, we stand for financial equality without boarders or
          prejudice. We believe that everybody around the world should have the
          opportunity to access a fair banking system, credit and financial
          support no matter where they’re from or what their history is. We are
          building the tools that empower people to take control of their money
          and take part in the global revolution of personal finances and the
          new banking sector. We are open to forming strong partnerships to
          relentlessly improve our capacity to do this. We are proud to be a
          part of this change and we have made it our mission to ensure that
          people are respected and treated fairly.
        </div>
      </div>
    </div>
  );
}

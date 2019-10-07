import React from "react";
import Icon1 from "../../../images/clients/1.png";
import Icon2 from "../../../images/clients/2.png";
import Icon3 from "../../../images/clients/3.png";
import Icon4 from "../../../images/clients/4.png";
import Icon5 from "../../../images/clients/5.png";
import Icon6 from "../../../images/clients/6.png";

const DATA = [
  { label: "Crypto Investors", img: Icon1 },
  { label: "Crypto Mines", img: Icon2 },
  { label: "Hedge Funds", img: Icon3 },
  { label: "Crypto Companies", img: Icon4 },
  { label: "Crypto Exchanges", img: Icon5 },
  { label: "Owners of tokenized assets", img: Icon6 }
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

      <div className="card-deck mt-5">
        {DATA.map(({ label, img }, index) => (
          <div
            className="card mb-5 mx-5 p-1"
            style={{
              flex: "1 0 22%"
            }}
            key={index}
          >
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
            </div>
          </div>
        ))}
      </div>
      <div style={{ justifyContent: "center" }} className="row">
        <div className="col-12 col-md-8">
          <h4 style={{ padding: "2em", textAlign: "center" }}>
            Blocklender caters to a wide range of clients fro investors to
            individuals cash lending service as well as our global peer-to-peer
            marketplace
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Clients;

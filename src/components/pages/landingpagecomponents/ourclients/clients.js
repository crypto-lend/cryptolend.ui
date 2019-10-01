import React from "react";

const DATA = [
  "Crypto Investors",
  "Crypto Mines",
  "Hedge Funds",
  "Crypto Companies",
  "Crypto Exchanges",
  "Owners of tokenized assets"
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
        {DATA.map((investor, index) => (
          <div
            className="card mb-5 mx-5"
            style={{
              flex: "1 0 22%"
            }}
            key={index}
          >
            <img
              className="card-img-top p-0"
              src="https://demos.creative-tim.com/argon-dashboard-pro/assets/img/theme/img-1-1000x600.jpg"
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 style={{ textAlign: "center" }} className="card-title">
                {investor}
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

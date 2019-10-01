import React from "react";

const MEMBERSHIP = [
  {
    text: "Personal",
    val: ""
  },

  {
    text: "White Label",
    val: ""
  },

  {
    text: "ICO/STO/IEO",
    val: ""
  },
  {
    text: "Investor",
    val: ""
  },
  {
    text: "Hedge Fund",
    val: ""
  },
  {
    text: "Enterprise",
    val: ""
  },
  {
    text: "Tokenized Asset Holder",
    val: ""
  },
  {
    text: "Miner",
    val: ""
  },
  {
    text: "Cryto Exchange",
    val: ""
  }
];

const LOOKING = [
  {
    text: "Borrow",
    val: ""
  },
  {
    text: "Lending",
    val: ""
  },
  {
    text: "Both",
    val: ""
  }
];

const CURRENCIES = [
  {
    text: "Bitcoin",
    val: ""
  },
  {
    text: "Ethereum",
    val: ""
  },

  {
    text: "Litecoin",
    val: ""
  },
  {
    text: "Ripple",
    val: ""
  },
  {
    text: "Omise Go",
    val: ""
  },
  {
    text: "Bitcoin Cash",
    val: ""
  },
  {
    text: "Ox",
    val: ""
  },
  {
    text: "Bitcoin Gold",
    val: ""
  },
  {
    text: "Z Cash",
    val: ""
  },
  {
    text: "Stellar",
    val: ""
  },
  {
    text: "Dash",
    val: ""
  },
  {
    text: "Binaxe Coin",
    val: ""
  },
  {
    text: "Orbs",
    val: ""
  },
  {
    text: "TUSD",
    val: ""
  },
  {
    text: "Gemini Dollar",
    val: ""
  },
  {
    text: "Paxos",
    val: ""
  },
  {
    text: "USD Coin",
    val: ""
  },
  {
    text: "DAI",
    val: ""
  },
  {
    text: "Tether",
    val: ""
  }
];

const SERVICES = [
  {
    text: "Instant cash loan",
    val: ""
  },

  {
    text: "Peer-to-peer lending",
    val: ""
  },

  {
    text: "Earn interest on Fiat",
    val: ""
  },

  {
    text: "Earn interest on Stale coins",
    val: ""
  },
  {
    text: "Earn crypto interest",
    val: ""
  },

  {
    text: "Insured custodial wallet",
    val: ""
  },
  {
    text: "While-label partnership",
    val: ""
  }
];

export default function Register() {
  return (
    <div className="main-content">
      <div className="header bg-gradient-primary py-5">
        <div className="container">
          <div className="header-body text-center">
            <div className="row justify-content-center">
              <div className=" col-lg-6 col-md-8 px-5">
                <h1 className="text-white">Register</h1>
                <p className="text-lead text-white">
                  Register your interest with Blocklendr. Be the first to join
                  our revolutionary platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5 pb-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-10">
            <div className="card bg-secondary border-0">
              <div className="card-body px-lg-5 py-lg-5">
                <form>
                  <div className="form-group d-flex">
                    <div className="input-group input-group-merge input-group-alternative mb-3 mr-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="ni ni-hat-3"></i>
                        </span>
                      </div>
                      <input
                        className="form-control"
                        placeholder="Name"
                        type="text"
                      />
                    </div>
                    <div className="input-group input-group-merge input-group-alternative mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="ni ni-email-83"></i>
                        </span>
                      </div>
                      <input
                        className="form-control"
                        placeholder="Email"
                        type="email"
                      />
                    </div>
                  </div>
                  <div className="form-group"></div>
                  <div className="form-group d-flex align-items-center position-relative">
                    <span
                      className="text-muted position-absolute"
                      style={{
                        left: "-32px"
                      }}
                    >
                      Or
                    </span>
                    <div className="input-group input-group-merge input-group-alternative">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="ni ni-lock-circle-open"></i>
                        </span>
                      </div>
                      <input
                        className="form-control"
                        placeholder="Company Name"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-control-label font-weight-bold">
                      Membership Type:
                    </label>

                    <div className="col row">
                      {MEMBERSHIP.map(({ text }, index) => (
                        <div
                          key={index}
                          className="custom-control custom-radio col-4 mb-3"
                        >
                          <input
                            type="radio"
                            name="customRadioInline1"
                            className="custom-control-input"
                          />
                          <label className="custom-control-label">{text}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-control-label font-weight-bold">
                      Are you looking to borrow or lend:
                    </label>

                    <div className="col row">
                      {LOOKING.map(({ text }, index) => (
                        <div
                          key={index}
                          className="custom-control custom-radio col-4 mb-3"
                        >
                          <input
                            type="radio"
                            name="customRadioInline1"
                            className="custom-control-input"
                          />
                          <label className="custom-control-label">{text}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-control-label font-weight-bold">
                      How much would you like to borrow or lend?
                    </label>
                    <div className="d-flex">
                      <div className="input-group input-group-merge input-group-alternative mb-3 mr-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="ni ni-hat-3"></i>
                          </span>
                        </div>
                        <input
                          className="form-control"
                          placeholder="Currency"
                          type="text"
                        />
                      </div>
                      <div className="input-group input-group-merge input-group-alternative mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="ni ni-email-83"></i>
                          </span>
                        </div>
                        <input
                          className="form-control"
                          placeholder="Amount"
                          type="text"
                        />
                      </div>
                    </div>{" "}
                  </div>

                  <div className="form-group">
                    <label className="form-control-label font-weight-bold">
                      Which other currencies would you like to use?
                      <br />{" "}
                      <span className="text-muted text-light font-weight-light">
                        (You can choose more than 1)
                      </span>
                    </label>
                    <div className="row col">
                      {CURRENCIES.map(({ text }, index) => (
                        <div
                          className="custom-control custom-control-alternative custom-checkbox col-4 mb-3"
                          key={index}
                        >
                          <input
                            type="checkbox"
                            className="custom-control-input"
                          />
                          <label className="custom-control-label">{text}</label>
                        </div>
                      ))}{" "}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-control-label font-weight-bold">
                      Which service interest you the most?
                      <br />{" "}
                      <span className="text-muted text-light font-weight-light">
                        (You can choose more than 1)
                      </span>
                    </label>
                    <div className="row col">
                      {SERVICES.map(({ text }, index) => (
                        <div
                          className="custom-control custom-control-alternative custom-checkbox col-6 mb-3"
                          key={index}
                        >
                          <input
                            type="checkbox"
                            className="custom-control-input"
                          />
                          <label className="custom-control-label">{text}</label>
                        </div>
                      ))}{" "}
                    </div>
                  </div>

                  <div className="text-center">
                    <button type="button" className="btn btn-primary mt-4">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

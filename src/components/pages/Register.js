import React from "react";
import {
  CURRENCIES,
  LOOKING,
  SERVICES,
  MEMBERSHIP
} from "../config/form-options";
import FormChoices from "./forms/FormChoices";

export default function Register() {
  return (
    <div className="main-content">
      <div className="header bg-gradient-primary py-5">
        <div className="container">
          <div className="header-body text-center">
            <div className="row justify-content-center">
              <div className=" col-lg-6 col-md-8 px-5">
                <h2 className="text-white">Register</h2>
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
                          <i className="ni ni-shop"></i>
                        </span>
                      </div>
                      <input
                        className="form-control"
                        placeholder="Company Name"
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="form-group d-flex align-items-center position-relative">
                    <div className="input-group input-group-merge input-group-alternative">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="ni ni-lock-circle-open"></i>
                        </span>
                      </div>
                      <input
                        className="form-control"
                        placeholder="Password"
                        type="password"
                      />
                    </div>
                  </div>

                  <FormChoices
                    options={MEMBERSHIP}
                    type={"radio"}
                    title={"Membership Type:"}
                    classes={"custom-control custom-radio col-4 mb-3"}
                  />
                  <FormChoices
                    options={LOOKING}
                    type={"radio"}
                    title={"Are you looking to borrow or lend:"}
                    classes={"custom-control custom-radio col-4 mb-3"}
                  />
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
                    </div>
                  </div>

                  <FormChoices
                    options={CURRENCIES}
                    type={"checkbox"}
                    title={"Which other currencies would you like to use?"}
                    moreThanOne
                    classes={
                      "custom-control custom-control-alternative custom-checkbox col-4 mb-3"
                    }
                  />

                  <FormChoices
                    options={SERVICES}
                    type={"checkbox"}
                    title={"Which service interests you the most?"}
                    moreThanOne
                    classes={
                      "custom-control custom-control-alternative custom-checkbox col-6 mb-3"
                    }
                  />

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

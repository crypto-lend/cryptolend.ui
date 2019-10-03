import React from "react";
import { FUNDING } from "../config/form-options";

import FormChoices from "./forms/FormChoices";

export default function Register() {
  return (
    <div className="main-content">
      <div className="header bg-gradient-primary py-5">
        <div className="container">
          <div className="header-body text-center">
            <div className="row justify-content-center">
              <div className=" col-lg-6 col-md-8 px-5">
                <h1 className="text-white">ICO/ IEO/ STO Company</h1>
                <p className="text-lead text-white">
                  We provide customized lending opportunities to companies
                  planning to launch or have completed their ICO/IEO/STO
                  funding. Please complete our form to register your interest
                  and we will be in touch with you as soon as possible.
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
                  <div className="form-group d-flex align-items-center position-relative">
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
                  <div className="form-group d-flex">
                    <div className="input-group input-group-merge input-group-alternative mb-3 mr-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="ni ni-mobile-button"></i>
                        </span>
                      </div>
                      <input
                        className="form-control"
                        placeholder="Contact"
                        type="text"
                      />
                    </div>
                    <div className="input-group input-group-merge input-group-alternative mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="ni ni-map-big"></i>
                        </span>
                      </div>
                      <input
                        className="form-control"
                        placeholder="Country of Residence"
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="form-group d-flex align-items-center position-relative">
                    <div className="input-group input-group-merge input-group-alternative">
                      <textarea
                        className="form-control"
                        placeholder="Company Description"
                        rows="3"
                      />
                    </div>
                  </div>

                  <FormChoices
                    options={FUNDING}
                    type={"checkbox"}
                    title={"Are you launching?"}
                    moreThanOne
                    classes={
                      "custom-control custom-control-alternative custom-checkbox col-4 mb-3"
                    }
                  />

                  <div className="form-group align-items-center position-relative">
                    <label className="form-control-label font-weight-bold">
                      ICO/IEO/STO Launch Date
                    </label>
                    <div className="input-group input-group-merge input-group-alternative">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="ni ni-calendar-grid-58"></i>
                        </span>
                      </div>
                      <input className="form-control" type="date" />
                    </div>
                  </div>

                  <div className="form-group align-items-center position-relative">
                    <div className="input-group input-group-merge input-group-alternative">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="ni ni-calendar-grid-58"></i>
                        </span>
                      </div>
                      <input
                        className="form-control"
                        placeholder="Funding Goal"
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="form-group d-flex">
                    <div className="input-group input-group-merge input-group-alternative mb-3 mr-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="ni ni-bullet-list-67"></i>
                        </span>
                      </div>
                      <input
                        className="form-control"
                        placeholder="Number of Funding Rounds"
                        type="text"
                      />
                    </div>
                    <div className="input-group input-group-merge input-group-alternative mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="ni ni-calendar-grid-58"></i>
                        </span>
                      </div>
                      <input
                        className="form-control"
                        placeholder="Total Duration"
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="form-group align-items-center position-relative">
                    <label className="form-control-label font-weight-bold">
                      ICO/IEO/STO End Date
                    </label>
                    <div className="input-group input-group-merge input-group-alternative">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="ni ni-calendar-grid-58"></i>
                        </span>
                      </div>
                      <input className="form-control" type="date" />
                    </div>
                  </div>

                  <div className="form-group align-items-center position-relative">
                    <div className="input-group input-group-merge input-group-alternative">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="ni ni-credit-card"></i>
                        </span>
                      </div>
                      <input
                        className="form-control"
                        placeholder="When do you want to take a loan?"
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="form-group align-items-center position-relative">
                    <div className="input-group input-group-merge input-group-alternative">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="ni ni-single-copy-04"></i>
                        </span>
                      </div>
                      <input
                        className="form-control"
                        placeholder="Loan Duration"
                        type="text"
                      />
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

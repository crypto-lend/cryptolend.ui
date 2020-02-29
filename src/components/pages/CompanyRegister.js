import React, { useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert";

import { FUNDING } from "../config/form-options";
import FormChoices from "./forms/FormChoices";
import Navbar from "./Navbar";

const defaultForm = {
  companyName: "",
  contact: "",
  country: "",
  description: "",
  launching: [],
  launchDate: "",
  goal: "",
  fundingRounds: "",
  fundingDuration: "",
  endDate: "",
  loanDate: "",
  loadDuration: "",
  others: ""
};

export default function CompanyRegister() {
  const [showPopup, setPopup] = useState(false);
  const [form, setForm] = useState(defaultForm);

  const updateForm = (key, value) => {
    if (!key) {
      throw new Error("Invalid form key set");
    }
    setForm({ ...form, [key]: value });
  };

  const formKeys = Object.keys(form)
    .map(key => key)
    .reduce((acc, val) => {
      acc[val] = val;
      return acc;
    }, {});

  const checkValidity = () => {
    for (const key in form) {
      const val = form[key];
      if (typeof val === "string") {
        if (!val || val === "" || val.length === 0) return false;
      }

      if (typeof val === "object") {
        if (Object.keys(val).length < 0) return false;
      }
    }

    return true;
  };

  const updateLaunching = val => {
    const selected = [...form.launching];
    const index = selected.indexOf(val);
    if (index === -1) {
      selected.push(val);
    } else {
      selected.splice(index, 1);
    }

    updateForm(formKeys.launching, selected);
  };

  return (
    <>
    <Navbar/>
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
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    checkValidity() && setPopup(true);
                  }}
                >
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
                        value={form.companyName}
                        onChange={e =>
                          updateForm(formKeys.companyName, e.target.value)
                        }
                        required
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
                        value={form.contact}
                        onChange={e =>
                          updateForm(formKeys.contact, e.target.value)
                        }
                        required
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
                        value={form.country}
                        onChange={e =>
                          updateForm(formKeys.country, e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group d-flex align-items-center position-relative">
                    <div className="input-group input-group-merge input-group-alternative">
                      <textarea
                        className="form-control"
                        placeholder="Company Description"
                        rows="3"
                        value={form.description}
                        onChange={e =>
                          updateForm(formKeys.description, e.target.value)
                        }
                        required
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
                    selected={form.launching}
                    onChange={updateLaunching}
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
                      <input
                        className="form-control"
                        type="date"
                        value={form.launchDate}
                        onChange={e =>
                          updateForm(formKeys.launchDate, e.target.value)
                        }
                        required
                      />
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
                        value={form.goal}
                        onChange={e =>
                          updateForm(formKeys.goal, e.target.value)
                        }
                        required
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
                        value={form.fundingRounds}
                        onChange={e =>
                          updateForm(formKeys.fundingRounds, e.target.value)
                        }
                        required
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
                        value={form.fundingDuration}
                        onChange={e =>
                          updateForm(formKeys.fundingDuration, e.target.value)
                        }
                        required
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
                      <input
                        className="form-control"
                        type="date"
                        value={form.endDate}
                        onChange={e =>
                          updateForm(formKeys.endDate, e.target.value)
                        }
                        required
                      />
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
                        value={form.loanDate}
                        onChange={e =>
                          updateForm(formKeys.loanDate, e.target.value)
                        }
                        required
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
                        value={form.loadDuration}
                        onChange={e =>
                          updateForm(formKeys.loadDuration, e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group align-items-center position-relative">
                    <div className="input-group input-group-merge input-group-alternative">
                      <textarea
                        className="form-control"
                        placeholder="Any other requirements"
                        rows="3"
                        value={form.others}
                        onChange={e =>
                          updateForm(formKeys.others, e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className={`btn btn-primary mt-5 w-50 ${
                        checkValidity() ? "" : "disabled"
                      }`}
                      onClick={() => checkValidity() && setPopup(true)}
                    >
                      Submit
                    </button>
                  </div>
                </form>
                {showPopup && (
                  <SweetAlert
                    success
                    title="Awesome!"
                    onConfirm={() => setPopup(false)}
                    onCancel={() => setPopup(false)}
                  >
                    Thank you for taking the time to register your interest. We
                    want to serve you as best as we can and offer you absolute
                    best rates on the market. A member of our management team
                    will get back to you shortly to discuss your query.
                  </SweetAlert>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

import React, { useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert";

import { INSTITUITIONSERVICES } from "../config/form-options";
import FormComplexOptions from "./forms/FormComplexOptions";
import Navbar from "./Navbar";

const defaultForm = {
  companyName: "",
  name: "",
  position: "",
  contact: "",
  country: "",
  services: {},
  amount: "",
  duration: "",
  startDate: "",
  other: ""
};
export default function Register() {
  const [showPopup, setPopup] = useState(false);
  const [form, setForm] = useState(defaultForm);

  const updateForm = (key, value) => setForm({ ...form, [key]: value });

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

  const updateServices = key => {
    const services = form.services;
    services.hasOwnProperty(key) ? delete services[key] : (services[key] = "");
    updateForm(formKeys.services, services);
  };

  const updateSelectedText = (key, text) => {
    const services = { ...form.services };
    services[key] = text;
    updateForm(formKeys.services, services);
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
                <h1 className="text-white">Institutional Credit</h1>
                <p className="text-lead text-white">
                  We provide customized lending opportunities for institutions
                  looking to leverage their crypto holdings or earn interest on
                  their fiat holdings. Please complete our form to register your
                  interest and we will be in touch with you as soon as possible.
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
                        placeholder="Name"
                        type="text"
                        value={form.name}
                        onChange={e =>
                          updateForm(formKeys.name, e.target.value)
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
                        placeholder="Position in company"
                        type="text"
                        value={form.position}
                        onChange={e =>
                          updateForm(formKeys.position, e.target.value)
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

                  <FormComplexOptions
                    title={"Which services are you interested in?"}
                    options={INSTITUITIONSERVICES}
                    selected={form.services}
                    updateServices={updateServices}
                    updateSelectedText={updateSelectedText}
                  />
                  <div className="form-group">
                    <label className="form-control-label font-weight-bold">
                      What is the estimated amount you want to borrow or lend?
                    </label>

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
                        value={form.amount}
                        onChange={e =>
                          updateForm(formKeys.amount, e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group align-items-center position-relative">
                    <label className="form-control-label font-weight-bold">
                      What is the estimated loan duration?
                    </label>
                    <div className="input-group input-group-merge input-group-alternative">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="ni ni-calendar-grid-58"></i>
                        </span>
                      </div>
                      <input
                        className="form-control"
                        placeholder="Duration"
                        type="text"
                        value={form.duration}
                        onChange={e =>
                          updateForm(formKeys.duration, e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group align-items-center position-relative">
                    <label className="form-control-label font-weight-bold">
                      When are you looking to start?
                    </label>
                    <div className="input-group input-group-merge input-group-alternative">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="ni ni-calendar-grid-58"></i>
                        </span>
                      </div>
                      <input
                        className="form-control"
                        placeholder="Date"
                        type="date"
                        value={form.startDate}
                        onChange={e =>
                          updateForm(formKeys.startDate, e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group align-items-center position-relative">
                    <label className="form-control-label font-weight-bold">
                      Any other details you would like us to consider?
                    </label>
                    <div className="input-group input-group-merge input-group-alternative">
                      <textarea
                        className="form-control"
                        rows="3"
                        value={form.other}
                        onChange={e =>
                          updateForm(formKeys.other, e.target.value)
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

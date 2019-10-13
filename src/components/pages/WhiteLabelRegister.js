import React, { useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { WHITE_LABEL_SERVICES } from "../config/form-options";
import FormComplexOptions from "./forms/FormComplexOptions";
import Navbar from "./Navbar";

const defaultForm = email => ({
  email,
  name: "",
  companyName: "",
  position: "",
  services: {},
  startDate: "",
  other: ""
});

export default function WhiteLabelRegister(props) {
  const {
    history: {
      location: {
        state: { email }
      }
    }
  } = props;

  const [showPopup, setPopup] = useState(false);
  const [form, setForm] = useState(defaultForm(email));

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
      <Navbar />
      <div className="main-content">
        <div className="header bg-gradient-primary py-5">
          <div className="container">
            <div className="header-body text-center">
              <div className="row justify-content-center">
                <div className=" col-lg-6 col-md-8 px-5">
                  <h1 className="text-white">White Label</h1>
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
                          placeholder="Name"
                          type="text"
                          value={form.name}
                          onChange={e =>
                            updateForm(formKeys.name, e.target.value)
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
                          value={form.companyName}
                          onChange={e =>
                            updateForm(formKeys.companyName, e.target.value)
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
                          value={form.position}
                          onChange={e =>
                            updateForm(formKeys.position, e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>
                    <FormComplexOptions
                      title={
                        "Which of our services would you like to white label?"
                      }
                      options={WHITE_LABEL_SERVICES}
                      selected={form.services}
                      updateServices={updateServices}
                      updateSelectedText={updateSelectedText}
                    />

                    <div className="form-group align-items-center position-relative">
                      <label className="form-control-label font-weight-bold">
                        When would you like to start?
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
                          value={form.startDate}
                          onChange={e =>
                            updateForm(formKeys.startDate, e.target.value)
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
                      Thank you for taking the time to register your interest.
                      We want to serve you as best as we can and offer you
                      absolute best rates on the market. A member of our
                      management team will get back to you shortly to discuss
                      your query.
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

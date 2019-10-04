import React, { useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { Redirect } from "react-router-dom";

const SERVICES = [
  {
    text: "Borrowing Fiat",
    placeholder: "Which fiat?"
  },
  {
    text: "Borrowing Crypto",
    placeholder: "Which crypto?"
  },
  {
    text: "Lending Fiat",
    placeholder: "Which fiat?"
  },
  {
    text: "Lending Fiat",
    placeholder: "Which crypto?"
  },
  {
    text: "Other",
    placeholder: "Please State"
  }
];

const FormComplexOptions = ({ title, options }) => {
  return (
    <div className="form-group">
      <label className="form-control-label font-weight-bold">{title}</label>
      <div className="row">
        {options.map(({ text, placeholder }, index) => (
          <div key={index} className="col-6 d-flex flex-column mb-3">
            <div className="custom-control custom-checkbox mb-1">
              <input type="checkbox" className="custom-control-input" />
              <label
                className="custom-control-label"
                style={{ lineHeight: 1.9 }}
              >
                {text}
              </label>
            </div>
            <div>
              <input
                type="text"
                className="form-control w-75 form-control-sm"
                placeholder={placeholder}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RouteConfig = {
  "institutional-credit": {
    title: "Institutional Credit",
    text:
      "We provide customized lending opportunities for institutions looking to leverage their crypto holdings or earn interest on their fiat holdings. Please complete our form to register your interest and we will be in touch with you as soon as possible."
  },
  "ico-ieo-sto-company": {
    title: "ICO/ IEO/ STO Company",
    text:
      "We provide customized lending opportunities to companies planning to launch or have completed their ICO/IEO/STO funding. Please complete our form to register your interest and we will be in touch with you as soon as possible."
  }
};
export default function Register(props) {
  const [showPopup, setPopup] = useState(false);

  const {
    match: {
      params: { industry }
    }
  } = props;
  console.log(industry);

  const { title, text } = RouteConfig[industry];

  if (!title) {
    return <Redirect to="/" />;
  }

  return (
    <div className="main-content">
      <div className="header bg-gradient-primary py-5">
        <div className="container">
          <div className="header-body text-center">
            <div className="row justify-content-center">
              <div className=" col-lg-6 col-md-8 px-5">
                <h1 className="text-white">{title}</h1>
                <p className="text-lead text-white">{text}</p>
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
                        placeholder="Name"
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
                        placeholder="Position in company"
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

                  <FormComplexOptions
                    title={"Which services are you interested in?"}
                    options={SERVICES}
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
                        placeholder=""
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="form-group align-items-center position-relative">
                    <label className="form-control-label font-weight-bold">
                      When is the estimated duration?
                    </label>
                    <div className="input-group input-group-merge input-group-alternative">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="ni ni-calendar-grid-58"></i>
                        </span>
                      </div>
                      <input
                        className="form-control"
                        placeholder=""
                        type="text"
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
                      />
                    </div>
                  </div>

                  <div className="form-group align-items-center position-relative">
                    <label className="form-control-label font-weight-bold">
                      When would you like to start?
                    </label>

                    <div className="custom-control custom-checkbox mb-1">
                      <input type="checkbox" className="custom-control-input" />
                      <label
                        className="custom-control-label"
                        style={{ lineHeight: 1.9 }}
                      >
                        As soon as possible
                      </label>
                    </div>

                    <div>
                      <div className="custom-control custom-checkbox mb-1">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                        />
                        <label
                          className="custom-control-label"
                          style={{ lineHeight: 1.9 }}
                        >
                          Other
                        </label>
                      </div>
                      <div>
                        <input
                          type="text"
                          className="form-control w-50 form-control-sm"
                          placeholder="Please state"
                          disabled
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group align-items-center position-relative">
                    <label className="form-control-label font-weight-bold">
                      Any other details you would like us to consider?
                    </label>
                    <div className="input-group input-group-merge input-group-alternative">
                      <textarea className="form-control" rows="3" />
                    </div>
                  </div>
                  <div className="text-center">
                    <button
                      type="button"
                      className="btn btn-primary mt-4"
                      onClick={() => setPopup(true)}
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
  );
}

import React, { useState } from "react";
import axios from "axios";
import {
  CURRENCIES,
  LOOKING,
  SERVICES,
  MEMBERSHIP
} from "../config/form-options";
import FormChoices from "./forms/FormChoices";
import SweetAlert from "react-bootstrap-sweetalert";
import Navbar from "./Navbar";

const defaultForm = state => ({
  username: "",
  companyName: "",
  password: "",
  memberShip: [],
  lookingFor: [],
  currency: "",
  amount: "",
  currencies: [],
  services: [],
  ...state
});

export default function Register(props) {
  const {
    history: {
      location: { state },
      push
    }
  } = props;

  const [showPopup, setPopup] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState(defaultForm(state));

  const updateForm = (key, value) => {
    if (!key || !formKeys[key]) {
      throw new Error("Invalid form key set");
    }
    // Reset the error
    error && setError(null);
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

  const selectOne = key => val => {
    updateForm(key, [val]);
  };

  const selectMultiple = key => val => {
    const selected = [...form[key]];
    const index = selected.indexOf(val);
    if (index === -1) {
      selected.push(val);
    } else {
      selected.splice(index, 1);
    }
    updateForm(key, selected);
  };

  const onSubmit = async () => {
    // FIXME: Currencies doesn't work. Adding it fails the request
    const { currencies, ...others } = form;

    try {
      const response = await axios.post(
        "https://www.cipherfit.com/auth/local/register",
        others
      );

      console.log("Well done!");
      console.log("User profile", response.data.user);
      console.log("User token", response.data.jwt);
      window.localStorage.setItem("user", response.data.user.username);
      window.localStorage.setItem("user_id", response.data.user.id);

      setPopup(true);
    } catch (error) {
      // Handle error.
      if (typeof error.response.data.message === "string") {
        setError(error.response.data.message);
      } else {
        setError(
          "Sorry we couldn't complete your registration. Please contact us!"
        );
      }
    }
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
                  <h2 className="text-white">Register</h2>
                  <p className="text-lead text-white">
                    Register your interest with Cryptolendr. Be the first to join
                    our revolutionary platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-5 pb-5">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8 col-12">
              <div className="card bg-secondary border-0">
                <div className="card-body px-lg-5 py-lg-5">
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      checkValidity() && onSubmit();
                    }}
                  >
                    <div className="form-group d-flex align-items-center position-relative">
                      <div className="input-group input-group-merge input-group-alternative">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="ni ni-hat-3"></i>
                          </span>
                        </div>
                        <input
                          className="form-control"
                          placeholder="User Name (unique)"
                          type="text"
                          value={form.username}
                          onChange={e =>
                            updateForm(formKeys.username, e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>

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
                          value={form.password}
                          onChange={e =>
                            updateForm(formKeys.password, e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>

                    <FormChoices
                      options={MEMBERSHIP}
                      type={"radio"}
                      title={"Membership Type:"}
                      classes={
                        "custom-control custom-radio col-md-4 col-6 mb-3"
                      }
                      selected={form.memberShip}
                      onChange={selectOne(formKeys.memberShip)}
                    />
                    <FormChoices
                      options={LOOKING}
                      type={"radio"}
                      title={"Are you looking to borrow or lend:"}
                      classes={
                        "custom-control custom-radio col-md-4 col-6 mb-3"
                      }
                      selected={form.lookingFor}
                      onChange={selectOne(formKeys.lookingFor)}
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
                            value={form.currency}
                            onChange={e =>
                              updateForm(formKeys.currency, e.target.value)
                            }
                            required
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
                            value={form.amount}
                            onChange={e =>
                              updateForm(formKeys.amount, e.target.value)
                            }
                            required
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
                        "custom-control custom-control-alternative custom-checkbox col-md-4 col-6 mb-3"
                      }
                      selected={form.currencies}
                      onChange={selectMultiple(formKeys.currencies)}
                    />

                    <FormChoices
                      options={SERVICES}
                      type={"checkbox"}
                      title={"Which service interests you the most?"}
                      moreThanOne
                      classes={
                        "custom-control custom-control-alternative custom-checkbox col-md-6 col-10 mb-3"
                      }
                      selected={form.services}
                      onChange={selectMultiple(formKeys.services)}
                    />
                    {error && (
                      <small className="position-absolute text-danger text-center">
                        {error}
                      </small>
                    )}

                    <div className="text-center">
                      <button
                        type="submit"
                        className={`btn btn-primary mt-5 w-50 ${
                          checkValidity() ? "" : "disabled"
                          }`}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                  {showPopup && (
                    <SweetAlert
                      success
                      title="Awesome!"
                      onConfirm={() =>
                        setPopup(false) ||
                        push("/") ||
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                      onCancel={() =>
                        setPopup(false) ||
                        push("/") ||
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
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

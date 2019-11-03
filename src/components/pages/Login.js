import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const defaultForm = {
  email: "",
  password: ""
};
export default function(props) {
  const {
    history: { push }
  } = props;

  const [error, setError] = useState(null);
  const [form, setForm] = useState(defaultForm);

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

  const handleLogin = async () => {
    // Request API.
    try {
      const response = await axios.post(
        "https://www.cipherfit.com/auth/local",
        {
          identifier: form.email,
          password: form.password
        }
      );

      console.log("Well done!");
      window.localStorage.setItem("user", response.data.user.username);
      window.localStorage.setItem("jwt", response.data.jwt);
      window.localStorage.setItem(
        "companyName",
        response.data.user.companyName
      );
      push("/myloans");
    } catch (err) {
      if (
        err.response &&
        err.response.data &&
        typeof err.response.data.message === "string"
      ) {
        setError(err.response.data.message);
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
      <div
        className="header bg-gradient-primary py-7 py-lg-8 pt-lg-9 "
        style={{
          height: "100vh"
        }}
      >
        <div className="container">
          <div className="header-body text-center mb-7">
            <div className="container mt--8 pb-5">
              <div className="row justify-content-center">
                <div className="col-lg-6 col-md-10" style={{ margin: "10%" }}>
                  <div className="card bg-secondary border-0 mb-0">
                    <div className="card-header bg-transparent">
                      <h4 className="text-muted text-center mt-2 mb-3">
                        Sign In
                      </h4>
                    </div>
                    <div className="card-body px-lg-5 py-lg-5">
                      <div className="text-center text-muted mb-4">
                        Enter your login details.
                      </div>
                      <form
                        onSubmit={e => {
                          e.preventDefault();
                          checkValidity() && handleLogin();
                        }}
                      >
                        <div className="form-group mb-3">
                          <div className="input-group input-group-merge input-group-alternative">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="ni ni-email-83"></i>
                              </span>
                            </div>
                            <input
                              className="form-control"
                              style={{ marginTop: 0 }}
                              placeholder="Email"
                              type="email"
                              value={form.email}
                              onChange={e => {
                                updateForm(formKeys.email, e.target.value);
                              }}
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="input-group input-group-merge input-group-alternative">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="ni ni-lock-circle-open"></i>
                              </span>
                            </div>
                            <input
                              className="form-control"
                              style={{ marginTop: 0 }}
                              placeholder="Password"
                              type="password"
                              value={form.password}
                              onChange={e => {
                                updateForm(formKeys.password, e.target.value);
                              }}
                              required
                            />
                          </div>
                        </div>
                        <div className="custom-control custom-control-alternative custom-checkbox">
                          <input
                            className="custom-control-input"
                            id=" customCheckLogin"
                            type="checkbox"
                          />
                          <label
                            className="custom-control-label"
                            for=" customCheckLogin"
                          >
                            <span className="text-muted">Remember me</span>
                          </label>
                        </div>
                        {error && (
                          <small className="text-danger d-block mt-4 text-center">
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
                            Sign in
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-6 text-left">
                      <a href="!#" className="text-light">
                        <small>Forgot password?</small>
                      </a>
                    </div>
                    <div className="col-6 text-right">
                      <Link to="/register" className="text-light">
                        <small>Create new account</small>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

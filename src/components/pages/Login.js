import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  handleLogin = () => {
    // Request API.
    axios
      .post("http://157.230.189.100:1337/auth/local", {
        identifier: this.state.email,
        password: this.state.password
      })
      .then(response => {
        // Handle success.
        console.log("Well done!");
        window.localStorage.setItem("user", response.data.user.username);
        window.localStorage.setItem("jwt", response.data.jwt);
        window.localStorage.setItem(
          "companyName",
          response.data.user.companyNameI
        );
        window.location = `/dashboard`;
      })
      .catch(error => {
        // Handle error.
        console.log("An error occurred:", error);
      });
  };
  render() {
    return (
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
                      <form>
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
                              value={this.state.email}
                              onChange={e => {
                                this.setState({ email: e.target.value });
                              }}
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
                              value={this.state.password}
                              onChange={e => {
                                this.setState({ password: e.target.value });
                              }}
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
                        <div className="text-center">
                          <button
                            type="button"
                            className="btn btn-success my-4 w-50"
                            onClick={this.handleLogin}
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
    );
  }
}

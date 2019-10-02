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
          response.data.user.companyName
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
      <div className="main-content">
        <div
          className="header bg-gradient-primary py-7 py-lg-8 pt-lg-9"
          style={{ height: "900px" }}
        >
          <nav
            id="navbar-main"
            className="navbar navbar-horizontal navbar-transparent navbar-main navbar-expand-lg navbar-light"
            style={{ marginTop: "-170px" }}
          >
            <div className="container">
              <a className="" href="/home">
                <img src="assets/images/logo_1.png" width="75%" />
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbar-collapse"
                aria-controls="navbar-collapse"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="navbar-collapse navbar-custom-collapse collapse"
                id="navbar-collapse"
              >
                <div className="navbar-collapse-header">
                  <div className="row">
                    <div className="col-6 collapse-brand">
                      <a href="/dashboard"></a>
                    </div>
                    <div className="col-6 collapse-close">
                      <button
                        type="button"
                        className="navbar-toggler"
                        data-toggle="collapse"
                        data-target="#navbar-collapse"
                        aria-controls="navbar-collapse"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                      >
                        <span></span>
                        <span></span>
                      </button>
                    </div>
                  </div>
                </div>
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <a href="/home" className="nav-link">
                      <span className="nav-link-inner--text">Home</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/pricingpage" className="nav-link">
                      <span className="nav-link-inner--text">Pricing</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/login" className="nav-link">
                      <span className="nav-link-inner--text">Login</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/register" className="nav-link">
                      <span className="nav-link-inner--text">Register</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="" className="nav-link">
                      <span className="nav-link-inner--text"></span>
                    </a>
                  </li>
                </ul>
                <hr className="d-lg-none" />
                <ul className="navbar-nav align-items-lg-center ml-lg-auto">
                  <li className="nav-item">
                    <a
                      className="nav-link nav-link-icon"
                      href="https://www.facebook.com/"
                      target="_blank"
                      data-toggle="tooltip"
                      data-original-title="Like us on Facebook"
                    >
                      <i className="fab fa-facebook-square"></i>
                      <span className="nav-link-inner--text d-lg-none">
                        Facebook
                      </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link nav-link-icon"
                      href="https://www.instagram.com/"
                      target="_blank"
                      data-toggle="tooltip"
                      data-original-title="Follow us on Instagram"
                    >
                      <i className="fab fa-instagram"></i>
                      <span className="nav-link-inner--text d-lg-none">
                        Instagram
                      </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link nav-link-icon"
                      href="https://twitter.com/"
                      target="_blank"
                      data-toggle="tooltip"
                      data-original-title="Follow us on Twitter"
                    >
                      <i className="fab fa-twitter-square"></i>
                      <span className="nav-link-inner--text d-lg-none">
                        Twitter
                      </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link nav-link-icon"
                      href="https://github.com/"
                      target="_blank"
                      data-toggle="tooltip"
                      data-original-title="Star us on Github"
                    >
                      <i className="fab fa-github"></i>
                      <span className="nav-link-inner--text d-lg-none">
                        Github
                      </span>
                    </a>
                  </li>
                  <li className="nav-item d-none d-lg-block ml-lg-4">
                    <a href="#" className="btn btn-neutral btn-icon">
                      <span className="btn-inner--icon">
                        <i className="fas fa-shopping-cart mr-2"></i>
                      </span>
                      <span className="nav-link-inner--text">Purchase now</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="container">
            <div className="header-body text-center mb-7">
              <div className="container mt--8 pb-5">
                <div className="row justify-content-center">
                  <div
                    className="col-lg-5 col-md-7"
                    style={{ marginTop: "200px" }}
                  >
                    <div className="card bg-secondary border-0 mb-0">
                      <div className="card-header bg-transparent pb-5">
                        <div className="text-muted text-center mt-2 mb-3">
                          <small>Sign In</small>
                        </div>
                      </div>
                      <div className="card-body px-lg-5 py-lg-5">
                        <div className="text-center text-muted mb-4">
                          <small>Enter your login details.</small>
                        </div>
                        <form role="form">
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
                              className="btn btn-primary my-4"
                              onClick={this.handleLogin}
                            >
                              Sign in
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-6">
                        <a href="#" className="text-light">
                          <small>Forgot password?</small>
                        </a>
                      </div>
                      <div className="col-6 text-right">
                        <a href="/pricingpage" className="text-light">
                          <small>Create new account</small>
                        </a>
                      </div>
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

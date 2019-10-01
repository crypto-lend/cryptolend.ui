import React from "react";

export default function Register() {
  return (
    <div className="main-content">
      <div className="header bg-gradient-primary py-5">
        <div className="container">
          <div className="header-body text-center mb-7">
            <div className="row justify-content-center">
              <div className=" col-lg-6 col-md-8 px-5">
                <h1 className="text-white">Register</h1>
                <p className="text-lead text-white">
                  Register your interest with Blocklendr. Be the first to join
                  our revolutionary platform.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="separator separator-bottom separator-skew zindex-100"></div>
      </div>

      <div className="container mt--8 pb-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="card bg-secondary border-0">
              <div className="card-body px-lg-5 py-lg-5">
                <form role="form">
                  <div className="form-group">
                    <div className="input-group input-group-merge input-group-alternative mb-3">
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
                  </div>
                  <div className="form-group">
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
                  <div className="form-group">
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
                  <div className="text-muted font-italic">
                    <small>
                      password strength:{" "}
                      <span className="text-success font-weight-700">
                        strong
                      </span>
                    </small>
                  </div>
                  <div className="row my-4">
                    <div className="col-12">
                      <div className="custom-control custom-control-alternative custom-checkbox">
                        <input
                          className="custom-control-input"
                          id="customCheckRegister"
                          type="checkbox"
                        />
                        <label
                          className="custom-control-label"
                          for="customCheckRegister"
                        >
                          <span className="text-muted">
                            I agree with the <a href="/">Privacy Policy</a>
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="button" className="btn btn-primary mt-4">
                      Create account
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

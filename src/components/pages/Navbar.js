import React from "react";
import blocklendr from "../../assets/img/brand/blocklendrLogo.png";
import ReactCountryFlag from "react-country-flag";

export default () => (
  <header className="header-global">
    <nav
      id="navbar-main"
      className="navbar navbar-main navbar-expand-lg navbar-light"
    >
      <div className="container" style={{ maxWidth: "1080px" }}>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar_global"
          aria-controls="navbar_global"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse" id="navbar_global">
          <div className="navbar-collapse-header">
            <div className="row">
              <div className="col-6 collapse-close">
                <button
                  type="button"
                  className="navbar-toggler"
                  data-toggle="collapse"
                  data-target="#navbar_global"
                  aria-controls="navbar_global"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
          </div>
          <ul className="navbar-nav navbar-nav-hover align-items-lg-center">
            <li className="nav-item dropdown">
              <a
                href="/home"
                className="nav-link"
                data-toggle="dropdown"
                role="button"
              >
                <img
                  src={blocklendr}
                  alt="Blocklendr"
                  style={{ width: "50%" }}
                />
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                href="/features"
                className="nav-link"
                data-toggle="dropdown"
                role="button"
              >
                <i className="ni ni-ui-04 d-lg-none"></i>
                <span className="nav-link-inner--text">Features</span>
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                href="#"
                className="nav-link"
                data-toggle="dropdown"
                href="/request"
                role="button"
              >
                <i className="ni ni-collection d-lg-none"></i>
                <span className="nav-link-inner--text">Earn Interest</span>
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                href="#"
                className="nav-link"
                data-toggle="dropdown"
                href="/offer"
                role="button"
              >
                <i className="ni ni-ui-04 d-lg-none"></i>
                <span className="nav-link-inner--text">Company</span>
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                href="#"
                className="nav-link"
                data-toggle="dropdown"
                href="/view-requests"
                role="button"
              >
                <i className="ni ni-collection d-lg-none"></i>
                <span className="nav-link-inner--text">Support</span>
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                href="#"
                className="nav-link"
                data-toggle="dropdown"
                href="/view-offers"
                role="button"
              >
                <i className="ni ni-ui-04 d-lg-none"></i>
                <span className="nav-link-inner--text">Enterprise</span>
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                href="#"
                className="nav-link"
                data-toggle="dropdown"
                href="/view-offers"
                role="button"
              >
                <i className="ni ni-ui-04 d-lg-none"></i>
                <span className="nav-link-inner--text">Login</span>
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                href="#"
                className="nav-link"
                data-toggle="dropdown"
                href="/view-offers"
                role="button"
              >
                <i className="ni ni-ui-04 d-lg-none"></i>
                <span className="nav-link-inner--text">Register</span>
              </a>
            </li>
            <li className="nav-item dropdown">
              <ReactCountryFlag code="UK" svg />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
);

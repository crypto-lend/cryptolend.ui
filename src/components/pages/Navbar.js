import React, { useState } from "react";
import { Link } from "react-router-dom";

import blocklendr from "../../assets/img/brand/blocklendrLogo.png";
import ReactCountryFlag from "react-country-flag";
import { FEATURES, INTEREST, COMPANY, ENTERPRISE } from "../config/navigation";

const MenuItem = ({ title, options }) => {
  const [showMenu, setMenu] = useState(false);
  return (
    <li
      className="nav-item dropdown "
      onMouseEnter={() => setMenu(true)}
      onMouseLeave={() => setMenu(false)}
    >
      <span
        style={{
          cursor: "pointer"
        }}
        className="nav-link dropdown-toggle "
        role="button"
      >
        {title}
      </span>
      <div className={`dropdown-menu ${showMenu ? "show" : ""}`}>
        {options.map(({ text, link }, index) => (
          <Link to={link} key={index} className="dropdown-item">
            {text}
          </Link>
        ))}
      </div>
    </li>
  );
};
export default () => (
  <header className="header-global">
    <nav
      id="navbar-main"
      className="navbar navbar-main navbar-expand-lg navbar-light"
    >
      <div className="container">
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
          <ul className="navbar-nav-hover align-items-lg-center">
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
            <MenuItem title={"Features"} options={FEATURES} />
            <MenuItem title={"Earn Interest"} options={INTEREST} />

            <MenuItem title={"Company"} options={COMPANY} />

            <li className="nav-item dropdown">
              <a className="nav-link" href="/" role="button">
                <i className="ni ni-collection d-lg-none"></i>
                <span className="nav-link-inner--text">Support</span>
              </a>
            </li>

            <MenuItem title={"Enterprise"} options={ENTERPRISE} />
            <Link
              to="/login"
              role="button"
              className="text-white nav-item btn btn-primary"
            >
              <i className="ni ni-ui-04 d-lg-none"></i>
              <span className="nav-link-inner--text">Login</span>
            </Link>

            <Link
              to="/register"
              role="button"
              className="text-white nav-item btn btn-success"
            >
              <i className="ni ni-ui-04 d-lg-none"></i>
              <span className="nav-link-inner--text">Register</span>
            </Link>

            <li className="nav-item dropdown">
              <ReactCountryFlag code="UK" svg />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
);

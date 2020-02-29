import React, { useState } from "react";
import { Link } from "react-router-dom";

// import Cryptolendr from "../../assets/img/brand/CryptolendrLogo.png";
import ReactCountryFlag from "react-country-flag";
import { FEATURES, INTEREST, COMPANY, ENTERPRISE } from "../config/navigation";

const MenuItem = ({ title, options }) => {
  const [showMenu, setMenu] = useState(false);

  return (
    <li
      className="nav-item dropdown mb-md-0 mb-1 mx-md-2 mx-0"
      onMouseEnter={() => setMenu(true)}
      onMouseLeave={() => setMenu(false)}
      onClick={() => setMenu(!showMenu)}
      style={{
        cursor: "pointer"
      }}
    >
      <span className="nav-link dropdown-toggle " role="button">
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
export default () => {
  const [showNavbar, toggleNavbar] = useState(false);
  return (
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
            onClick={() => toggleNavbar(!showNavbar)}
          >
            <span className="fas fa-ellipsis-h"></span>
          </button>
          <div
            className={`navbar-collapse collapse ${showNavbar ? "show" : ""}`}
          >
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
                    onClick={() => toggleNavbar(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
            <ul className="navbar-nav-hover text-center align-items-center p-0">
              <li className="nav-item dropdown mb-1">
                <Link
                  to="/"
                  className="nav-link"
                  data-toggle="dropdown"
                  role="button"
                >
                  {/* <img
                    src={Cryptolendr}
                    alt="Cryptolendr"
                    style={{ width: "40%" }}
                  /> */}
                </Link>
              </li>
              <MenuItem title={"Features"} options={FEATURES} />
              <MenuItem title={"Earn Interest"} options={INTEREST} />

              <MenuItem title={"Company"} options={COMPANY} />

              <li className="nav-item dropdown mb-md-0 mb-1 mx-md-2 mx-0">
                <Link className="nav-link" to="/support" role="button">
                  <span className="nav-link-inner--text">Support</span>
                </Link>
              </li>

              <MenuItem title={"Enterprise"} options={ENTERPRISE} />
              <Link
                to="/login"
                role="button"
                className="text-white nav-item mt-md-0 mt-2 mx-md-2 mx-0 btn btn-primary"
              >
                <span className="nav-link-inner--text">Login</span>
              </Link>

              <Link
                to="/register-form"
                role="button"
                className="text-white nav-item mt-md-0 mt-2 mx-md-2 mx-0 btn btn-success"
              >
                <span className="nav-link-inner--text">Register</span>
              </Link>

              <li className="nav-item mb-1 dropdown">
                <ReactCountryFlag code="UK" svg />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

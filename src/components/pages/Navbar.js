import React, { useState } from "react";
import { Link } from "react-router-dom";

import blocklendr from "../../assets/img/brand/blocklendrLogo.png";
import ReactCountryFlag from "react-country-flag";

const MenuItem = ({ title, options }) => {
  const [showMenu, setMenu] = useState(false);
  return (
    <li
      className="nav-item dropdown "
      onMouseEnter={() => setMenu(true)}
      onMouseLeave={() => setMenu(false)}
    >
      <a href="/features" className="nav-link dropdown-toggle" role="button">
        {title}
      </a>
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
            <MenuItem
              title={"Features"}
              options={[
                {
                  text: "Instant Crypto Credit",
                  link: "/features/instant-crypto-credit"
                },
                {
                  text: "Peer-to-peer Lending",
                  link: "/features/peer-to-peer-lending"
                },
                { text: "White-Label", link: "/features/white-label" }
              ]}
            />
            <MenuItem
              title={"Earn Interest"}
              options={[
                {
                  text: "Earn Interest in GBP, EUR, USD, RUB",
                  link: "/earn-interest"
                },
                {
                  text: "Earn Interest in Stable Coins",
                  link: "/earn-interest"
                }
              ]}
            />

            <MenuItem
              title={"Company"}
              options={[
                { text: "Events", link: "/events" },
                { text: "About Us", link: "/about-us" },
                { text: "Contact Us", link: "/contact-us" }
              ]}
            />

            <li className="nav-item dropdown">
              <a className="nav-link" href="/" role="button">
                <i className="ni ni-collection d-lg-none"></i>
                <span className="nav-link-inner--text">Support</span>
              </a>
            </li>

            <MenuItem
              title={"Enterprise"}
              options={[
                { text: "Institutional Credit", link: "/enterprise" },
                { text: "ICO/ IEO/ STO Company", link: "/enterprise" }
              ]}
            />
            <li className="nav-item dropdown btn btn-primary">
              <a href="/" role="button" style={{ color: "white" }}>
                <i className="ni ni-ui-04 d-lg-none"></i>
                <span className="nav-link-inner--text">Login</span>
              </a>
            </li>
            <li className="nav-item dropdown btn btn-success">
              <Link to="/register" role="button" style={{ color: "white" }}>
                <i className="ni ni-ui-04 d-lg-none"></i>
                <span className="nav-link-inner--text">Register</span>
              </Link>
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

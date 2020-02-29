import React from "react";
import { Link } from "react-router-dom";

import {
  FEATURES,
  INTEREST,
  COMPANY,
  ENTERPRISE,
  SOCIALLINKS
} from "../config/navigation";

export default () => (
  <footer className="footer font-small blue-grey lighten-5">
    <div>
      <div className="container"></div>
    </div>

    <div className="container text-center text-md-left mt-4">
      <div className="row mt-3 dark-grey-text">
        <div className="col-md-3 col-lg-4 col-xl-3 mb-4">
          <h6 className="text-uppercase font-weight-bold">Cryptolendr</h6>
          <hr className="w-100 accent-3 mb-4 mt-0 d-inline-block mx-auto" />
          <div className="col-12 text-md-left p-0 mb-4 mb-md-0">
            <h6 className="mb-0">Get connected with us on social networks!</h6>
          </div>

          <div className="col-12 col-md-6 mt-3 p-0 text-md-left d-flex justify-content-around justify-content-md-between">
            {SOCIALLINKS.map(({ icon, link }, index) => (
              <a
                key={index}
                target="_blank"
                rel="noopener noreferrer"
                href={link}
              >
                <img
                  className="p-0"
                  style={{ height: "1.25rem" }}
                  src={icon}
                  alt="Social Icon"
                />
              </a>
            ))}
          </div>
          <div className="col-12 mt-3 p-0 text-md-left">
            <div>
              1 Despenser Gardens <br /> Cardiff <br /> CF11 6AY
              <br />
              United Kindgom
            </div>
            <div>+44 2920 099 360</div>
          </div>
        </div>

        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
          <h6 className="text-uppercase font-weight-bold">Features</h6>
          <hr className="w-100 accent-3 mb-4 mt-0 d-inline-block mx-auto" />
          {FEATURES.map(({ text, link }, index) => (
            <Link className="d-block mb-2" key={index} to={link}>
              {text}
            </Link>
          ))}
        </div>

        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
          <h6 className="text-uppercase font-weight-bold">Earn Interest</h6>
          <hr className="w-100 accent-3 mb-4 mt-0 d-inline-block mx-auto" />
          {INTEREST.map(({ text, link }, index) => (
            <Link className="d-block mb-2" key={index} to={link}>
              {text}
            </Link>
          ))}
        </div>

        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
          <h6 className="text-uppercase font-weight-bold">Enterprise</h6>
          <hr className="w-100 accent-3 mb-4 mt-0 d-inline-block mx-auto" />
          {ENTERPRISE.map(({ text, link }, index) => (
            <Link className="d-block mb-2" key={index} to={link}>
              {text}
            </Link>
          ))}
        </div>

        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
          <h6 className="text-uppercase font-weight-bold">Company</h6>
          <hr className="w-100 accent-3 mb-4 mt-0 d-inline-block mx-auto" />
          {COMPANY.map(({ text, link }, index) => (
            <Link className="d-block mb-2" key={index} to={link}>
              {text}
            </Link>
          ))}
        </div>
      </div>
    </div>

    <div className="footer-copyright text-center text-black-50 py-3">
      © {new Date().getFullYear()} Copyright:
      <Link className="dark-grey-text" to="/">
        {" "}
        Cryptolendr Global Ltd.
      </Link>
      <ul className="navbar-nav-hover text-center mt-2 p-0 align-items-center">
        <li className="nav-item dropdown mx-2">
          <Link className="nav-link" to="/privacy-policy" role="button">
            <span className="nav-link-inner--text">Privacy Policy</span>
          </Link>
        </li>
      </ul>
    </div>
  </footer>
);

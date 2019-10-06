import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { validateEmail } from "../utils";

const FormConfig = {
  features: {
    "instant-crypto-credit":
      "Get cash instantly with your instant crypto-backed loans . Keep your crypto secure with our $100 million USD insured custodial wallets",
    "peer-to-peer-lending":
      "Borrow or lend on your own terms in our global peer-to-peer crypto lending marketplace",
    "white-label":
      "Partner with Blocklendr and our APIs for insured crypto interest-bearing accounts. Wallet provides , exchanges and custodians can work with Blocklendr to provide their customers with the ability  to earn Interest on their crypto deposits. ",
    redirect: "/register"
  },
  "earn-interest": {
    "stable-coin":
      "Make your crypto work for you with up to 8% interest on symbol stable coins 100% Asset backed guarantee",
    fiat:
      "Start earning up to 8% interest on EUR, GBP, USD and RUB 100% asset backed guarantee",
    redirect: "/register"
  }
};
export default function EmailForm(props) {
  const {
    match: {
      params: { menuItem, subItem }
    },
    history: { push }
  } = props;

  const [email, setEmail] = useState("");

  // Some basic checks for bad config
  if (!menuItem || !subItem) {
    return <Redirect to="/" />;
  }

  // If no text exists then redirect to home
  if (!FormConfig[menuItem] || !FormConfig[menuItem][subItem]) {
    return <Redirect to="/" />;
  }

  const { redirect } = FormConfig[menuItem];
  const text = FormConfig[menuItem][subItem];

  return (
    <div className="container mt-5 pt-5">
      <div className="row  justify-content-center text-center">
        <div className="col-lg-6 col-10">
          <h4 className="font-weight-light">{text}</h4>
        </div>
      </div>
      <div className="row mt-5 justify-content-center text-center">
        <div
          className="col-lg-6 col-12 py-5 px-5 border"
          style={{
            borderRadius: "1rem"
          }}
        >
          <form onSubmit={() => redirect && push(redirect)}>
            <div className="form-group">
              <label
                className="h5 font-weight-normal"
                htmlFor="exampleFormControlInput1"
              >
                Enter your Email
              </label>
              <input
                type="email"
                className="form-control mt-3"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="text-center">
              <button
                type="button"
                className={`btn btn-primary mt-3 w-50 ${
                  validateEmail(email) ? "" : "disabled"
                }`}
                onClick={() => redirect && push(redirect)}
              >
                <span className="btn-inner--text">Register Now</span>
                <span className="btn-inner--icon ml-3">
                  <i className="ni ni-bold-right"></i>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

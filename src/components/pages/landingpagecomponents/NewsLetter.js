import React, { useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert";

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
export default function NewsLetter() {
  const [showPrompt, setPrompt] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div className="position-relative container my-5">
      <div className="row">
        <div className="col-sm">
          <div
            style={{ textAlign: "center" }}
            className="card-header bg-transparent"
          >
            <h2 className="text-uppercase ls-1 text-primary py-3 mb-0">
              {" "}
              Join Our NewsLetter
            </h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="d-flex m-5 px-5 w-100 justify-content-center">
          <input
            className="form-control w-50"
            type="text"
            id="news-letter-mail"
            placeholder="Your email"
            required
            onChange={e => setEmail(e.target.value)}
          />
          <button
            className={`btn btn-primary px-5 ml-5 ${
              validateEmail(email) ? "" : "disabled"
            }`}
            type="button"
            htmlFor="news-letter-mail"
            onClick={() => setPrompt(true)}
          >
            Submit
          </button>
          {showPrompt && (
            <SweetAlert
              success
              title="Awesome!"
              onConfirm={() => setPrompt(false)}
              onCancel={() => setPrompt(false)}
            >
              You are subscribed to our newsLetter
            </SweetAlert>
          )}
        </div>
      </div>
    </div>
  );
}

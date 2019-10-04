import React, { useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { validateEmail } from "../../utils";

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
      <form
        onSubmit={e => {
          e.preventDefault();
          validateEmail(email) && setPrompt(true);
        }}
        className="row"
      >
        <div className="d-flex m-5 px-5 w-100 justify-content-center form-group">
          <input
            className="form-control w-50"
            type="text"
            id="news-letter-mail"
            placeholder="Your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
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
        </div>
      </form>
      {showPrompt && (
        <SweetAlert
          success
          title="Awesome!"
          onConfirm={() => setPrompt(false)}
          onCancel={() => setPrompt(false)}
        >
          You are subscribed to our news letter
        </SweetAlert>
      )}
    </div>
  );
}

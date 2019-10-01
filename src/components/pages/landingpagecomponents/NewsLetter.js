import React from "react";

export default function NewsLetter() {
  return (
    <div className="position-relative container my-5">
      <div className="row">
        <div className="col-sm">
          <div
            style={{ textAlign: "center" }}
            className="card-header bg-transparent"
          >
            <h4 className="text-uppercase ls-1 text-primary py-3 mb-0">
              {" "}
              Join Our NewsLetter
            </h4>
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
          />
          <button
            className="btn btn-primary px-5 ml-5"
            type="button"
            htmlFor="news-letter-mail"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

import React from "react";

export default function ContactUs() {
  return (
    <div className="container mt-5 pt-5">
      <div className="row  justify-content-center text-center">
        <div className="col-lg-6 col-10">
          <h2>Connect with us</h2>
        </div>
      </div>
      <div className="row mt-5 justify-content-center text-center">
        <div
          className="col-lg-6 col-12 py-5 px-5 border"
          style={{
            borderRadius: "1rem"
          }}
        >
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control mt-3"
                placeholder="Your Name"
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                className="form-control mt-3"
                placeholder="Your email"
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control mt-3"
                placeholder="Subject"
              />
            </div>
            <div className="form-group">
              <textarea rows="5" className="form-control mt-3" />
            </div>

            <div className="text-center">
              <button type="button" className="btn btn-primary mt-3 w-50">
                <span className="btn-inner--text">Submit</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

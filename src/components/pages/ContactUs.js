import React, { useState } from "react";
import { SOCIALLINKS } from "../config/navigation";
import SweetAlert from "react-bootstrap-sweetalert";
import Navbar from "./Navbar";

const defaultForm = {
  name: "",
  email: "",
  subject: "",
  query: ""
};
export default function ContactUs() {
  const [form, setForm] = useState(defaultForm);
  const [showPrompt, setPrompt] = useState(false);

  const updateForm = (key, value) => setForm({ ...form, [key]: value });

  const formKeys = Object.keys(form)
    .map(key => key)
    .reduce((acc, val) => {
      acc[val] = val;
      return acc;
    }, {});

  const checkValidity = () => {
    for (const key in form) {
      if (!form[key] || form[key] === "" || form[key].length === 0)
        return false;
    }
    return true;
  };
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center text-center">
          <div className="col-lg-6 col-10">
            <h2>Connect with us</h2>
          </div>
        </div>
        <div className="row justify-content-center text-center mt-4">
          <div className="col-lg-6 col-10">
            At Cryptolendr we always love hearing back from our users, you can
            connect with us on social media or by email or over the phone.
        </div>
        </div>
        <div className="row text-center justify-content-center mt-4">
          <div className="col-lg-6 col-10 d-flex justify-content-around">
            {SOCIALLINKS.map(({ icon, link }, index) => (
              <a key={index} href={link}>
                <img
                  className="p-0"
                  style={{ height: "1.25rem" }}
                  src={icon}
                  alt="Social Icon"
                />
              </a>
            ))}
          </div>
        </div>
        <div className="row text-center justify-content-center mt-4">
          <div className="col-lg-6 col-10 ">
            <div>support@Cryptolendr.com</div>
            <div>
              1 Despenser Gardens <br /> Cardiff <br /> CF11 6AY
            <br />
              United Kingdom
          </div>
            <div>+44 2920 099 360</div>
          </div>
        </div>
        <div className="row justify-content-center mt-5">
          <div className="col-lg-6 col-10">
            Alternatively, use this contact form below and we'll get back to you
            as soon as we can.
        </div>
        </div>
        <div className="row mt-5 justify-content-center text-center">
          <div
            className="col-lg-6 col-12 py-5 px-5 border"
            style={{
              borderRadius: "1rem"
            }}
          >
            <form
              onSubmit={e => {
                e.preventDefault();
                checkValidity() && setPrompt(true);
              }}
            >
              <div className="form-group">
                <input
                  type="text"
                  className="form-control mt-3"
                  placeholder="Your Name"
                  required
                  value={form.name}
                  onChange={e => updateForm(formKeys.name, e.target.value)}
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  className="form-control mt-3"
                  placeholder="Your email"
                  required
                  value={form.email}
                  onChange={e => updateForm(formKeys.email, e.target.value)}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control mt-3"
                  placeholder="Subject"
                  required
                  value={form.subject}
                  onChange={e => updateForm(formKeys.subject, e.target.value)}
                />
              </div>
              <div className="form-group">
                <textarea
                  rows="5"
                  className="form-control mt-3"
                  value={form.query}
                  required
                  onChange={e => updateForm(formKeys.query, e.target.value)}
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className={`btn btn-primary mt-3 w-50 ${
                    checkValidity() ? "" : "disabled"
                    }`}
                  onClick={() => setPrompt(true)}
                >
                  <span className="btn-inner--text">Submit</span>
                </button>
              </div>
            </form>
          </div>
        </div>
        {showPrompt && (
          <SweetAlert
            success
            title="Thanks!"
            onConfirm={() => setPrompt(false)}
            onCancel={() => setPrompt(false)}
          >
            We will get back to you as soon as possible
        </SweetAlert>
        )}
      </div>
    </>
  );
}

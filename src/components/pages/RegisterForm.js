import React, { useState } from "react";
import { validateEmail } from "../utils";
import Navbar from "./Navbar";

const defaultForm = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: ""
};
export default function Register(props) {
  const {
    history: { push }
  } = props;
  const [form, setForm] = useState(defaultForm);

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

    if (!validateEmail(form.email)) return false;
    if (form.password !== form.confirmPassword) return false;

    return true;
  };
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center text-center">
          <div className="col-lg-6 col-10">
            <h2>Register</h2>
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
                checkValidity() && push("/register", { ...form });
              }}
            >
              <div className="form-group d-flex">
                <div className="input-group input-group-merge mr-3">
                  <input
                    className="form-control"
                    placeholder="First Name"
                    type="text"
                    value={form.firstName}
                    onChange={e =>
                      updateForm(formKeys.firstName, e.target.value)
                    }
                    required
                  />
                </div>
                <div className="input-group input-group-merge">
                  <input
                    className="form-control"
                    placeholder="Last Name"
                    type="text"
                    value={form.lastName}
                    onChange={e =>
                      updateForm(formKeys.lastName, e.target.value)
                    }
                    required
                  />
                </div>
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
                  value={form.username}
                  onChange={e => updateForm(formKeys.username, e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control mt-3"
                  placeholder="Password"
                  type="password"
                  value={form.password}
                  required
                  onChange={e => updateForm(formKeys.password, e.target.value)}
                />
              </div>

              <div className="form-group">
                <input
                  className="form-control mt-3"
                  placeholder="Confirm Password"
                  type="password"
                  value={form.confirmPassword}
                  required
                  onChange={e =>
                    updateForm(formKeys.confirmPassword, e.target.value)
                  }
                />
                {form.password !== form.confirmPassword && (
                  <small className="text-danger position-absolute mt-1 d-block text-left text-small">
                    Passwords do not match
                  </small>
                )}
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className={`btn btn-primary mt-5 w-50 ${
                    checkValidity() ? "" : "disabled"
                  }`}
                  onClick={() =>
                    checkValidity() && push("/register", { ...form })
                  }
                >
                  <span className="btn-inner--text">Submit</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

import React from "react";
import { useLocation } from "react-router-dom";

import Logo from "../UI/Logo";

import "../UI/LogReg.css";
import "../Shared/shared.css";
import "./FullRegister.css";

const FullRegister = () => {
  const { state } = useLocation();
  const { email, password } = state;

  const submitRegistrationHandler = (event) => {
    event.preventDefault();
  };
  return (
    <React.Fragment>
      <Logo />
      <div className="logreg-body body">
        <div className="logreg-form card">
          <form
            id="login-form"
            className="input-group"
            onSubmit={submitRegistrationHandler}
          >
            <h3 id="logreg-label">Create An Account</h3>
            <label>Account Type</label>
            <input
              type="text"
              placeholder="Account Type"
              className="reg-input-field"
              required
            />
            <label>Email</label>
            <input
              type="text"
              placeholder="Account Type"
              className="reg-input-field"
              value={email}
              required
            />

            <table>
              <tr>
                <th>Last Name</th>
                <th>First Name</th>
                <th> M.I </th>
              </tr>
              <td>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="name-input-field"
                  required
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="First Name"
                  className="name-input-field"
                  required
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="M. I "
                  className="name-input-field"
                  required
                />
              </td>
            </table>
            <label>Contact Number</label>
            <input
              type="text"
              placeholder="Contact Number"
              className="reg-input-field"
              required
            />
            <label>Birthdate</label>
            <input
              type="text"
              placeholder="Birthdate"
              className="reg-input-field"
              required
            />
            <input type="Checkbox" className="check-box" />
            <span> I have read the terms and conditions.</span>

            {/*So, do we need some password inputs here? */}
            <button type="submit" id="btn-submit">
              PROCEED
            </button>
          </form>
        </div>
      </div>

      {/* <h1>{email}</h1> */}
      {/* <h1>{password}</h1> */}
    </React.Fragment>
  );
};

export default FullRegister;

import React, { useEffect, useState } from "react";

import Logo from "../UI/Logo";
import "./NewPass.css";
import "../Shared/shared.css";

export default function NewPass() {
  const [newPWD, setNewPWD] = useState("");
  const [conPWD, setConPWD] = useState("");
  const [err, setErr] = useState(false);
  const [match, setMatch] = useState(false);

  useEffect(() => {
    setErr(false);
    setMatch(false);
  }, [newPWD, conPWD]);

  const submitHandler = (event) => {
    event.preventDefault();

    if (newPWD.trim().length > 5) {
      if (newPWD === conPWD) {
        alert("success");
        setNewPWD("");
        setConPWD("");
        setErr(false);
        setMatch(false);
      } else {
        setMatch(true);
      }
    } else {
      setErr(true);
    }
  };

  let errMsg = "";
  if (err) {
    errMsg = (
      <span className="error">Password must be at least 8 characters.</span>
    );
  }
  if (match) {
    errMsg = (
      <span className="error">Password and Confirm password do not match.</span>
    );
  }

  return (
    <React.Fragment>
      <Logo />
      <div className="logreg-body">
        <div className="logreg-form">
          <form className="input-group center" onSubmit={submitHandler}>
            <h3 id="pass-label">Account Recovery</h3>
            <label>Enter New Password</label>
            <br />
            <input
              type="password"
              placeholder="New Password"
              className="forgot-emailpass"
              value={newPWD}
              onChange={(event) => {
                setNewPWD(event.target.value);
              }}
              required
            />
            <br />
            <label>Confirm New Password</label>
            <br />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="forgot-emailpass"
              value={conPWD}
              onChange={(event) => {
                setConPWD(event.target.value);
              }}
              required
            />
            <br />

            {errMsg}
            <button type="submit" id="btn-forgot">
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

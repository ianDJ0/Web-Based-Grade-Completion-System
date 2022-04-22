import React, { useEffect, useState } from "react";

import Logo from "../UI/Logo";
import "../Shared/shared.css";
import "./ForgotPW.css";

export default function ForgotPW() {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState(false);

  useEffect(() => {
    setErr(false);
  }, [email]);

  const submitHandler = (event) => {
    event.preventDefault();
    if (email.trim().length > 6) {
      alert("success");
      setEmail("");
      setErr(false);
    } else {
      setErr(true);
    }
  };

  const errMsg = err ? <div className="error">Invalid email.</div> : "";

  return (
    <React.Fragment>
      <Logo />
      <div className="logreg-body">
        <div className="logreg-form">
          <form className="input-group center" onSubmit={submitHandler}>
            <h3 id="pass-label">Account Recovery</h3>
            <label>Enter Account Email Address</label>
            <br />
            <input
              type="email"
              placeholder="Email"
              class="forgot-emailpass"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
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

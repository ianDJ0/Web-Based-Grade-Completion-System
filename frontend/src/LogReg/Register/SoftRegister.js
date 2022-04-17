import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import LogReg from "../UI/LogReg";
import Logo from "../UI/Logo";
import "./SoftRegister.css";

const DUMMY_EMAIL = ["test@email.com", "123@email.com"];

const SoftRegister = () => {
  const navigate = useNavigate();

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPW, setEnteredPW] = useState("");
  const [exists, setExists] = useState(false);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };
  const setPWHandler = (event) => {
    setEnteredPW(event.target.value);
  };

  const checkEmailHandler = (event) => {
    event.preventDefault();
    setExists(DUMMY_EMAIL.some((check) => check === enteredEmail));
    if (!exists) {
      navigate("/register/full", {
        state: { email: enteredEmail, password: enteredPW },
      });
    }
  };

  const redirectHandler = () => {
    navigate("/");
  };

  return (
    <React.Fragment>
      <Logo />
      <LogReg choice="register">
        <form className="input-group" onSubmit={checkEmailHandler}>
          <h3 id="logreg-label">Create An Account</h3>
          <label>Email</label>
          <br />
          <input
            type="text"
            placeholder="Email"
            className="input-field"
            value={enteredEmail}
            onChange={emailChangeHandler}
            required
          />
          {exists && (
            <div className="red">
              <span>An account is already linked with this email. </span>
              <span onClick={redirectHandler} className="link">
                Sign In.
              </span>
            </div>
          )}
          <br />
          <label>Password</label>
          <input
            type="Password"
            placeholder="Password"
            className="input-field"
            onChange={setPWHandler}
            value={enteredPW}
          />
           <label>Confirm New Password</label>
          <input
            type="Password"
            placeholder="Password"
            className="input-field"
            onChange={setPWHandler}
            value={enteredPW}
          />
          <input type="Checkbox" className="check-box" />
          <span> I have read the terms and conditions.</span>
          <button type="submit" id="btn-submit">
            SIGN UP
          </button>
          <div className="separator-logreg">OR SIGN UP USING</div>
          <div className="social-logreg">
            <img alt="" src="https://bit.ly/3rn9ed6" id="google-account" />
            <img alt="" src="https://bit.ly/3vfdU61" id="ms-account" />
          </div>
        </form>
      </LogReg>
    </React.Fragment>
  );
};

export default SoftRegister;

import React, { useState } from "react";
import Logo from "../UI/Logo";
import LogReg from "../UI/LogReg";
import "./Login.css";

const Login = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPW, setEnteredPW] = useState("");
  const [isValid, setIfValid] = useState(true);

  const enteredEmailHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const enteredPWHandler = (event) => {
    setEnteredPW(event.target.value);
  };

  const submitLoginHandler = (event) => {
    event.preventDefault();
    alert("Email: " + enteredEmail + "\nPassword: " + enteredPW);

    //add a validation if cred are valid, use setIfValid and assign if it is valid[true], otherwise set false

    //if the creds entered are valid
    if (isValid) {
      setEnteredEmail("");
      setEnteredPW("");
      //prolly some useNavigate to the main/next page
    } else {
      //show alert/error message
    }
  };

  return (
    <React.Fragment>
      <Logo />
      <LogReg choice="login">
        <form
          id="login-form"
          className="input-group"
          onSubmit={submitLoginHandler}
        >
          <h3 id="logreg-label">Log In</h3>
          <label>Email</label>
          <br />
          <input
            type="text"
            placeholder="Email"
            className="input-field"
            onChange={enteredEmailHandler}
            value={enteredEmail}
            required
          />
          <br />
          <label>Password</label>
          <br />
          <input
            type="Password"
            id="pass-input"
            placeholder="Password"
            className="input-field"
            onChange={enteredPWHandler}
            value={enteredPW}
            required
          />
          <a href="/#" id="forgot-pass">
            Forgot Password?
          </a>
          <button type="submit" id="btn-submit">
            SIGN IN
          </button>
          {/* Do we allow signin in from other sources??? */}
          <div className="separator-logreg">OR LOGIN USING</div>
          <div className="social-logreg">
            <img alt="" src="https://bit.ly/3rn9ed6" id="google-account" />
            <img alt="" src="https://bit.ly/3vfdU61" id="ms-account" />
          </div>
        </form>
      </LogReg>
    </React.Fragment>
  );
};

export default Login;

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Logo from "../UI/Logo";
import LogReg from "../UI/LogReg";
// import "./Login.css";
import "../Shared/shared.css";

const Login = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPW, setEnteredPW] = useState("");
  const [isValid, setIfValid] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const userRef = useRef();

  useEffect(() => {
    userRef.current.focus();
    if (!isValid) userRef.current.focus();
  }, [isValid]);

  useEffect(() => {
    setErrMsg("");
  }, [enteredEmail, enteredPW]);

  const enteredEmailHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const enteredPWHandler = (event) => {
    setEnteredPW(event.target.value);
  };

  const submitLoginHandler = async (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:7700/api/users/login", {
        loginEmail: enteredEmail,
        loginPassword: enteredPW,
      })
      .then(function (response) {
        console.log(response);
        setIfValid(true);
      })
      .catch(function (error) {
        setIfValid(false);
        setErrMsg(error.response.data.message);
      });

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
          <label htmlFor="email">Email</label>
          <br />
          <input
            id="email"
            ref={userRef}
            type="text"
            placeholder="Email"
            className="input-field"
            onChange={enteredEmailHandler}
            value={enteredEmail}
            autoComplete="off"
            required
          />
          <br />
          <label htmlFor="pass-input">Password</label>
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

          {!isValid && <div> {errMsg}</div>}

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

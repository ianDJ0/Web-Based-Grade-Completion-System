import React, { useEffect, useRef, useState } from "react";

import axios from "axios";

import Logo from "../../UI/LogReg_UI/Logo";
import LogRegBody from "../../UI/LogReg_UI/LogRegBody";
import LogRegButton from "../../UI/LogReg_UI/LogRegButton";
import LogRegForm from "../../UI/LogReg_UI/LogRegForm";

import "../../Shared/Shared.css";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPWD] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isValid, setIsValid] = useState(false);
  const emailRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    //sets the cursor focus to the email field
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    //clears out the error message when you type in the fields
    setErrMsg("");
  }, [email, pwd]);

  useEffect(() => {
    if (isValid) {
      setEmail("");
      setPWD("");
      navigate("/homepage");
    }
  }, [isValid, navigate]);

  const loginHandler = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:7700/api/users/login", {
        loginEmail: email,
        loginPassword: pwd,
      })
      .then(function (response) {
        alert(response.data.token)
        setIsValid(true);
      })
      .catch(function (error) {
        setErrMsg(error.response.data.message);
        setIsValid(false);
      });
  };

  const error =
    errMsg.trim().length > 2 ? (
      <div className="error">Incorrect Email/Password</div>
    ) : (
      ""
    );

  const pwdError =
    errMsg.trim().length < 2 &&
    pwd.trim().length < 6 &&
    pwd.trim().length > 0 ? (
      <div className="error">Password must be at least 6 characters long</div>
    ) : (
      ""
    );

  return (
    <>
      <Logo />
      <LogRegBody>
        <LogRegButton choice={"login"} />
        <LogRegForm>
          <form id="login-form" className="input-group" onSubmit={loginHandler}>
            <h3 id="logreg-label">Log In</h3>
            <label htmlFor="email">Email</label>
            <br />
            <input
              ref={emailRef}
              id="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              type="text"
              placeholder="Email"
              className="input-field"
              required
            />
            <br />
            <label htmlFor="pass-input">Password</label>
            <br />
            <input
              value={pwd}
              onChange={(event) => {
                setPWD(event.target.value);
              }}
              type="Password"
              id="pass-input"
              placeholder="Password"
              className="input-field"
              required
            />
            <span alt="forgot-password" id="forgot-pass">
              Forgot Password?
            </span>

            {error}
            {pwdError}

            <button type="submit" id="btn-submit">
              SIGN IN
            </button>
            <div className="separator-logreg">OR LOGIN USING</div>
            <div className="social-logreg">
              <img
                alt="login-google"
                src={"https://bit.ly/3rn9ed6"}
                id="google-account"
              />
              <img
                alt="login-ms"
                src={"https://bit.ly/3vfdU61"}
                id="ms-account"
              />
            </div>
          </form>
        </LogRegForm>
      </LogRegBody>
    </>
  );
};
export default Login;

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Logo from "../../UI/LogReg_UI/Logo";
import LogRegBody from "../../UI/LogReg_UI/LogRegBody";
import LogRegButton from "../../UI/LogReg_UI/LogRegButton";
import LogRegForm from "../../UI/LogReg_UI/LogRegForm";

import "../../Shared/Shared.css";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isErr, setIsErr] = useState(false);

  const emailRef = useRef();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setIsErr(false);
  }, [email]);

  const registerHandler = (event) => {
    event.preventDefault();

    if (email.trim().length > 6) {
      axios
        .post("http://localhost:7700/api/users/softValidate", {
          registerEmail: email,
        })
        .then(function (response) {
          navigate("/register/complete", {
            state: { email: email },
          });
        })
        .catch(function (error) {
          setIsErr(true);
        });
    }
  };
  const error = isErr ? (
    <div className="error">
      Email has already been linked to another account.
      <br /> Log in the email to gain access.
    </div>
  ) : (
    ""
  );

  return (
    <>
      <Logo />
      <LogRegBody>
        <LogRegButton choice={"register"} />
        <LogRegForm>
          <form
            className="input-group"
            onSubmit={registerHandler}
            encType="application-json"
          >
            <h3 id="logreg-label" className="register">
              Create An Account
            </h3>
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
            {error}

            <button type="submit" id="btn-submit">
              REGISTER EMAIL
            </button>
            <div className="separator-logreg">OR SIGN UP USING</div>
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

export default Register;

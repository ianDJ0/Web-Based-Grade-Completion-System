import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LogReg from "../UI/LogReg";
import Logo from "../UI/Logo";
import "./SoftRegister.css";

const SoftRegister = () => {
  const navigate = useNavigate();

  const [enteredEmail, setEnteredEmail] = useState("");

  const [emailChk, setEmailChk] = useState();

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const checkEmailHandler = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:7700/api/users/softValidate", {
        registerEmail: enteredEmail,
      })
      .then(function (response) {
        //Soft Register email validation
        navigate("/register/full", {
          state: { email: enteredEmail },
        });
      })
      .catch(function (error) {
        setEmailChk(error.response.data.message + ". Sign in instead.");
      });
  };

  useEffect(() => {
    setEmailChk("");
  }, []);

  return (
    <React.Fragment>
      <Logo />
      <LogReg choice="register">
        <form className="input-group" onSubmit={checkEmailHandler} encType="application-json">
          <h3 id="logreg-label">Create An Account</h3>
          <label>Email</label>
          <br />
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={enteredEmail}
            onChange={emailChangeHandler}
            required
          />
          {
            <div className="red">
              <span>{emailChk}</span>
            </div>
          }
          <br />
          {/* <label>Password</label>
          <input
            type="Password"
            placeholder="Password"
            className="input-field"
            onChange={setPWHandler}
            value={enteredPW}
          /> */}
          {/* <label>Confirm New Password</label>
          <input
            type="Password"
            placeholder="Password"
            className="input-field"
            onChange={setPWHandler}
            value={enteredPW}
          /> */}
          
          <button type="submit" id="btn-submit">
            REGISTER EMAIL
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

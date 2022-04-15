import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LogReg from "../UI/LogReg";
import "./SoftRegister.css";

const DUMMY_EMAIL = ["test@email.com", "123@email.com"];

const SoftRegister = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [exists, setExists] = useState(false);

  const emailChangeHandler = (event) => {
    console.log(event.target.value);
    setEmail(event.target.value);
  };

  const checkEmailHandler = (event) => {
    event.preventDefault();
    setExists(DUMMY_EMAIL.some((check) => check === email));
  };

  const redirectHandler = () => {
    navigate("/accountdetails");
  };

  return (
    <LogReg>
      <form
        // id="register-form"
        className="input-group"
        onSubmit={checkEmailHandler}
      >
        <h3 id="logreg-label">Create An Account</h3>
        <label>Email</label>
        <br />
        <input
          type="text"
          placeholder="Email"
          className="input-field"
          value={email}
          onChange={emailChangeHandler}
          required
        />
        {exists && (
          <div>
            <span>An account is linked with this email. </span>
            <span onClick={redirectHandler} className="link">
              Sign Up Now.
            </span>
          </div>
        )}
        <label>Password</label>
        <input type="Password" placeholder="Password" className="input-field" />
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
  );
};

export default SoftRegister;

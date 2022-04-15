import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./LogRegButton.css";

const LogRegButton = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(true);
  const [register, setRegister] = useState(false);

  const loginHandler = () => {
    setLogin(true);
    setRegister(false);

    navigate("/");
  };

  const registerHandler = () => {
    setLogin(false);
    setRegister(true);

    navigate("/register");
  };

  return (
    <div className="btn-box">
      <div id="btn"></div>
      <button
        type="button"
        className="toggle-btn"
        id="log-btn"
        onClick={loginHandler}
      >
        LOGIN
      </button>
      <button
        type="button"
        className="toggle-btn"
        id="reg-btn"
        onClick={registerHandler}
      >
        REGISTER
      </button>
    </div>
  );
};

export default LogRegButton;

import { useNavigate } from "react-router-dom";
import "./LogRegButton.css";

const LogRegButton = (props) => {
  const navigate = useNavigate();

  const loginHandler = () => {
    navigate("/");
  };
  const registerHandler = () => {
    navigate("/register");
  };

  const choice = props.choice;

  return (
    <div className="box btn-box">
      <div
        onClick={loginHandler}
        className={`option ${choice === "login" ? "option-login" : null}`}
      >
        LOGIN
      </div>
      <div
        onClick={registerHandler}
        className={`option ${choice === "register" ? "option-register" : null}`}
      >
        REGISTER
      </div>
    </div>
  );
};
export default LogRegButton;

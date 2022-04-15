import LogReg from "../UI/LogReg";
import "./Login.css";

const Login = () => {
  return (
    <LogReg>
      <form id="login-form" className="input-group">
        <h3 id="logreg-label">Log In</h3>
        <label>Email</label>
        <br />
        <input type="text" placeholder="Email" className="input-field" required />
        <br />
        <label>Password</label>
        <br />
        <input
          type="Password"
          id="pass-input"
          placeholder="Password"
          className="input-field"
          required
        />
        <a href="/#" id="forgot-pass">
          Forgot Password?
        </a>
        <button type="submit" id="btn-submit">
          SIGN IN
        </button>
        <div className="separator-logreg">OR LOGIN USING</div>
        <div className="social-logreg">
          <img alt="" src="https://bit.ly/3rn9ed6" id="google-account" />
          <img alt="" src="https://bit.ly/3vfdU61" id="ms-account" />
        </div>
      </form>
    </LogReg>
  );
};

export default Login;

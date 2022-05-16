import "./Login.css";

const AdminLogin = () => {
  return (
    <div className="admin-login-bg">
      <div className="admin-login-picname">
        <img
          src={require("../../../../Components/UI/Home_UI/Icons/bulsu-logo.png")}
          alt="Logo"
          id="admin-logo"
        />
        <h2 id="admin-site-name">BULACAN STATE UNIVERSITY</h2>
      </div>
      <div className="admin-input">
        <h2 id="admin-login-label">Log In</h2>
        <h4>Sign in to your account.</h4>
        <div className="admin-input-email">
          <p className="admin-login-labels">Email</p>
          <input
            type="email"
            placeholder="Email"
            className="admin-input-fields"
          />
        </div>
        <div className="admin-input-pass">
          <p className="admin-login-labels">Password</p>
          <input
            type="password"
            placeholder="Password"
            className="admin-input-fields"
          />
        </div>
        <button id="admin-login-btn">SIGN IN</button>
      </div>
    </div>
  );
};

export default AdminLogin;

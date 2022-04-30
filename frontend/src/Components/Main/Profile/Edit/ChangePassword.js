import TopNav from "../../../UI/Home_UI/TopNav";
import Sidebar from "../../../UI/Home_UI/Sidebar";
import "./ChangePassword.css";

const ChangePassword = () => {
  return (
    <>
      <TopNav />
      <Sidebar active={""} />
      <div className="change-password-form">
        <i
          className="fa fa-times-circle close-form"
          style={{ fontSize: "2em" }}
        ></i>
        <h2 id="change-pass-label">Change Password</h2>
        <label>Enter Old Password</label>
        <input placeholder="Old Password" id="input-old-pass" />
        <label>Enter New Password</label>
        <input placeholder="New Password" id="input-new-pass" />
        <label>Confirm New Password</label>
        <input placeholder="Confirm New Password" id="confirm-new-pass" />
        <button id="confirm-change-btn">Change Password</button>
      </div>
    </>
  );
};

export default ChangePassword;

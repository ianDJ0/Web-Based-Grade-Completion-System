import TopNav from "../../../UI/Home_UI/TopNav";
import Sidebar from "../../../UI/Home_UI/Sidebar";
import "./ChangePassword.css";
import { AuthenticationContext } from "../../../Shared/context/auth-context";
import { useContext, useState } from "react";
import axios from "axios";
import TokenCheck from "../../../Shared/Auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ChangePassword = () => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [cPass, setCPass] = useState("");

  const navigate = useNavigate();

  const auth = useContext(AuthenticationContext);
  TokenCheck();
  const submitPassword = () => {
    //new pass and compare pass validation
    if (cPass === newPass) {
      axios.post(
        `http://localhost:7700/api/users/changePassword`,
        {
          userID: auth.userId,
          verifyPassword: oldPass,
          newPassword: newPass,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Password changed!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          navigate('/profile');
        })
      });
    } else {
      alert("Password does not match");
    }
  };
  return (
    <>
      <TopNav />
      <Sidebar active={""} />
      <div className="change-password-form">
        <i
          onClick={() => {
            navigate("/profile");
          }}
          className="fa fa-times-circle close-form click"
          style={{ fontSize: "2em" }}
        ></i>
        <h2 id="change-pass-label">Change Password</h2>
        <label>Enter Old Password</label>
        <input
          type="password"
          placeholder="Old Password"
          id="input-old-pass"
          onChange={(e) => {
            setOldPass(e.target.value);
          }}
        />
        <label>Enter New Password</label>
        <input
          type="password"
          placeholder="New Password"
          id="input-new-pass"
          onChange={(e) => {
            setNewPass(e.target.value);
          }}
        />
        <label>Confirm New Password</label>
        <input
          type="password"
          placeholder="Confirm New Password"
          id="confirm-new-pass"
          onChange={(e) => {
            setCPass(e.target.value);
          }}
        />
        {newPass !== cPass &&
          newPass.trim().length > 0 &&
          cPass.trim().length > 0 && <span>Password do not match</span>}
        <button id="confirm-change-btn" onClick={submitPassword}>
          Change Password
        </button>
      </div>
    </>
  );
};

export default ChangePassword;

import TopNav from "../../../UI/Home_UI/TopNav";
import Sidebar from "../../../UI/Home_UI/Sidebar";
import "./ChangePassword.css";
import { AuthenticationContext } from "../../../Shared/context/auth-context";
import { useContext,useState } from "react";
import axios from "axios";
import TokenCheck from "../../../Shared/Auth";
const ChangePassword = () => {
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [cPass, setCPass] = useState('');

  const auth = useContext(AuthenticationContext);
  TokenCheck();
  const submitPassword = () => {

    //new pass and compare pass validation
    if(cPass === newPass){
      axios.post(`http://localhost:7700/api/users/changePassword`, {
        userID: auth.userId,
        verifyPassword: oldPass,
        newPassword: newPass
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      })
    }else{
      alert("Password does not match")
    }
  }
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
        <input placeholder="Old Password" id="input-old-pass" onChange={(e)=>{setOldPass(e.target.value)}}/>
        <label>Enter New Password</label>
        <input placeholder="New Password" id="input-new-pass" onChange={(e)=>{setNewPass(e.target.value)}}/>
        <label>Confirm New Password</label>
        <input placeholder="Confirm New Password" id="confirm-new-pass" onChange={(e)=>{setCPass(e.target.value)}}/>
        <button id="confirm-change-btn" onClick={submitPassword}>Change Password</button>
      </div>
    </>
  );
};

export default ChangePassword;

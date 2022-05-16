import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "../../../Components/UI/Home_UI/Logout";
import Notifications from "../../../Components/UI/Home_UI/Notifications";
import "./TopNav.css";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";

const TopNav = () => {
  const navigate = useNavigate();
  document.body.style = "background: white";
  const [showNotif, setShowNotif] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [message, setMessages] = useState(false);

  const tokenContent = jwtDecode(localStorage.getItem("token"));
  if (tokenContent.user.userType !== "Admin") {
    navigate("/homepage");
  }

  return (
    <div className="admin-top-navigation">
      <h1 className="title-message">Grade Completion System</h1>
      <span>
        <img
          alt="profile-icon"
          src={require("../../../Components/UI/Home_UI/Icons/profile.png")}
          id="admin-profile-icon"
        />
        <div className="admin-name-type">
          <span style={{ textDecoration: "none" }}>
            <p id="admin-user-name">{tokenContent.user.fullName}</p>
            <p id="admin-user-type">Admin</p>
          </span>
        </div>
      </span>
      <img
        onClick={() => {
          setDropDown(false);
          setShowNotif(false);
          setMessages((prevState) => !prevState);
        }}
        alt="message-icon"
        src={require("../../../Components/UI/Home_UI/Icons/Message.png")}
        id="admin-message-icon"
      />
      {message && (
        <div>
          SHOULD I PUT MESSAGES IN ADMIN????? <br /> IS THERE EVEN A WAY TO
          CONTACT ADMIN???????
        </div>
      )}
      <img
        onClick={() => {
          setDropDown(false);
          setShowNotif((prevState) => !prevState);
          setMessages(false);
        }}
        alt="notif-icon"
        src={require("../../../Components/UI/Home_UI/Icons/Bell.png")}
        id="admin-notify-bell"
      />
      {showNotif && <Notifications />}
      <img
        onClick={() => {
          Swal.fire({
            title: 'Logout',
            text: "Are you sure you want to Logout?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
          }).then((result) => {
            if (result.isConfirmed) {
              setDropDown((state) => !state);
              setShowNotif(false);
              setMessages(false);
              localStorage.removeItem("token");
              navigate("/");
            }
          })

        }}
        alt="dropdown-icon"
        src={require("../../../Components/UI/Home_UI/Icons/logout-icon.png")}
        id="admin-dropdown-icon"
      />
      {dropDown && <Logout admin={true} />}
    </div>
  );
};

export default TopNav;

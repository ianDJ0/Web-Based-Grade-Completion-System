import { useNavigate } from "react-router-dom";
import "./TopNav.css";

const TopNav = () => {
  const navigate = useNavigate();
  document.body.style = "background: white";
  return (
    <div className="admin-top-navigation">
      <input
        onChange={(e) => console.log(e.target.value)}
        placeholder="Search..."
        id="admin-search-bar"
      />
      <button
        onClick={() => {
          alert("Click");
        }}
        id="admin-search-btn"
      ></button>
      <span
        onClick={() => {
          navigate("/admin/profile");
        }}
      >
        <img
          alt="profile-icon"
          src={require("../../../Components/UI/Home_UI/Icons/profile.png")}
          id="admin-profile-icon"
        />
        <div className="admin-name-type">
          <span style={{ textDecoration: "none" }}>
            <p id="admin-user-name">Ms. Admin</p>
            <p id="admin-user-type">Admin</p>
          </span>
        </div>
      </span>
      <img
        onClick={() => {
          alert("Click");
        }}
        alt="message-icon"
        src={require("../../../Components/UI/Home_UI/Icons/Message.png")}
        id="admin-message-icon"
      />
      <img
        onClick={() => {
          alert("Click");
        }}
        alt="notif-icon"
        src={require("../../../Components/UI/Home_UI/Icons/Bell.png")}
        id="admin-notify-bell"
      />
      <img
        onClick={() => {
          alert("Click");
        }}
        alt="dropdown-icon"
        src={require("../../../Components/UI/Home_UI/Icons/dropdown.png")}
        id="admin-dropdown-icon"
      />
    </div>
  );
};

export default TopNav;

import TopNav from "../../UI/Home_UI/TopNav";
import Sidebar from "../../UI/Home_UI/Sidebar";
import { useNavigate } from "react-router-dom";
import "./StudentProfile.css";

function StudentProfile() {
  const navigate = useNavigate();
  return (
    <>
      <TopNav />
      <Sidebar active={""} />
      <div className="user-profile">
        <div className="profile-header">
          <button
            id="edit-profile"
            onClick={() => {
              navigate("/account/edit-account");
            }}
          >
            Edit Profile
          </button>
          <button
            id="change-password"
            onClick={() => {
              navigate("/account/change-password");
            }}
          >
            Change Password
          </button>
          <img
            src={require("../../UI/Home_UI/Icons/image-wallpaper-15.jpg")}
            id="profile-picture"
            alt="wallpaper-img"
          />
          <div id="user-details">
            <p id="name-of-user">John Doe</p>
            <p id="user-account-type">Student</p>
            <p id="user-number">2018-1234567</p>
          </div>
          <div id="vertical-line"></div>
          <div className="user-profile-email">
            <p>Email</p>
            <p id="profile-email">johndoe@gmail.com</p>
          </div>
          <div className="user-profile-number">
            <p>Contact Number</p>
            <p id="profile-number">09123456789</p>
          </div>
          <div className="user-profile-bday">
            <p>Birthday</p>
            <p id="profile-bday">January 1, 1968</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentProfile;

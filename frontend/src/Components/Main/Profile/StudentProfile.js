import TopNav from "../../UI/Home_UI/TopNav";
import { useContext } from "react";
import TokenCheck from "../../Shared/Auth";
import Sidebar from "../../UI/Home_UI/Sidebar";
import { AuthenticationContext } from "../../Shared/context/auth-context";
import "./StudentProfile.css";

function StudentProfile() {
  const auth= useContext(AuthenticationContext);
  TokenCheck();
  return (
    <>
      <TopNav />
      <TokenCheck />
      <Sidebar active={""} />
      <div className="user-profile">
        <div className="profile-header">
          <button id="edit-profile">Edit Profile</button>
          <img
            src={require("../../UI/Home_UI/Icons/image-wallpaper-15.jpg")}
            id="profile-picture"
            alt="wallpaper-img"
          />
          {/* <img src="Icons/image-wallpaper-15.jpg" id="profile-picture" /> */}
          <div id="user-details">
            <p id="name-of-user">{auth.userFullName}</p>
            <p id="user-account-type">{auth.userType}</p>
            {auth.userType === "Student" &&
              <p id="user-number">{auth.userStudentNumber}</p>
            }
            
          </div>
          <div id="vertical-line"></div>
          <div className="user-profile-email">
            <p>Email</p>
            <p id="profile-email">{auth.userEmail}</p>
          </div>
          <div className="user-profile-number">
            <p>Contact Number</p>
            <p id="profile-number">{auth.userContactNumber}</p>
          </div>
          <div className="user-profile-bday">
            <p>Birthday</p>
            <p id="profile-bday">{auth.userBirthday}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentProfile;

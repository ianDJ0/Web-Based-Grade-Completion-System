import TopNav from "../../UI/Home_UI/TopNav";
import { useContext } from "react";
import TokenCheck from "../../Shared/Auth";
import Sidebar from "../../UI/Home_UI/Sidebar";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../Shared/context/auth-context";
import "./StudentProfile.css";

const StudentProfile = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthenticationContext);
  const DATE_OPTIONS = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  TokenCheck();
  return (
    <>
      <TopNav />
      <TokenCheck />
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
          {/* {console.log(auth.userProfilePic)} */}
          {auth.userProfilePic === "" && (
            <img
              src={require("../../UI/Home_UI/Icons/image-wallpaper-15.jpg")}
              id="profile-picture"
              alt="wallpaper-img"
            />
          )}
          {auth.userProfilePic !== "" && (
            <img
              src={`http://localhost:7700/${auth.userProfilePic}`}
              id="profile-picture"
              alt="user-img"
            />
          )}
          <div id="user-details">
            <p id="name-of-user">{auth.userFullName}</p>
            <p id="user-account-type">{auth.userType}</p>
            {auth.userType === "Student" && (
              <p id="user-number">{auth.userStudentNumber}</p>
            )}
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
            <p id="profile-bday">
              {new Date(auth.userBirthday).toLocaleDateString(
                "en-US",
                DATE_OPTIONS
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentProfile;

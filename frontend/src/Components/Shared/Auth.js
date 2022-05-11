import { useContext } from "react";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { AuthenticationContext } from "./context/auth-context";

const TokenCheck = () => {
  const auth = useContext(AuthenticationContext);
  const token = localStorage.getItem("token");

  if (localStorage.getItem("announcements") === null) {
    axios
      .post("http://localhost:7700/api/announcements/announcement")
      .then((response) => {
        let content = JSON.stringify(response.data);
        localStorage.setItem("announcements", content);
      })
      .catch((err) => {
        alert(err);
      });
  }
  if (token === "undefined") {
    localStorage.removeItem("token");
  }
  if (token) {
    const tokenContent = jwtDecode(token);
    auth.isLoggedIn = true;
    auth.userId = tokenContent.user.id;
    auth.userEmail = tokenContent.user.email;
    auth.userFullName = tokenContent.user.fullName;
    auth.userContactNumber = tokenContent.user.contactNumber;
    auth.userSignature = tokenContent.user.image;
    auth.userProfilePic = tokenContent.user.profilePicture
      ? tokenContent.user.profilePicture
      : "";
    auth.userBirthday = tokenContent.user.birthday;
    auth.userType = tokenContent.user.userType;
    auth.userVerified = tokenContent.user.verified;
    if (auth.userType === "Student") {
      auth.userStudentNumber = tokenContent.user.studentNumber;
      auth.userCourseYearAndSection = tokenContent.user.yearAndSection;
    }
    if (auth.userType === "Faculty" && tokenContent.user.verified) {
      
    }
  } else {
    return <Navigate to="/" />;
  }
};
export default TokenCheck;

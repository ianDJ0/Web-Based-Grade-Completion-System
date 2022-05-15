import React, { useContext, useState } from "react";
import Sidebar from "../../UI/Home_UI/Sidebar";
import TopNav from "../../UI/Home_UI/TopNav";
import { AuthenticationContext } from "../../Shared/context/auth-context";
import "./Tutorial.css";
import StudentTutorial from "./StudentTutorial";
import FacultyRequest from "./FacultyRequest";
import TutorialEditProfile from "./TutorialEditProfile";
import TutorialChangePassword from "./TutorialChangePassword";

const Tutorial = () => {
  const auth = useContext(AuthenticationContext);
  const [choice, setChoice] = useState("pass");

  const pick3r =
    auth.userType === "Student" ? (
      <div
        className={`picker-choice ${
          choice === "studRequest" ? "active-pick" : ""
        }`}
        onClick={() => {
          setChoice("studRequest");
        }}
      >
        Making Request
      </div>
    ) : (
      <div
        className={`picker-choice ${
          choice === "facRequest" ? "active-pick" : ""
        }`}
        onClick={() => {
          setChoice("facRequest");
        }}
      >
        Managing Requests
      </div>
    );
  return (
    <>
      <TopNav />
      <Sidebar active={"tutorial"} />

      <div className="tutorial-home">
        <div className="picker">
          <div
            className={`picker-choice ${
              choice === "pass" ? "active-pick" : ""
            }`}
            onClick={() => {
              setChoice("pass");
            }}
          >
            Change Password
          </div>
          <div
            className={`picker-choice ${
              choice === "profile" ? "active-pick" : ""
            }`}
            onClick={() => {
              setChoice("profile");
            }}
          >
            Edit Profile
          </div>
          {pick3r}
        </div>
        {choice === "pass" && <TutorialChangePassword/>}
        {choice === "profile" && <TutorialEditProfile />}
        {choice === "studRequest" && <StudentTutorial />}
        {choice === "facRequest" && <FacultyRequest />}
      </div>
    </>
  );
};
export default Tutorial;

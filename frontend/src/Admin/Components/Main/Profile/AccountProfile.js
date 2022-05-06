import Body from "../../UI/Containers/Body";
import Profile from "../../UI/Profile";
import Sidebar from "../../UI/Sidebar";
import TopNav from "../../UI/TopNav";
import "./AccountProfile.css";
import InstructorRequests from "./InstructorRequests";
import StudentRequests from "./StudentRequests";
import { useLocation } from "react-router-dom";

const AccountProfile = () => {
  const {state}= useLocation();
  return (
    <>
      <Sidebar />
      <TopNav />
      <Body>
        <div className="instructor-profile">
          <div id="bulsu-header">
            {state.user.userType === "Faculty" ? (
              <button id="verify-instructor"> Verify Instructor</button>
            ) : null}

            <Profile
              name={state.user.fullName}
              img={state.user.profilePicture?`http://localhost:7700/${state.user.profilePicture}`:require("../../../../Components/UI/Home_UI/Icons/image-wallpaper-15.jpg")}
              college={"College of Information and Communications Technology"}
            />

            <div className="instructor-email">
              <p>Email</p>
              <p id="instructor-email">{state.user.email}</p>
            </div>
            <div className="instructor-number">
              <p>Contact Number</p>
              <p id="instructor-number">{state.user.contactNumber}</p>
            </div>
            <div className="instructor-bday">
              <p>Birthday</p>
              <p id="instructor-bday">{state.user.birthday}</p>
            </div>

            {/** */}
            {state.user.userType === "Faculty" ? (
              <InstructorRequests intructor={state.user._id} />
            ) : (
              <StudentRequests student={state.user._id} />
            )}
          </div>
        </div>
      </Body>
    </>
  );
};

export default AccountProfile;

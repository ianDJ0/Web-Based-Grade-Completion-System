import Body from "../../UI/Containers/Body";
import Profile from "../../UI/Profile";
import Sidebar from "../../UI/Sidebar";
import TopNav from "../../UI/TopNav";
import "./AccountProfile.css";
import InstructorRequests from "./InstructorRequests";
import StudentRequests from "./StudentRequests";

const AccountProfile = () => {
  const accountType = "faculty";
  return (
    <>
      <Sidebar />
      <TopNav />
      <Body>
        <div className="instructor-profile">
          <div id="bulsu-header">
            {accountType === "faculty" ? (
              <button id="verify-instructor"> Verify Instructor</button>
            ) : null}

            <Profile
              name={"Aaron Paul Dela Rosa"}
              img={require("../../../../Components/UI/Home_UI/Icons/image-wallpaper-15.jpg")}
              college={"College of Information and Communications Technology"}
            />

            <div className="instructor-email">
              <p>Email</p>
              <p id="instructor-email">delarosa@gmail.com</p>
            </div>
            <div className="instructor-number">
              <p>Contact Number</p>
              <p id="instructor-number">09123456789</p>
            </div>
            <div className="instructor-bday">
              <p>Birthday</p>
              <p id="instructor-bday">January 1, 1968</p>
            </div>

            {/** */}
            {accountType === "faculty" ? (
              <InstructorRequests intructor={"instructor name"} />
            ) : (
              <StudentRequests student={"student name"} />
            )}
          </div>
        </div>
      </Body>
    </>
  );
};

export default AccountProfile;

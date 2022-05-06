import Body from "../../UI/Containers/Body";
import Profile from "../../UI/Profile";
import Sidebar from "../../UI/Sidebar";
import TopNav from "../../UI/TopNav";
import "./AccountProfile.css";
import InstructorRequests from "./InstructorRequests";
import StudentRequests from "./StudentRequests";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useState } from "react";
const AccountProfile = () => {

  const { state } = useLocation();
  const [update, setUpdate] = useState(true);

  return (
    <>
      <Sidebar />
      <TopNav />
      <Body>
        <div className="instructor-profile">
          <div id="bulsu-header">
            {state.user.userType === "Faculty" && state.user.verified === false && update ? (
              <button id="verify-instructor" onClick={() => {
                Swal.fire({
                  title: 'Are you sure?',
                  text: "You won't be able to revert this!",
                  icon: 'info',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Verify User!'
                }).then((result) => {
                  if (result.isConfirmed) {
                    axios.post("http://localhost:7700/api/users/verifyUser", {
                      userID: state.user._id
                    }, {
                      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                    }).then((response) => {
                      setUpdate(!update);
                    }).catch((error) => {
                      alert(error);
                    })
                    Swal.fire(
                      'Sucess!',
                      'User has been Verified',
                      'success'
                    )
                  }
                })

              }}> Verify Instructor</button>
            ) : null}

            <Profile
              name={state.user.fullName}
              img={state.user.profilePicture ? `http://localhost:7700/${state.user.profilePicture}` : require("../../../../Components/UI/Home_UI/Icons/image-wallpaper-15.jpg")}
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

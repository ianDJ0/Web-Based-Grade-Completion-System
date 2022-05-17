import { useNavigate, useParams } from "react-router-dom";
import React, { useContext, useState } from "react";
import { AuthenticationContext } from "../../Shared/context/auth-context";
import { RequestContent } from "../../Shared/context/request-context";
import { MessageContext } from "../../Shared/message-context";

import TokenCheck from "../../Shared/Auth";
import TopNav from "../../UI/Home_UI/TopNav";
import Sidebar from "../../UI/Home_UI/Sidebar";
import "./FacultyProfile.css";
import axios from "axios";

const FacultyProfile = (props) => {
  TokenCheck();
  const DATE_OPTIONS = {
    year: "numeric",
    month: "short",
    day: "numeric",
  }

  const auth = useContext(AuthenticationContext);
  const requestInfo = useContext(RequestContent);
  const mesContext = useContext(MessageContext);

  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  const [image, setImage] = useState(false);
  const [facultyInfo, setFacultyInfo] = useState({
    profilePicture: "",
    _id: "",
    fullName: "",
    email: "",
    contactNumber: "",
    birthday: "",
  });

  if (id !== facultyInfo._id) {
    axios
      .get(`http://localhost:7700/api/users/findUser/${id}`)
      .then((response) => {
        setFacultyInfo(response.data);
        if (response.data.profilePicture) {
          setImage(true)
        } else {
          setImage(false)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <TopNav />
      <Sidebar active={""} />

      <div className="search-faculty-profile">
        <div id="bulsu-header">
          {auth.userType !== "Faculty" &&
            <button
              id="request-faculty"
              onClick={() => {
                requestInfo.request_InstructorId = "";
                navigate("/request/form", {
                  state: { autoInstructor: facultyInfo },
                });
              }}
            >
              Request Completion Form
            </button>
          }
          <button
            id="send-msg"
            onClick={() => {
              mesContext.passFacultyID = facultyInfo._id;
              mesContext.passFacultyName = facultyInfo.fullName;
              mesContext.openBox();
            }}
          >
            Message
          </button>
          <div id="search-faculty-profile">

            {!image &&
              <img
                alt={"default-img"}
                src={require("../../UI/Home_UI/Icons/image-wallpaper-15.jpg")}
                id="search-faculty-img"
              />}
            {image &&
              <img
                alt={"wallpaper-img"}
                src={`http://localhost:7700/${facultyInfo.profilePicture}`}
                id="search-faculty-img"
              />
            }
            <p id="search-faculty-name">{facultyInfo.fullName}</p>
            <p id="search-faculty-college">
              College of Information and Communications Technology
            </p>
          </div>
          <div className="search-faculty-email">
            <p>Email</p>
            <p id="search-email">{facultyInfo.email}</p>
          </div>
          <div className="search-faculty-number">
            <p>Contact Number</p>
            <p id="search-number">{facultyInfo.contactNumber}</p>
          </div>
          <div className="search-faculty-bday">
            <p>Birthday</p>
            <p id="search-bday">{new Date(facultyInfo.birthday).toLocaleDateString(
                "en-US",
                DATE_OPTIONS
              )}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default FacultyProfile;

import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import TokenCheck from "../../Shared/Auth";
import TopNav from "../../UI/Home_UI/TopNav";
import Sidebar from "../../UI/Home_UI/Sidebar";
import "./FacultyProfile.css";
import axios from "axios";

const FacultyProfile = (props) => {
  TokenCheck();
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [facultyInfo, setFacultyInfo] = useState({
    _id: "",
    fullName: "",
    email: "",
    contactNumber: "",
    birthday: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:7700/api/users/findUser/${id}`)
      .then((response) => {
        setFacultyInfo(response.data);
        if (id !== response.data.id) {
          setLoad(!load);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [load]);

  return (
    <>
      <TopNav />
      <Sidebar active={""} />

      <div className="search-faculty-profile">
        <div id="bulsu-header">
          <button
            id="request-faculty"
            onClick={() => {
              navigate("/request/form");
            }}
          >
            Request Completion Form
          </button>
          <button
            id="send-msg"
            onClick={() => {
              alert("message click");
            }}
          >
            Message
          </button>
          <div id="search-faculty-profile">
            <img
              alt={"wallpaper-img"}
              src={require("../../UI/Home_UI/Icons/image-wallpaper-15.jpg")}
              id="search-faculty-img"
            />
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
            <p id="search-bday">{facultyInfo.birthday}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default FacultyProfile;

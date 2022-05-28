import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Sidebar.css";
import axios from "axios";

const Sidebar = (props) => {
  const navigate = useNavigate();
  const [logo, setLogo] = useState('uploads\\images\\bulsu-logo.png');
  const [title, setTitle] = useState();

  axios.post('http://localhost:7700/api/announcements/getVMGO')
    .then(response => {
      setLogo(response.data.logo);
      setTitle(response.data.name);

    }).catch(error => {
      alert(error)
    })
  return (
    <div className="admin-sidebar">
      <div className="admin-name-logo">
        {logo ?
          <img
            alt="bulsu-logo"
            src={`http://localhost:7700/${logo}`}
            id="sidebar-bulsu-logo"
          />
          :
          <image
            alt="bulsu-logo"
            src={require("../../../Components/UI/Home_UI/Icons/profile.png")}
            id="sidebar-bulsu-logo"
          />
        }
        <h3 id="admin-site-name">{title}</h3>
        <br />
      </div>

      <span
        className={` ${props.active === "dashboard" ? "active" : ""}`}
        id="nav-dashboard"
        onClick={() => {
          navigate("/admin");
        }}
      >
        <i className="fa fa-tachometer"></i>
        <div className="title"> Dashboard </div>
      </span>

      <span
        className={` ${props.active === "instructor" ? "active" : ""}`}
        onClick={() => {
          navigate("/admin/faculty");
        }}
      >
        <i className="fa fa-user"></i>
        <div className="title"> Instructors</div>
      </span>

      <span
        className={` ${props.active === "student" ? "active" : ""}`}
        onClick={() => {
          navigate("/admin/student");
        }}
      >
        <i className="fa fa-users"></i>
        <div className="title"> Students </div>
      </span>

      <span
        className={` ${props.active === "request" ? "active" : ""}`}
        onClick={() => {
          navigate("/admin/request");
        }}
      >
        <i className="fa fa-envelope"></i>
        <div className="title"> Requests </div>
      </span>
    </div>
  );
};

export default Sidebar;

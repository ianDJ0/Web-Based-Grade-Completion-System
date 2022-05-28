import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../Shared/Shared.css";
import "./SideBar.css";

const Sidebar = (props) => {
  const active = props.active;
  const [logo, setLogo] = useState('uploads\\images\\bulsu-logo.png');
  const [title, setTitle] = useState();

  axios.post("http://localhost:7700/api/announcements/getVMGO")
  .then(response => {
    setLogo(response.data.logo);
    setTitle(response.data.name);

  }).catch(error => {
    alert(error)
  })
  const navigate = useNavigate();
  document.body.style = "background: white";

  return (
    <>
      <div className="sidebar">
        <div className="name-logo">
          <img
            alt="bulsu-logo"
            src={`http://localhost:7700/${logo}`}
            id="bulsu-logo"
          />
          <h3 id="site-name">{title}</h3>
        </div>
        <span
          id="home-nav"
          className={active === "homepage" ? "active" : ""}
          onClick={() => {
            navigate("/homepage");
          }}
        >
          Home
        </span>
        <span
          id="speak-nav"
          className={active === "announcements" ? "active" : ""}
          onClick={() => {
            navigate("/announcements");
          }}
        >
          Announcements
        </span>
        <span
          id="req-nav"
          className={active === "requests" ? "active" : ""}
          onClick={() => {
            navigate("/requests");
          }}
        >
          Requests
        </span>
        <span
          id="tutorial-nav"
          className={active === "tutorial" ? "active" : ""}
          onClick={() => {
            navigate("/tutorial");
          }}
        >
          Tutorial
        </span>
      </div>
    </>
  );
};
export default Sidebar;

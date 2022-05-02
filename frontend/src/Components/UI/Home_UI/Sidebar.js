import React from "react";
import { useNavigate } from "react-router-dom";

import "../../Shared/Shared.css";
import "./SideBar.css";

const Sidebar = (props) => {
  const active = props.active;

  const navigate = useNavigate();
  document.body.style = "background: white";

  return (
    <>
      <div className="sidebar">
        <div className="name-logo">
          <img
            alt="bulsu-logo"
            src={"https://bit.ly/3rmsS90"}
            id="bulsu-logo"
          />
          <h3 id="site-name">BULSU</h3>
        </div>
        <span
          //   href="/#"
          id="home-nav"
          className={active === "homepage" ? "active" : ""}
          onClick={() => {
            navigate("/homepage");
          }}
        >
          Home
        </span>
        <span
          //   href="/#"
          id="speak-nav"
          className={active === "announcements" ? "active" : ""}
          onClick={() => {
            navigate("/announcements");
          }}
        >
          Announcements
        </span>
        <span
          //   href={"requests(student).html"}
          id="req-nav"
          className={active === "requests" ? "active" : ""}
          onClick={() => {
            navigate("/requests");
          }}
        >
          Requests
        </span>
        <span
          //   href="/#"
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

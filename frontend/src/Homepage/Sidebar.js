import React from "react";
import "./navigation.css";

const Sidebar = (props) => {
  const active = props.active;
  return (
    <div className="sidebar">
      <div className="name-logo">
        <img src={"https://bit.ly/3rmsS90"} alt="logo" id="bulsu-logo" />
        <h3 id="site-name">BULSU</h3>
      </div>
      <a
        href="/#"
        id="home-nav"
        className={active === "homepage" ? "active" : ""}
      >
        Home
      </a>
      <a
        href="/#"
        id="speak-nav"
        className={active === "announcement" ? "active" : ""}
      >
        Announcement
      </a>
      <a
        href="/#"
        id="req-nav"
        className={active === "requests" ? "active" : ""}
      >
        Requests
      </a>
      <a
        href="/#"
        id="tutorial-nav"
        className={active === "tutorial" ? "active" : ""}
      >
        Tutorial
      </a>
    </div>
  );
};
export default Sidebar;

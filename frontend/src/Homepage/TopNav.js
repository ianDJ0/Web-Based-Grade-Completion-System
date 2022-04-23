import React, { useState } from "react";

const TopNav = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="top-navigation">
      <input
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
        placeholder="Search for Instructor..."
        id="search-bar"
      />
      <button id="search-btn"></button>
      <img
        alt="profile-icon"
        src={require("./Icons/profile.png")}
        id="profile-icon"
      />
      <div className="name-type">
        <a href="/#" style={{ textDecoration: "none" }}>
          <p id="user-name">Jane Doe</p>
          <p id="user-type">Student</p>
        </a>
      </div>
      <img
        alt="message-icon"
        src={require("./Icons/Message.png")}
        id="message-icon"
      />
      <img
        alt="notification-icon"
        src={require("./Icons/Bell.png")}
        id="notify-bell"
      />
      <img
        alt="dropdown-icon"
        src={require("./Icons/dropdown.png")}
        id="dropdown-icon"
      />
    </div>
  );
};
export default TopNav;

import React, { useState, useContext } from "react";

import "../../Shared/Shared.css";
import "./TopNav.css";
import { AuthenticationContext } from "../../Shared/context/auth-context";

const TopNav = (props) => {
const [query, setQuery] = useState("");
const auth = useContext(AuthenticationContext);
  return (
    <div className="top-navigation">
      <input
        placeholder="Search for Instructor..."
        id="search-bar"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      />
      <button id="search-btn"></button>
      <img
        alt="icon-profile"
        src={require("./Icons/profile.png")}
        id="profile-icon"
      />
      <div className="name-type">
        <span>
          <p id="user-name">{auth.userFullName}</p>{" "}
          {/** will prolly use useNavigate/useLocation to set values here, or dependes on how the backend works */}
          <p id="user-type">{auth.userType}</p>
        </span>
      </div>
      <img
        alt="icon-message"
        src={require("./Icons/Message.png")}
        id="message-icon"
      />
      <img
        alt="icon-notification"
        src={require("./Icons/Bell.png")}
        id="notify-bell"
      />
      <img
        alt="icon-dropdown"
        src={require("./Icons/dropdown.png")}
        id="dropdown-icon"
      />
    </div>
  );
};
export default TopNav;

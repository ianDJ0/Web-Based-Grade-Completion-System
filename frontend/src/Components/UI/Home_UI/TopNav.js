import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../../Shared/Shared.css";
import "./TopNav.css";
import { AuthenticationContext } from "../../Shared/context/auth-context";
import TokenCheck from "../../Shared/Auth";
const TopNav = (props) => {
  const [query, setQuery] = useState("");
  const auth = useContext(AuthenticationContext);

  const navigate = useNavigate();
  const profileHandler = () => {
    navigate("/profile");
  };

  return (
    <>
      <AuthenticationContext.Provider value={auth}>
      <TokenCheck />
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
          onClick={profileHandler}
        />
        <div className="name-type" onClick={profileHandler}>
          <span>
            <p id="user-name">{auth.userFullName}</p>{" "}
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
      </AuthenticationContext.Provider>
    </>);

};
export default TopNav;

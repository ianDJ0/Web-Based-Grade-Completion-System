import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../Shared/Shared.css";
import "./TopNav.css";
import { AuthenticationContext } from "../../Shared/context/auth-context";
import TokenCheck from "../../Shared/Auth";
import Notifications from "./Notifications";
import Logout from "./Logout";
import Messages from "./Messages";
import MessageBox from "./MessageBox";
const TopNav = (props) => {
  const [query, setQuery] = useState("");
  const [query2, setQuery2] = useState("");
  const auth = useContext(AuthenticationContext);
  const [search, setSearch] = useState(["User is not Registered"]);

  const navigate = useNavigate();
  const profileHandler = () => {
    navigate("/profile");
  };
  const [dropDown, setDropDown] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [messages, setMessages] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const [suggestionView, setSuggestionView] = useState(false);
  useEffect(() => {
    axios
      .post("http://localhost:7700/api/request/notifications", {
        userID: auth.userId,
      })
      .then((response) => {
        setNotifications(response.data);
      })
      .catch((error) => {
        alert("GET NOTIFICATIONS", error);
      });
  }, []);
  // const notifRef = useRef();
  // const dropRef = useRef();
  // useEffect(() => {
  //   if (showNotif) notifRef.current.focus();
  //   if (dropRef) dropRef.current.focus();
  // }, [showNotif, dropDown]);

  const [chatBox, setBox] = useState(false);

  const messageClickHandler = () => {
    setMessages((prev) => !prev);
    setBox(true);
  };

  return (
    <>
      <AuthenticationContext.Provider value={auth}>
        <TokenCheck />
        <div className="top-navigation">
          <input
            onBlur={() => {
              setQuery(query2);
              setSuggestionView(false);
            }}
            onFocus={() => {
              setSuggestionView(true);
            }}
            placeholder="Search for Instructor..."
            id="search-bar"
            value={query}
            onChange={(event) => {
              if (event.target.value.trim().length > 0) setSuggestionView(true);
              setQuery(event.target.value);
              setQuery2(event.target.value);
              if (event.target.value.length !== 0)
                axios
                  .post(`http://localhost:7700/api/users/type`, {
                    uType: "Faculty",
                    findInName:
                      event.target.value.length === null
                        ? "zyqqyx"
                        : event.target.value,
                  })
                  .then((response) => {
                    setSearch(response.data);
                  })
                  .catch((err) => {
                    alert(err);
                  });
              else {
                setSearch([]);
              }
            }}
          />
          {/* <button id="search-btn"></button> */}
          <img
            alt="icon-profile"
            src={require("./Icons/profile.png")}
            id="profile-icon"
            onClick={profileHandler}
          />
          {/* dito yung div ng mga searched instructor */}
          {search.length !== 0 && search[0] !== "User is not Registered" && (
            <div
              className={`suggestion-list ${suggestionView ? "show" : "hide"}`}
            >
              {search.map((faculty) => {
                return (
                  <p
                    className="suggestions"
                    key={faculty._id}
                    onMouseDown={(event) => {
                      navigate(`/search/${faculty._id}`);
                    }}
                    onMouseEnter={(e) => {
                      setQuery(e.target.innerText); //could be remove tbh
                    }}
                  >
                    {faculty.fullName}
                  </p>
                );
              })}
            </div>
          )}
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
            onClick={() => {
              setMessages((prev) => !prev);
              setDropDown(false);
              setShowNotif(false);
            }}
          />
          {messages && <Messages onMessage={messageClickHandler} />}
          <img
            alt="icon-notification"
            src={require("./Icons/Bell.png")}
            id="notify-bell"
            onClick={() => {
              setShowNotif((prev) => !prev);
              setDropDown(false);
              setMessages(false);
            }}
          />
          {showNotif && <Notifications notificationProps={notifications} />}
          <img
            alt="icon-dropdown"
            src={require("./Icons/dropdown.png")}
            id="dropdown-icon"
            onClick={() => {
              setDropDown((prevState) => !prevState);
              setShowNotif(false);
            }}
          />

          {dropDown && (
            <Logout admin={false} />
            // <div
            //   className="dropdown-content"
            //   // ref={dropRef}
            // >
            //   <li
            //     onClick={() => {
            //       navigate("/account/edit-account");
            //     }}
            //   >
            //     <span id="edit-profile-nav">Edit Profile </span>
            //     <i
            //       className="fa fa-pencil-square-o edit-profile-icon space"
            //       aria-hidden="true"
            //     ></i>
            //   </li>
            //   <hr />
            //   <li onClick={logoutHandler}>
            //     <span id="logout-profile">Logout </span>
            //     <i
            //       className="fa fa-sign-out logout-icon space"
            //       aria-hidden="true"
            //     ></i>
            //   </li>
            // </div>
          )}
        </div>
        {chatBox && (
          <MessageBox
            closeChat={() => {
              setBox(false);
            }}
          />
        )}
      </AuthenticationContext.Provider>
    </>
  );
};
export default TopNav;

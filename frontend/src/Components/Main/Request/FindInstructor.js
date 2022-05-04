import React, { useContext } from "react";
import { RequestContent } from "../../Shared/context/request-context";
// import axios from "axios";
import "./FindInstructor.css";

const FindInstructor = (props) => {
  const requestContent = useContext(RequestContent);
  let getData = Array.from(props.searchFac);
  if (props.autoSearch && props.autoSearch !== "a") {
    requestContent.request_InstructorId = props.autoSearch._id;
    requestContent.request_InstructorName = props.autoSearch.fullName;
    props.insertInstructor(props.autoSearch.fullName);
  }
  //   let visible;
  //   if (getData.length === 0) {
  //     visible = "none";
  //   } else {
  //     visible = "block";
  //   }
  const display = props.componentIsVisible ? "block" : "none";
  return (
    <div
      style={{ display: display }}
      //   style={{ display: visible }}
      className={`${
        getData[0] === "User is not Registered" ? "" : "find-instructor"
      }`}
    >
      {getData.length > 0 &&
        getData.map((person, index) => {
          return (
            <li
              key={index}
              className="instructor-suggestions"
              onMouseDown={(event) => {
                event.preventDefault();
                requestContent.request_InstructorId = person._id;
                requestContent.request_InstructorName = person.fullName;
                props.insertInstructor(requestContent.request_InstructorName);
              }}
            >
              {person.fullName}
            </li>
          );
        })}
    </div>
  );
};

export default FindInstructor;

import React, { useState, useContext } from "react";
import "./RequestInfo.css";
import FindInstructor from "./FindInstructor";
import { RequestContent } from "../../Shared/context/request-context";
import axios from "axios";

const RequestInfo = (props) => {
  const [search, setSearch] = useState(["User is not Registered"]);
  const [visible, setVisible] = useState(false);
  const [instructor, setInstructor] = useState("");

  const [startYr, setStartYr] = useState(2015);
  const [endYr, setEndYr] = useState(2015);
  const [err, setErr] = useState(false);

  let auto;
  const requestContent = useContext(RequestContent);
  if (requestContent.request_InstructorId) {
    auto = "a";
  }
  if (props && auto !== "a") {
    auto = props.autoInt;
  }

  const errMsg = <div id="err">End year cannot be lower than start year.</div>;

  return (
    <div className="request-info">
      <p id="request-info-label">Request Information</p>
      <div className="request-info-one">
        <p htmlFor="request-fac">Faculty Name</p>
        {instructor && (
          <div className="added-Instructor">
            {/* <p htmlFor="request-fac">{instructor}</p> */}
            <input
              name="request-fac"
              id="request-fac"
              type="text"
              value={instructor}
              readOnly
            />
            <button
              className="faculty-remove-btn"
              onClick={() => {
                setInstructor("");
                setSearch(["User is not Registered"]);
              }}
            >
              Remove
            </button>
          </div>
        )}
        {instructor.length < 3 && (
          <div className="search-Faculty">
            <input
              onBlur={() => {
                setVisible(false);
              }}
              onFocus={() => {
                setVisible(true);
              }}
              placeholder="Search for Faculty"
              name="request-fac"
              id="request-fac"
              onChange={(e) => {
                if (e.target.value)
                  axios
                    .post(`http://localhost:7700/api/users/type`, {
                      uType: "Faculty",
                      findInName:
                        e.target.value === null ? "zyqqyx" : e.target.value,
                    })
                    .then((response) => {
                      setSearch(response.data);
                    })
                    .catch((err) => {
                      alert(err);
                    });
                if (e.target.value.trim().length > 0) {
                  setVisible(true);
                } else {
                  setVisible(false);
                }
                // if (e.target.value === "") {
                //   setVisible(true);
                // } else {
                //   setVisible(false);
                // }
              }}
            />
            <FindInstructor
              componentIsVisible={visible}
              searchFac={search}
              autoSearch={auto}
              insertInstructor={(insertI) => {
                setInstructor(insertI);
              }}
            />
          </div>
        )}
      </div>
      <div className="request-info-two">
        <p htmlFor="request-subj-code">Subject Code</p>
        <input
          placeholder="Subject Code"
          name="request-subj-code"
          id="request-subj-code"
          onChange={(e) => {
            requestContent.request_SubjectCode = e.target.value;
          }}
        />
      </div>
      <div className="request-info-three">
        <p htmlFor="request-subj-desc">Subject Description</p>
        <input
          placeholder="Subject Description"
          name="request-subj-desc"
          id="request-subj-desc"
          onChange={(e) => {
            requestContent.request_SubjectDescription = e.target.value;
          }}
        />
      </div>
      <div className="request-info-four">
        <p htmlFor="request-subj-sem">Subject Semester</p>
        <input
          placeholder="Subject Semester"
          name="request-subj-sem"
          id="request-subj-sem"
          onChange={(e) => {
            requestContent.request_SemesterIncomplete = e.target.value;
          }}
        />
      </div>
      <div className="request-info-five">
        <p>Subject Year</p>
        <div id="subject-year-container">
          <input
            type="number"
            min="2015"
            placeholder="Start Year"
            name="request-subj-year"
            id="request-subj-year"
            onChange={(e) => {
              setStartYr(e.target.value);
              requestContent.request_YearIncomplete = startYr + "-" + endYr;
            }}
            onBlur={() => {
              const cond = startYr > endYr ? true : false;
              setErr(cond);
              requestContent.request_YearIncomplete = startYr + "-" + endYr;
            }}
            value={startYr}
          />
          <input
            type="number"
            min={startYr}
            placeholder="End Year"
            name="request-subj-year"
            id="request-end-year"
            onChange={(e) => {
              setEndYr(e.target.value);
              requestContent.request_YearIncomplete = startYr + "-" + endYr;
            }}
            onBlur={() => {
              const cond = startYr > endYr ? true : false;
              setErr(cond);
              requestContent.request_YearIncomplete = startYr + "-" + endYr;
            }}
            value={endYr}
          />
        </div>
        {err && errMsg}
      </div>
      <div className="request-info-six">
        <p htmlFor="request-reason" id="request-reason-label">
          Reason
        </p>
        <input
          placeholder="Reason"
          name="request-reason"
          id="request-reason"
          onChange={(e) => {
            requestContent.request_Reason = e.target.value;
          }}
        />
      </div>
    </div>
  );
};
export default RequestInfo;

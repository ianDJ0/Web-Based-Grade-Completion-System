import React, { useState, useContext, useEffect } from "react";
import Sidebar from "../../UI/Home_UI/Sidebar";
import TopNav from "../../UI/Home_UI/TopNav";
import RequestFilter from "./RequestFilter";
import { AuthenticationContext } from "../../Shared/context/auth-context";

import "./Requests.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Request = (props) => {
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const auth = useContext(AuthenticationContext);

  const DATE_OPTIONS = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const [status, setStatus] = useState();
  const [toDate, setToDate] = useState();
  const [fromDate, setFromDate] = useState();
  const [list, setList] = useState([]);
  useEffect(() => {
    let url;
    if (auth.userType === "Student") {
      url = "http://localhost:7700/api/request/studentRequest";
    } else {
      url = "http://localhost:7700/api/request/facultyRequest";
    }
    axios
      .post(url, {
        uID: auth.userId,
        requestStatus: status,
        requestToDate: toDate,
        requestFromDate: fromDate,
      })
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, [status, toDate, fromDate]);
  return (
    <>
      {/* <RequestModal open={isOpen} onClose={() => setOpen(false)} /> */}

      <TopNav />
      <Sidebar active={"requests"} />
      <div className="request-body">
        {auth.userType !== "Admin" && auth.userType !== "Faculty" && (
          <button
            id="request-form-btn"
            onClick={() => {
              navigate("/request/form");
            }}
          >
            Request Completion Form
          </button>
        )}
        <h2 id="request-label">REQUEST LOGS</h2>
        <RequestFilter
          filterStatus={(newStatus) => {
            setStatus(newStatus);
          }}
          filterToDate={(newToDate) => {
            setToDate(newToDate);
          }}
          filterFromDate={(newFromDate) => {
            setFromDate(newFromDate);
          }}
        />
        <div className="request-content">
          <table id="request-log">
            <tbody>
              <tr>
                <th>Subject Code</th>
                <th>Subject Description</th>
                {auth.userType === "Student" && <th>Instructor</th>}
                {auth.userType === "Faculty" && <th>Student</th>}
                <th>Date Requested</th>
                <th>Status</th>
              </tr>
              {list.map((listItem) => {
                return (
                  <tr
                    style={{ cursor: "pointer" }}
                    key={listItem._id}
                    onClick={() => {
                      navigate("/request/form", {
                        state: { requestItem: listItem },
                      });
                    }}
                  >
                    <th>{listItem.subjectCode}</th>
                    <th>{listItem.subjectDescription}</th>
                    {auth.userType === "Student" ? (
                      <th>{listItem.instructor.instructorName}</th>
                    ) : (
                      <th>{listItem.student.studentFullname}</th>
                    )}
                    <th>
                      {new Date(
                        listItem.dateLog.dateStudent
                      ).toLocaleDateString("en-US", DATE_OPTIONS)}
                    </th>
                    <th>{listItem.status}</th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default Request;

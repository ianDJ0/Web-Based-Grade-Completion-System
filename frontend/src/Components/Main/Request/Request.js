import React, { useState, useContext, useEffect } from "react";
import RequestModal from "../../UI/Home_UI/RequestModal";
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

  const [status, setStatus] = useState();
  const [toDate, setToDate] = useState();
  const [fromDate, setFromDate] = useState();
  const [list, setList]=useState([]);
  useEffect(()=>{
    let url;
    if(auth.userType ==="Student"){
      url="http://localhost:7700/api/request/studentRequest"
    }else{
      url="http://localhost:7700/api/request/facultyRequest"
    }
    axios.post(url,{uID:auth.userId})
    .then((response)=>{
      setList(response.data)
    }).catch((error)=>{
      alert(error)
    })
  },[status, toDate, fromDate])
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
        <RequestFilter />
        <div className="request-content">
          <table id="request-log">
            <tbody>
              <tr>
                <th>Subject Code</th>
                <th>Subject Description</th>
                {auth.userType ==="Student"&&
                  <th>Instructor</th>
                }
                {auth.userType ==="Faculty"&&
                  <th>Student</th>
                }
                <th>Date Requested</th>
                <th>Status</th>
              </tr>
              {
                list.map(listItem=>{
                return <tr key={listItem._id}>
                  <th>{listItem.subjectCode}</th>
                  <th>{listItem.subjectDescription}</th>
                  {auth.userType==="Student"?<th>{listItem.instructor.instructorName}</th> : <th>{listItem.student.studentFullname}</th>}
                  <th>{listItem.dateLog.dateStudent}</th>
                  <th>{listItem.status}</th>
                </tr>
                })
              }
              {/* <tr>
                <th>IT 404</th>
                <th>Internship</th>
                <th>Mr. Aaron Paul M. Dela Rosa</th>
                <th>April 22, 2022</th>
                <th>Requested</th>
              </tr>
              <tr>
                <th>CAP 401</th>
                <th>Capstone</th>
                <th>John Doe</th>
                <th>March 27, 2022</th>
                <th>Submitted</th>
              </tr>
              <tr>
                <th>SAMP 301</th>
                <th>Sample</th>
                <th>Sample Name</th>
                <th>October 14, 2021</th>
                <th>On Process</th>
              </tr>
              <tr>
                <th>DUM 101</th>
                <th>Dummy</th>
                <th>Dummy Name</th>
                <th>December 4, 2018</th>
                <th>Processed</th>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default Request;

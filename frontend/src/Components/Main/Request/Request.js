import React, { useState } from "react";
import RequestModal from "../../UI/Home_UI/RequestModal";
import Sidebar from "../../UI/Home_UI/Sidebar";
import TopNav from "../../UI/Home_UI/TopNav";
import RequestFilter from "./RequestFilter";

import "./Requests.css";

const Request = (props) => {
  const [isOpen, setOpen] = useState(false); //for modal

  return (
    <>
      <RequestModal open={isOpen} onClose={() => setOpen(false)} />
      <TopNav />
      <Sidebar active={"requests"} />
      <div className="request-body">
        <button
          id="request-form-btn"
          onClick={() => setOpen((prevState) => !prevState)}
        >
          Request Completion Form
        </button>
        <h2 id="request-label">REQUEST LOGS</h2>
        <RequestFilter />
        <div className="request-content">
          <table id="request-log">
            <tbody>
              <tr>
                <th>Subject Code</th>
                <th>Subject Description</th>
                <th>Instructor</th>
                <th>Date Requested</th>
                <th>Status</th>
              </tr>
              <tr>
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
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default Request;

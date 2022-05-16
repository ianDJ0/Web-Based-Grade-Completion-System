import Sidebar from "../UI/Sidebar";
import Card from "../UI/Containers/Card";
import RequestList from "../UI/RequestList";
import TopNav from "../UI/TopNav";
import Body from "../UI/Containers/Body";
import "./Dashboard.css";
import axios from "axios";

import { useEffect, useState } from "react";

const Dashboard = () => {
  const [registeredStudent, setRegisteredStudent] = useState(0);
  const [registeredFaculty, setRegisteredFaculty] = useState(0);
  const [activeRequest, setActiveRequest] = useState(0);
  const [pendingRequest, setPendingRequest] = useState(0);
  const [verifiedFaculty, setVerfiedFaculty] = useState("0");

  useEffect(() => {
    axios.all([
      axios.post('http://localhost:7700/api/users/type', {
        uType: "Student",
        findInName: ""
      }),
      axios.post('http://localhost:7700/api/users/type', {
        uType: "Faculty",
        findInName: ""
      }),
      axios.post('http://localhost:7700/api/request/admin/getRequests', {
      }),
      axios.post('http://localhost:7700/api/request/admin/getRequests', {
        filter: "SUBMITTED",
      }),
      axios.post('http://localhost:7700/api/users/admin/verified', {
      })
    ]).then(axios.spread((getStudentNo, getFacultyNo, getRequestNo, getSubmittedNo, getVerified) => {
      setRegisteredStudent(getStudentNo.data ? getStudentNo.data.length : "0");
      setRegisteredFaculty(getFacultyNo.data ? getFacultyNo.data.length : "0");
      setActiveRequest(getRequestNo.data ? getRequestNo.data.length : "0");
      setPendingRequest(getSubmittedNo.data);
      setVerfiedFaculty(!getVerified.data.length ? "0" : getVerified.data.length);
    }))
  }, [])

  return (
    <>
      <Sidebar active={'dashboard'} />
      <TopNav />
      <Body>
        <div className="cards">
          <Card class={"fa fa-users user-icon-1"}>
            <div className="number">{registeredStudent}</div>
            <div className="card-name">Active Registered Students</div>
          </Card>
          <Card class={"fa fa-users user-icon-2"}>
            <div className="number">{registeredFaculty}</div>
            <div className="card-name">Active Registered faculty</div>
          </Card>
          <Card class={"fa fa-envelope-open"}>
            <div className="number">{activeRequest}</div>
            <div className="card-name">Active Pending Requests</div>
          </Card>
          <Card class={"fa fa-spinner"}>
            <div className="number">{pendingRequest.length}</div>
            <div className="card-name">Submitted Request</div>
          </Card>
          <Card class={"fa fa-user-circle"}>
            <div className="number">{verifiedFaculty}</div>
            <div className="card-name">Instructors to be Verified</div>
          </Card>
        </div>
        <RequestList submittedData={pendingRequest} />
      </Body>
    </>
  );
};

export default Dashboard;

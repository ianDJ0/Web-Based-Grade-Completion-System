import axios from "axios";
import Body from "../../UI/Containers/Body";
import Sidebar from "../../UI/Sidebar";
import TopNav from "../../UI/TopNav";
import RequestFilter from "../../../../Components/Main/Request/RequestFilter";
import RequestList from "../../UI/RequestList";
import "./AdminRequests.css";
import { useEffect, useState } from "react";

const AdminRequests = () => {
  const [registeredStudent, setRegisteredStudent] = useState(0);
  const [registeredFaculty, setRegisteredFaculty] = useState(0);
  const [activeRequest, setActiveRequest] = useState(0);
  const [pendingRequest, setPendingRequest] = useState(0);
  const [verifiedFaculty, setVerfiedFaculty] = useState("0");
  const [status, setStatus] = useState("");
  const [entries, setEntries] = useState("all"); //number of entries shown
  useEffect(() => {
    axios
      .all([
        axios.post("http://localhost:7700/api/users/type", {
          uType: "Student",
          findInName: "",
        }),
        axios.post("http://localhost:7700/api/users/type", {
          uType: "Faculty",
          findInName: "",
        }),
        axios.post("http://localhost:7700/api/request/admin/getRequests", {}),
        axios.post("http://localhost:7700/api/request/admin/getRequests", {
          filter: "SUBMITTED",
        }),
        axios.post("http://localhost:7700/api/users/admin/verified", {}),
      ])
      .then(
        axios.spread(
          (
            getStudentNo,
            getFacultyNo,
            getRequestNo,
            getSubmittedNo,
            getVerified
          ) => {
            setRegisteredStudent(
              getStudentNo.data ? getStudentNo.data.length : "0"
            );
            setRegisteredFaculty(
              getFacultyNo.data ? getFacultyNo.data.length : "0"
            );
            setActiveRequest(
              getRequestNo.data ? getRequestNo.data.length : "0"
            );
            setPendingRequest(getSubmittedNo.data);
            setVerfiedFaculty(
              !getVerified.data.length ? "0" : getVerified.data.length
            );
            // console.log("getverified", getVerified.data.length);
          }
        )
      );
  }, [entries]);

  return (
    <>
      <Sidebar />
      <TopNav />
      <Body>
        <div className="admin-request-filter">
          <RequestFilter
            filterOn={true}
            entries={(entry) => setEntries(entry)}
            filterStatus={(newStatus) => setStatus(newStatus)}
          />
        </div>
        {pendingRequest.length > 0 ? (
          <RequestList submittedData={pendingRequest} entries={entries} />
        ) : (
          <div className="pending-request">
            <h1>NO {status} REQUEST</h1>
          </div>
        )}
      </Body>
    </>
  );
};

export default AdminRequests;

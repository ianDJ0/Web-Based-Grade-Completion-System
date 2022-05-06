import { useEffect, useState } from "react";
import "./Requests.css";
import axios from "axios";
const InstructorRequests = (props) => {
  const [request, setRequest] = useState([]);

 useEffect(()=>{
  axios
  .post("http://localhost:7700/api/request/facultyRequest", {
    uID: props.intructor,
  })
  .then((response) => {
    setRequest(response.data);
  })
  .catch((error) => {
    alert(error);
  });
 },[])
  return (
    <div className="admin-request-content">
      <p>Requests List</p>
      <table id="request-log" className="log">
        <tbody>
          <tr id="admin-request-label">
            <th>Subject Code</th>
            <th>Subject Description</th>
            <th>Student</th>
            <th>Date Requested</th>
            <th>Status</th>
          </tr>
          {request.length > 0 &&
            request.map(req => {
              return <tr key={req._id}>
                <th>{req.subjectCode}</th>
                <th>{req.subjectDescription}</th>
                <th>{req.student.studentFullname}</th>
                <th>{req.dateLog.dateStudent}</th>
                <th>{req.status}</th>
              </tr>
            })
          }

        </tbody>
      </table>
    </div>
  );
};

export default InstructorRequests;

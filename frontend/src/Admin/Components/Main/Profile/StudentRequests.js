import { useEffect, useState } from "react";
import axios from "axios";

import "./Requests.css";

const StudentRequests = (props) => {
  const [request, setRequest] = useState([]);

  useEffect(()=>{
    axios
    .post("http://localhost:7700/api/request/studentRequest", {
      uID: props.student,
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
      <table id="request-log">
        <tbody>
          <tr id="admin-request-label">
            <th>Subject Code</th>
            <th>Subject Description</th>
            <th>Instructor</th>
            <th>Date Requested</th>
            <th>Status</th>
          </tr>
          {request.length > 0 &&
            request.map(req => {
              return <tr key={req._id}>
                <th>{req.subjectCode}</th>
                <th>{req.subjectDescription}</th>
                <th>{req.instructor.instructorName}</th>
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

export default StudentRequests;

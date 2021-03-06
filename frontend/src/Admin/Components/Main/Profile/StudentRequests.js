import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Requests.css";

const StudentRequests = (props) => {
  const [request, setRequest] = useState([]);
  const navigate = useNavigate();
  const DATE_OPTIONS = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  useEffect(() => {
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
  }, []);

  return (
    <div className="admin-request-content">
      {request.length > 0 ? (
        <>
          <p>Requests List</p>
          <table id="request-log" cellSpacing={0}>
            <tbody>
              <tr id="admin-request-label">
                <th>Subject Code</th>
                <th>Subject Description</th>
                <th>Instructor</th>
                <th>Date Requested</th>
                <th>Status</th>
              </tr>
              {request.length > 0 &&
                request.map((req) => {
                  return (
                    <tr
                      key={req._id}
                      onClick={() => {
                        navigate("/admin/request/form", {
                          state: { requestItem: req },
                        });
                      }}
                    >
                      <th>{req.subjectCode}</th>
                      <th>{req.subjectDescription}</th>
                      <th>{req.instructor.instructorName}</th>
                      <th>
                        {new Date(req.dateLog.dateStudent).toLocaleDateString(
                          "en-US",
                          DATE_OPTIONS
                        )}
                      </th>
                      <th>{req.status}</th>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </>
      ) : (
        <div className="no-requests">
          <h1>No Requests</h1>
        </div>
      )}
    </div>
  );
};

export default StudentRequests;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Requests.css";

const InstructorRequests = (props) => {
  const [request, setRequest] = useState([]);
  const navigate = useNavigate();
  const DATE_OPTIONS = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  useEffect(() => {
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
  }, []);
  // console.log(request.length > 0);
  return (
    <div className="admin-request-content">
      {request.length > 0 ? (
        <>
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
                      <th>{req.student.studentFullname}</th>
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

export default InstructorRequests;

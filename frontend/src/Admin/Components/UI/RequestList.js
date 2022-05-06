import "./Shared.css";
import "./RequestList.css";
import { useLocation, useNavigate } from "react-router-dom";

const RequestList = (props) => {
  const navigate = useNavigate();
  const DATE_OPTIONS = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  // const entry = props.entries;
  // if (props.entries === "5") entry = 5;
  // else if (props.entries === "10") entry = 10;
  // else entry = props.submittedData.length;
  return (
    <>
      <h2 id="list-label">REQUESTS LIST</h2>
      <div className="list-content">
        <table className="log">
          <tbody>
            <tr id="list-label">
              <th>Requested By</th>
              <th>Requested To</th>
              <th>Subject Code</th>
              <th>Subject Description</th>
              <th>Date Requested</th>
              <th>Status</th>
            </tr>
            {props.submittedData &&
              props.submittedData.map((request) => {
              // props.submittedData.slice(0, entry).map((request) => {
                return (
                  <tr key={request._id} onClick={()=>{
                    navigate("/request/form", {
                      state: { requestItem: request },
                    });
                  }}>
                    <th>{request.student.studentFullname}</th>
                    <th>{request.instructor.instructorName}</th>
                    <th>{request.subjectCode}</th>
                    <th>{request.subjectDescription}</th>
                    <th>
                      {new Date(request.dateLog.dateStudent).toLocaleDateString(
                        "en-US",
                        DATE_OPTIONS
                      )}
                    </th>
                    <th>{request.status}</th>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RequestList;

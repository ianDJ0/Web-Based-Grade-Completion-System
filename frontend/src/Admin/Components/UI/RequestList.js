import "./Shared.css";
import "./RequestList.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
const RequestList = (props) => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(1);
  const [entry, setEntry] = useState(7);
  const DATE_OPTIONS = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  useEffect(() => {
    if (props.entryNumber === "all" || props.entryNumber === "All") {
      setEntry(10000);
    } else {
      setEntry(props.entryNumber);
    }
  }, [props.entryNumber]);

  const indexOfLastEntry = current * entry;
  const indexOfFirstEntry = indexOfLastEntry - entry;
  const currentEntry = props.submittedData.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );
  const paginate = (pageNumber) => setCurrent(pageNumber);

  return (
    <>
      <h2 id="list-label">REQUEST LIST</h2>
      <div className="list-content">
        <table className="log" cellSpacing={0}>
          <tbody>
            <tr id="list-label">
              <th>Requested By</th>
              <th>Requested To</th>
              <th>Subject Code</th>
              <th>Subject Description</th>
              <th>Date Requested</th>
              <th>Status</th>
            </tr>
            {currentEntry.length > 0 ? (
              currentEntry.map((request) => {
                return (
                  <tr
                  className="request-list-tr"
                    key={request._id}
                    onClick={() => {
                      navigate("/admin/request/form", {
                        state: { requestItem: request },
                      });
                    }}
                  >
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
              })
            ) : (
              <tr className="no-submitted-request-tr">
                <td className="no-submitted-request-td" colSpan={6}>
                  No submitted requests
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        postsPerPage={entry}
        totalPosts={props.submittedData.length}
        paginate={paginate}
      />
    </>
  );
};

export default RequestList;

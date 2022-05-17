import axios from "axios";
import Body from "../../UI/Containers/Body";
import Sidebar from "../../UI/Sidebar";
import TopNav from "../../UI/TopNav";
import RequestFilter from "../../../../Components/Main/Request/RequestFilter";
import RequestList from "../../UI/RequestList";
import "./AdminRequests.css";
import { useEffect, useState } from "react";

const AdminRequests = () => {
  const [pendingRequest, setPendingRequest] = useState(0);
  const [status, setStatus] = useState();
  const [toDate, setToDate] = useState();
  const [fromDate, setFromDate] = useState();
  const [entries, setEntries] = useState("all");
  useEffect(() => {
    axios
      .post(
        "http://localhost:7700/api/request/admin/getRequests",
        {
          requestStatus: status,
          requestToDate: fromDate,
          requestFromDate: toDate,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        setPendingRequest(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, [toDate, fromDate, status]);
  return (
    <>
      <Sidebar active={"request"} />
      <TopNav />
      <Body>
        <div className="admin-request-filter">
          <RequestFilter
            filterOn={true}
            entries={(entry) => setEntries(entry)}
            filterStatus={(newStatus) => setStatus(newStatus)}
            filterFromDate={(newFromDate) => setFromDate(newFromDate)}
            filterToDate={(newToDate) => setToDate(newToDate)}
          />
        </div>
        {pendingRequest.length > 0 ? (
          <RequestList
            submittedData={pendingRequest}
            entryNumber={entries}
            // entries={entries}
          />
        ) : (
          <div className="admin-pending-request">
            <h1>NO {status} REQUEST</h1>
          </div>
        )}
      </Body>
    </>
  );
};

export default AdminRequests;

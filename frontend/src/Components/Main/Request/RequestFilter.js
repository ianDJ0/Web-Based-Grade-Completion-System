import React, { useState } from "react";

import "./RequestFilter.css";

const RequestFilter = (props) => {
  const [status, setStatus] = useState("Status");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const clearFilterHandler = () => {};


  //will prolly use useEffect on the request.js to call changes from here + props

  return (
    <>
      <div className="filter-logs">
        <div className="filter-request">
          <div className="filter-labels">
            <label htmlFor="select-label" id="status-label">
              Request Status
            </label>
            <label htmlFor="todate-label" id="to-label">
              To
            </label>
            <label htmlFor="fromdate-label" id="from-label">
              From
            </label>
          </div>
          <select
            id="request-status-dropdown"
            name="select-label"
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
            }}
          >
            <option selected hidden disabled>
              Status
            </option>
            <option value={"requested"}>Requested</option>
            <option value={"submitted"}>Submitted</option>
            <option value={"on-process"}>On Process</option>
            <option value={"processed"}>Processed</option>
          </select>
          <input
            type="date"
            className="datepicker"
            name="todate-label"
            id="todate-filter"
            value={startDate}
            onChange={(event) => {
              setStartDate(event.target.value);
            }}
          />
          <input
            type="date"
            className="datepicker"
            name="fromdate-label"
            id="fromdate-filter"
            value={endDate}
            onChange={(event) => {
              setEndDate(event.target.value);
            }}
          />
          <button onClick={clearFilterHandler}>Clear Filter</button>
        </div>
      </div>
    </>
  );
};
export default RequestFilter;

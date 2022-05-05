import React, { useState } from "react";

import "./RequestFilter.css";

const RequestFilter = (props) => {
  const [status, setStatus] = useState("Status");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [entries, setEntries] = useState("All");

  const clearFilterHandler = () => {
    props.filterStatus("");
    props.filterToDate("");
    props.filterFromDate("");
    setStatus("Status");
    setStartDate("");
    setEndDate("");
  };

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
              From
            </label>
            <label htmlFor="fromdate-label" id="from-label">
              To
            </label>
            {props.filterOn && (
              <label htmlFor="filter-entry-dropdown" id="entry-label">
                Show entries
              </label>
            )}
          </div>
          <select
            id="request-status-dropdown"
            name="select-label"
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
              props.filterStatus(event.target.value);
            }}
          >
            <option hidden disabled>
              Status
            </option>
            <option value={"REQUESTED"}>Requested</option>
            <option value={"SUBMITTED"}>Submitted</option>
            <option value={"ON PROCESS"}>On Process</option>
            <option value={"PROCESSED"}>Processed</option>
            <option value={"DENIED"}>Denied</option>
          </select>
          <input
            type="date"
            className="datepicker"
            name="todate-label"
            id="todate-filter"
            value={startDate}
            onChange={(event) => {
              setStartDate(event.target.value);
              props.filterToDate(event.target.value);
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
              props.filterFromDate(event.target.value);
            }}
          />

          {props.filterOn && (
            <select
              id="filter-entry-dropdown"
              name="entry-label"
              value={entries}
              onChange={(event) => {
                setEntries(event.target.value);
                props.entries(event.target.value);
              }}
            >
              <option hidden disabled>
                Show entries
              </option>
              <option value={"5"}>5</option>
              <option value={"10"}>10</option>
              <option value={"All"}>All</option>
            </select>
          )}

          <button onClick={clearFilterHandler} id="clear-filter">
            Clear Filter
          </button>
        </div>
      </div>
    </>
  );
};
export default RequestFilter;

import React, { useState } from "react";
import "./Tutorial.css";

const Pagination = (props) => {
  const [page, setPage] = useState(1);
  const sevenStep = props.source === "request";
  const limit = sevenStep ? 7 : 5;
  return (
    <>
      <div className="pagination">
        <span
          onClick={() => {
            props.getPage(page - 1);
            setPage((prev) => prev - 1);
          }}
          className={`prev ${page === 1 ? "disable-btn" : ""}`}
        >
          Prev
        </span>
        <span
          onClick={() => {
            props.getPage(1);
            setPage(1);
          }}
          className={`page-item  ${page === 1 ? "active-page" : ""}`}
        >
          1
        </span>
        <span
          onClick={() => {
            props.getPage(2);
            setPage(2);
          }}
          className={`page-item  ${page === 2 ? "active-page" : ""}`}
        >
          2
        </span>
        <span
          onClick={() => {
            props.getPage(3);
            setPage(3);
          }}
          className={`page-item  ${page === 3 ? "active-page" : ""}`}
        >
          3
        </span>
        <span
          onClick={() => {
            props.getPage(4);
            setPage(4);
          }}
          className={`page-item  ${page === 4 ? "active-page" : ""}`}
        >
          4
        </span>
        <span
          onClick={() => {
            props.getPage(5);
            setPage(5);
          }}
          className={`page-item ${page === 5 ? "active-page" : ""}`}
        >
          5
        </span>
        <span
          onClick={() => {
            props.getPage(6);
            setPage(6);
          }}
          className={`page-item ${sevenStep ? "" : "hide-pick"} ${
            page === 6 ? "active-page" : ""
          }`}
        >
          6
        </span>
        <span
          onClick={() => {
            props.getPage(7);
            setPage(7);
          }}
          className={`page-item ${sevenStep ? "" : "hide-pick"} ${
            page === 7 ? "active-page" : ""
          }`}
        >
          7
        </span>
        <span
          onClick={() => {
            props.getPage(page + 1);
            setPage((prev) => prev + 1);
          }}
          className={`next ${page === limit ? "disable-btn" : ""}`}
        >
          Next
        </span>
        {/* <button onClick={() => props.getPage(1)}>Click</button> */}
      </div>
    </>
  );
};

export default Pagination;

import "./Shared.css";
import "./RequestList.css";

const RequestList = () => {
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
            <tr>
              <th>Student 1</th>
              <th>Mr. Aaron Paul M. Dela Rosa</th>
              <th>IT 404</th>
              <th>Internship</th>
              <th>April 22, 2022</th>
              <th>Requested</th>
            </tr>
            <tr>
              <th>Student 2</th>
              <th>John Doe</th>
              <th>CAP 401</th>
              <th>Capstone</th>
              <th>March 27, 2022</th>
              <th>Submitted</th>
            </tr>
            <tr>
              <th>Student 3</th>
              <th>Sample Prof</th>
              <th>SAMP 301</th>
              <th>Sample</th>
              <th>October 14, 2021</th>
              <th>On Process</th>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RequestList;

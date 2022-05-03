import "./Requests.css";

const StudentRequests = (props) => {
  // const student_name = props.student;
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
          <tr>
            <th>IT 404</th>
            <th>Internship</th>
            <th>instructor 1</th>
            <th>April 22, 2022</th>
            <th>Requested</th>
          </tr>
          <tr>
            <th>CAP 401</th>
            <th>Capstone</th>
            <th>Instructor 2</th>
            <th>March 27, 2022</th>
            <th>Submitted</th>
          </tr>
          <tr>
            <th>SAMP 301</th>
            <th>Sample</th>
            <th>Instructor 3</th>
            <th>October 14, 2021</th>
            <th>On Process</th>
          </tr>
          <tr>
            <th>DUM 101</th>
            <th>Dummy</th>
            <th>Instructor 4</th>
            <th>December 4, 2018</th>
            <th>Processed</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StudentRequests;

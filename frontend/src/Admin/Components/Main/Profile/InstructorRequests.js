import "./Requests.css";

const InstructorRequests = (props) => {
  //   const instructor_name = props.instructor;
  return (
    <div className="admin-request-content">
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
          <tr>
            <th>IT 404</th>
            <th>Internship</th>
            <th>Student 1</th>
            <th>April 22, 2022</th>
            <th>Requested</th>
          </tr>
          <tr>
            <th>CAP 401</th>
            <th>Capstone</th>
            <th>Student 2</th>
            <th>March 27, 2022</th>
            <th>Submitted</th>
          </tr>
          <tr>
            <th>SAMP 301</th>
            <th>Sample</th>
            <th>Student 3</th>
            <th>October 14, 2021</th>
            <th>On Process</th>
          </tr>
          <tr>
            <th>DUM 101</th>
            <th>Dummy</th>
            <th>Student 4</th>
            <th>December 4, 2018</th>
            <th>Processed</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InstructorRequests;

import "./StudentInfo.css";
import { useContext } from "react";
import { RequestContent } from "../../Shared/context/request-context";
import SignaturePad from "signature_pad";

const StudentInfo = (props) => {
  let cys = props.studentInformation.userCourseYearAndSection;
  const requestContent = useContext(RequestContent);
  const cys1 = cys.split("-");

  return (
    <div className="student-info">
      <p id="stud-info-label">Student Information</p>
      <div className="stud-info-one">
        <p className="stud-field-labels">Student Name</p>
        <input
          placeholder="Student Name"
          name="stud-name"
          id="stud-name"
          value={props.studentInformation.userFullName}
          readOnly
        />
      </div>
      <div className="stud-info-two">
        <p className="stud-field-labels">Student Number</p>
        <input
          placeholder="Student Number"
          name="stud-no"
          id="stud-no"
          value={props.studentInformation.userStudentNumber}
          readOnly
        />
      </div>
      <div className="stud-info-three">
        <p className="stud-field-labels">Course</p>
        <input
          placeholder="Course"
          name="stud-course"
          id="stud-course"
          value={cys1[0]}
          readOnly
        />
      </div>
      <div className="stud-info-four">
        <p className="stud-field-labels">Year</p>
        <input
          placeholder="Year"
          name="stud-year"
          id="stud-year"
          value={cys1[1]}
          readOnly
        />
      </div>
      <div className="stud-info-five">
        <p className="stud-field-labels">Section</p>
        <input
          placeholder="Section"
          name="stud-section"
          id="stud-section"
          value={cys1[2]}
          readOnly
        />
      </div>
      <div className="stud-info-sign">
        <p className="stud-field-labels">Signature</p>
        <img
          className="student-signature"
          src={`http://localhost:7700/${props.studentInformation.userSignature}`}
          alt="Student Signature"
        />
      </div>
    </div>
  );
};
export default StudentInfo;

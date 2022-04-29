import "./StudentInfo.css";

const StudentInfo = (props) => {
  return (
    <div className="student-info">
      <p id="stud-info-label">Student Information</p>
      <div className="stud-info-one">
        <p>Student Name</p>
        <input placeholder="Student Name" name="stud-name" id="stud-name" />
      </div>
      <div className="stud-info-two">
        <p>Student Number</p>
        <input placeholder="Student Number" name="stud-no" id="stud-no" />
      </div>
      <div className="stud-info-three">
        <p>Course</p>
        <input placeholder="Course" name="stud-course" id="stud-course" />
      </div>
      <div className="stud-info-four">
        <p>Year</p>
        <input placeholder="Year" name="stud-year" id="stud-year" />
      </div>
      <div className="stud-info-five">
        <p>Section</p>
        <input placeholder="Section" name="stud-section" id="stud-section" />
      </div>
      <div className="stud-info-sign">
        <p>Signature</p>
        <img src={""} alt="Student Signature" />
      </div>
    </div>
  );
};
export default StudentInfo;

import axios from "axios";
import { useContext, useState } from "react";
import { AuthenticationContext } from "../../Shared/context/auth-context";
import { RequestContent } from "../../Shared/context/request-context";
import Sidebar from "../../UI/Home_UI/Sidebar";
import TopNav from "../../UI/Home_UI/TopNav";
import "./RequestForm.css";
import RequestInfo from "./RequestInfo";
import StudentInfo from "./StudentInfo";

const RequestForm = (props) => {
  const auth = useContext(AuthenticationContext);
  const requestContent = useContext(RequestContent);

  requestContent.request_StudentId = auth.userId;
  requestContent.request_StudentFullName = auth.userFullName;
  requestContent.request_StudentNumber = auth.userStudentNumber;
  requestContent.request_StudentCourseYearAndSetion =
    auth.userCourseYearAndSection;
  requestContent.request_StudentSignature = auth.userSignature;

  const [instructorId, setInstructorId] = useState();
  const [instructor, setInstructor] = useState();
  const [reason, setReason] = useState();
  const [subjectYear, setSubjectYear] = useState();
  const [subjectSemester, setSubjectSemester] = useState();
  const [subjectCode, setSubjectCode] = useState();
  const [subjectDescription, setSubjectDescription] = useState();

  const submitStudentRequest = () => {
    axios
      .post(
        "http://localhost:7700/api/request/studentCreateRequest",
        {
          subject: requestContent.request_SubjectCode,
          subjectDescription: requestContent.request_SubjectDescription,
          incompletePeriod: requestContent.request_SemesterIncomplete,
          incompleteYear: requestContent.request_YearIncomplete,
          reason: requestContent.request_Reason,
          studentID: requestContent.request_StudentId,
          studentFullname: requestContent.request_StudentFullName,
          studentNumber: requestContent.request_StudentNumber,
          studentYearAndSection:
            requestContent.request_StudentCourseYearAndSetion,
          studentSignature: requestContent.request_StudentSignature,
          instructorID: requestContent.request_InstructorId,
          instructorName: requestContent.request_InstructorName,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        console.log("Success", response);
        props.onClose();
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <>
      <TopNav />
      <Sidebar active={"requests"} />
      <div className="request-modal">
        <h2 id="modal-label">GRADE COMPLETION FORM</h2>
        <div className="process-track">
          <p id="first-step">1</p>
          <div className="col-3">
            <div className="snippet">
              <div className="stage">
                <div className="dot-flashing finished-process"></div>
              </div>
            </div>
          </div>
          <p id="second-step">2</p>
          <div className="col-3">
            <div className="snippet">
              <div className="stage">
                <div className="dot-flashing active-process"></div>
              </div>
            </div>
          </div>
          <p id="third-step">3</p>
          <div className="col-3">
            <div className="snippet">
              <div className="stage">
                <div className="dot-flashing non-active-process"></div>
              </div>
            </div>
          </div>
          <p id="fourth-step">4</p>
        </div>
        <StudentInfo studentInformation={auth} />
        <RequestInfo
          requestInstructorId={(childInstructorId) => {
            setInstructorId(childInstructorId);
          }}
          requestInstructorName={(childInstructorId) => {
            setInstructor(childInstructorId);
          }}
          requestSubjectCode={(childInstructorId) => {
            setSubjectCode(childInstructorId);
          }}
          requestSubjectDescription={(childInstructorId) => {
            setSubjectDescription(childInstructorId);
          }}
          requestSubjectYear={(childInstructorId) => {
            setSubjectYear(childInstructorId);
          }}
          requestSemester={(childInstructorId) => {
            setSubjectSemester(childInstructorId);
          }}
          requestReason={(childInstructorId) => {
            setReason(childInstructorId);
          }}
        />
        {/* 
          <RequestInfo
            requestInstructorId={(childInstructorId) => { setInstructorId(childInstructorId) }}
            requestInstructorName={(childInstructorId) => { setInstructorId(childInstructorId) }}

            requestSubjectCode={(childInstructorId) => { setInstructorId(childInstructorId) }}
            requestSubjectDescription={(childInstructorId) => { setInstructorId(childInstructorId) }}

            requestSubjectYear={(childInstructorId) => { setInstructorId(childInstructorId) }}
            requestSemester={(childInstructorId) => { setInstructorId(childInstructorId) }}

            requestReason={(childInstructorId) => { setInstructorId(childInstructorId) }}
          /> */}

        <div className="wrap">
          <button id="request-complete" onClick={submitStudentRequest}>
            Request Grade Completion
          </button>
        </div>
      </div>
    </>
  );
};

export default RequestForm;

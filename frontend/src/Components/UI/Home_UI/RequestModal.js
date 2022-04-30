import RequestInfo from "../../Main/Request/RequestInfo";
import StudentInfo from "../../Main/Request/StudentInfo";
import ModalBackdrop from "./ModalBackdrop";
import axios from "axios";
import { AuthenticationContext } from "../../Shared/context/auth-context";
import { RequestContent } from "../../Shared/context/request-context";
import { useContext, useState } from "react";
import "./RequestModal.css";
import TokenCheck from "../../Shared/Auth";

const RequestModal = (props) => {
  const auth = useContext(AuthenticationContext);
  const requestContent = useContext(RequestContent);

  requestContent.request_StudentId = auth.userId;
  requestContent.request_StudentFullName = auth.userFullName;
  requestContent.request_StudentNumber = auth.userStudentNumber;
  requestContent.request_StudentCourseYearAndSetion = auth.userCourseYearAndSection;
  requestContent.request_StudentSignature = auth.userSignature;

  const submitStudentRequest = () => {
    axios.post('http://localhost:7700/api/request/studentCreateRequest', {
      subject: requestContent.request_SubjectCode,
      subjectDescription: requestContent.request_SubjectDescription,
      incompletePeriod: requestContent.request_SemesterIncomplete,
      incompleteYear: requestContent.request_YearIncomplete,
      reason: requestContent.request_Reason,
      studentID: requestContent.request_StudentId,
      studentFullname: requestContent.request_StudentFullName,
      studentNumber: requestContent.request_StudentNumber,
      studentYearAndSection: requestContent.request_StudentCourseYearAndSetion,
      studentSignature: requestContent.request_StudentSignature,
      instructorID: requestContent.request_InstructorId,
      instructorName: requestContent.request_InstructorName
    }, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
      .then((response) => {
        console.log("Success",response)
        props.onClose();
      }).catch((error) => {
        alert(error);
      })
  }

  TokenCheck();
  if (!props.open) return null;
  return (
    <RequestContent.Provider value={requestContent}>
    {/* <TokenCheck/> */}
      <ModalBackdrop onClose={props.onClose}>
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
          />

          <div className="wrap">
            <button id="request-complete" onClick={submitStudentRequest}>Request Grade Completion</button>
          </div>
        </div>
      </ModalBackdrop>
    </RequestContent.Provider>
  );
};

export default RequestModal;

import axios from "axios";
import { useContext } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../Shared/context/auth-context";
import { RequestContent } from "../../Shared/context/request-context";
import Sidebar from "../../UI/Home_UI/Sidebar";
import TopNav from "../../UI/Home_UI/TopNav";
import "./RequestForm.css";
import "./StudentInfo.css";
import RequestInfo from "./RequestInfo";
import StudentInfo from "./StudentInfo";
import Swal from "sweetalert2";

const RequestForm = (props) => {
  const navigate = useNavigate();
  let { state } = useLocation();
  let requestItem = { status: "" };
  let autoCompleteInstructor = "";
  let cys1 = "";
  if (state && state.requestItem) {
    requestItem = state;
    cys1 = requestItem.requestItem.student.studentYearAndSection.split("-");
  }
  // console.log("request item", requestItem);
  if (state && state.autoInstructor) {
    autoCompleteInstructor = state.autoInstructor;
    state = "";
  }
  const auth = useContext(AuthenticationContext);
  const requestContent = useContext(RequestContent);

  requestContent.request_StudentId = auth.userId;
  requestContent.request_StudentFullName = auth.userFullName;
  requestContent.request_StudentNumber = auth.userStudentNumber;
  requestContent.request_StudentCourseYearAndSetion =
    auth.userCourseYearAndSection;
  requestContent.request_StudentSignature = auth.userSignature;

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
        Swal.fire({
          icon: "success",
          title: "Request has been sent!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate("/requests");
        });
      })
      .catch((error) => {
        alert(error);
      });
  };
  const submitFacultyResponse = async () => {
    const { value: grade } = await Swal.fire({
      title: "Select grade to give",
      input: "select",
      inputOptions: {
        Excellent: {
          1.0: "1.00",
          1.25: "1.25",
          1.5: "1.50",
          1.75: "1.75",
        },
        Good: {
          2.0: "2.00",
          2.25: "2.25",
          2.5: "2.50",
          2.75: "2.75",
        },
        Satisfactory: {
          3.0: "3.00",
        },
      },
      inputPlaceholder: "Select grade",
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value) {
            resolve();
          } else {
            resolve("You need to select a grade)");
          }
        });
      },
    });

    if (grade) {
      axios
        .post(
          "http://localhost:7700/api/request/instructorRespondRequest",
          {
            requestID: requestItem.requestItem._id,
            grade: grade,
            instructorSignature: auth.userSignature,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          Swal.fire({
            icon: "success",
            title: "Request has been submitted to Office!",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            navigate("/requests");
          });
        })
        .catch((error) => {
          alert(error);
        });
    }
  };
  const submitDenyRespose = () => {
    axios
      .post(
        "http://localhost:7700/api/request/instructorRespondRequest",
        {
          requestID: requestItem.requestItem._id,
          grade: "5.00",
          instructorSignature: auth.userSignature,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Response has been recorded!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate("/requests");
        });
      })
      .catch((error) => {
        alert(error);
      });
  };

  const STATUS = ["REQUESTED", "SUBMITTED", "ON PROCESS", "PROCESSED"];

  //dot-flashing finished-process
  //dot-flashing active-process
  //dot-flashing non-active-process

  let first_step, second_step, third_step, fourth_step;
  let first_process, second_process, third_process;

  if (state) {
    if (STATUS.indexOf(requestItem.requestItem.status) === 0) {
      first_step = "active-step";
      second_step = third_step = fourth_step = "inactive-step";
      first_process = "dot-flashing active-process";
      second_process = third_process = "dot-flashing non-active-process";
    }
    if (STATUS.indexOf(requestItem.requestItem.status) === 1) {
      first_step = second_step = "active-step";
      third_step = fourth_step = "inactive-step";
      first_process = "dot-flashing finished-process";
      second_process = "dot-flashing active-process";
      third_process = "dot-flashing non-active-process";
    }
    if (STATUS.indexOf(requestItem.requestItem.status) === 2) {
      first_step = second_step = third_step = "active-step";
      fourth_step = "inactive-step";
      first_process = second_process = "dot-flashing finished-process";
      third_process = "dot-flashing active-process";
    }
    if (STATUS.indexOf(requestItem.requestItem.status) === 3) {
      first_step = second_step = third_step = fourth_step = "active-step";
      first_process =
        second_process =
        third_process =
          "dot-flashing finished-process";
    }
    if (requestItem.requestItem.status === "DENIED") {
      first_step = second_step = third_step = fourth_step = "inactive-step";
      first_process =
        second_process =
        third_process =
          "dot-flashing non-active-process";
    }
  } else {
    first_step = "active-step";
    second_step = third_step = fourth_step = "inactive-step";
    first_process = "dot-flashing active-process";
    second_process = third_process = "dot-flashing non-active-process";
  }
  return (
    <>
      <TopNav />
      <Sidebar active={"requests"} />
      <div className="request-modal">
        <h2 id="modal-label">GRADE COMPLETION FORM</h2>
        <div className="process-track">
          <p id="first-step" className={`steps ${first_step}`}>
            1
          </p>
          <div className="col-3">
            <div className="snippet">
              <div className="stage">
                <div className={first_process} />
              </div>
            </div>
          </div>
          <p id="second-step" className={`steps ${second_step}`}>
            2
          </p>
          <div className="col-3">
            <div className="snippet">
              <div className="stage">
                <div className={second_process} />
              </div>
            </div>
          </div>
          <p id="third-step" className={`steps ${third_step}`}>
            3
          </p>
          <div className="col-3">
            <div className="snippet">
              <div className="stage">
                <div className={third_process} />
              </div>
            </div>
          </div>
          <p id="fourth-step" className={`steps ${fourth_step}`}>
            4
          </p>
        </div>

        {!state && (
          <div>
            <StudentInfo studentInformation={auth} />
            <RequestInfo autoInt={autoCompleteInstructor} />
            <div className="wrap">
              <button id="request-complete" onClick={submitStudentRequest}>
                Request Grade Completion
              </button>
            </div>
          </div>
        )}
        {/* CONTENTS IF REQUEST IS VIEW FROM LIST */}

        {state &&
          // (requestItem.requestItem.status === "REQUESTED" ||
          //   requestItem.requestItem.status === "SUBMITTED" ||
          //   requestItem.requestItem.status === "DENIED") &&
          auth.userType === "Faculty" && (
            <div>
              <div className="student-info">
                <p id="stud-info-label">Student Information</p>
                <div className="stud-info-one">
                  <p>Student Name</p>
                  <input
                    placeholder="Student Name"
                    name="stud-name"
                    id="stud-name"
                    value={requestItem.requestItem.student.studentFullname}
                    readOnly
                  />
                </div>
                <div className="stud-info-two">
                  <p>Student Number</p>
                  <input
                    placeholder="Student Number"
                    name="stud-no"
                    id="stud-no"
                    value={requestItem.requestItem.student.studentNumber}
                    readOnly
                  />
                </div>
                <div className="stud-info-three">
                  <p>Course Year and Section</p>
                  <input
                    placeholder="Course"
                    name="stud-course"
                    id="stud-course"
                    value={`${cys1[0]} ${cys1[1]}-${cys1[2]}`}
                    readOnly
                  />
                </div>
                <p id="stud-info-label">Request Information</p>
                <div className="stud-info-one">
                  <p>Subject Code</p>
                  <input
                    name="stud-name"
                    id="stud-name"
                    value={requestItem.requestItem.subjectCode}
                    readOnly
                  />
                </div>
                <div className="stud-info-one">
                  <p>Subject Description</p>
                  <input
                    name="stud-name"
                    id="stud-name"
                    value={requestItem.requestItem.subjectDescription}
                    readOnly
                  />
                </div>
                <div className="stud-info-one">
                  <p>Period Incomplete</p>
                  <input
                    name="stud-name"
                    id="stud-name"
                    value={requestItem.requestItem.incompletePeriod}
                    readOnly
                  />
                </div>
                <div className="stud-info-one">
                  <p>Year Incomplete</p>
                  <input
                    placeholder="Student Name"
                    name="stud-name"
                    id="stud-name"
                    value={requestItem.requestItem.incompleteYear}
                    readOnly
                  />
                </div>
                <div className="stud-info-one">
                  <p>Reason</p>
                  <input
                    type="textarea"
                    name="stud-name"
                    id="stud-name"
                    value={requestItem.requestItem.reason}
                    readOnly
                  />
                </div>
                <div className="stud-info-sign">
                  <p>Signature</p>
                  <img
                    className="student-signature"
                    src={`http://localhost:7700/${requestItem.requestItem.signature.studentSignature}`}
                    alt="Student Signature"
                  />
                </div>

                {(requestItem.requestItem.status === "SUBMITTED" ||
                  requestItem.requestItem.status === "DENIED" ||
                  requestItem.requestItem.status === "PROCESSED" ||
                  requestItem.requestItem.status === "ON PROCESS") &&
                  auth.userType === "Faculty" && (
                    <div>
                      <p>Faculty Response</p>
                      {requestItem.requestItem.grade && (
                        <div>
                          <div>
                            <p>Grade Given</p>
                            <input
                              type="textarea"
                              name="stud-name"
                              id="stud-name"
                              value={requestItem.requestItem.grade}
                              readOnly
                            />
                          </div>
                          <div>
                            <p>Instructor Signature</p>
                            <img
                              className="student-signature"
                              src={`http://localhost:7700/${requestItem.requestItem.signature.instructorSignature}`}
                              alt="Student Signature"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                {(requestItem.requestItem.status === "SUBMITTED" ||
                  requestItem.requestItem.status === "REQUESTED" ||
                  requestItem.requestItem.status === "DENIED") &&
                  auth.userType === "Faculty" && (
                    <div className="student-button-container">
                      <button
                        id="student-approve-button"
                        onClick={submitFacultyResponse}
                      >
                        Approve
                      </button>
                      <button
                        id="student-cancel-button"
                        onClick={() => {
                          Swal.fire({
                            title: "Are you sure?",
                            text: "Denying this request will automatically give a grade of 5",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              Swal.fire(
                                "Success!",
                                "Response has been recorded.",
                                "success"
                              );
                              submitDenyRespose();
                            }
                          });
                        }}
                      >
                        Deny
                      </button>
                    </div>
                  )}
              </div>
              {/* Faculty response Request */}
            </div>
          )}

        {state && auth.userType === "Student" && (
          <div className="processing-student-info">
            <img
              className="processing-gif"
              alt="processing-gif"
              src={require("../../UI/Home_UI/Icons/connect-with-customers.gif")}
              // src="https://cdn.dribbble.com/users/1052957/screenshots/4140274/connect-with-customers.gif"
            />
            <h2
              id={
                requestItem.requestItem.status !== "DENIED"
                  ? "processing-request"
                  : "denied-request"
              }
            >
              Your request has been{" "}
              {requestItem.requestItem.status !== "REQUESTED"
                ? requestItem.requestItem.status.toLowerCase()
                : "sent"}
              .
            </h2>
            <h3
              id={
                requestItem.requestItem.status !== "DENIED"
                  ? "processing-desc"
                  : "denied-desc"
              }
            >
              Response depends on Faculty availability.
            </h3>
          </div>
        )}
        {}
      </div>
    </>
  );
};

export default RequestForm;

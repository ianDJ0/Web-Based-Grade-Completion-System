import axios from "axios";
import React, { useContext } from "react";
import TopNav from "./TopNav";
import Sidebar from "./Sidebar";
import Body from "./Containers/Body";
import { useLocation } from "react-router-dom";
import { AuthenticationContext } from "../../../Components/Shared/context/auth-context";
import { RequestContent } from "../../../Components/Shared/context/request-context";
import Swal from "sweetalert2";
import StudentInfo from "../../../Components/Main/Request/StudentInfo";
import RequestInfo from "../../../Components/Main/Request/RequestInfo";

const AdminRequestForm = (props) => {
  let { state } = useLocation();
  let requestItem = { status: "" };
  let autoCompleteInstructor = "";
  let cys1 = "";
  if (state && state.requestItem) {
    requestItem = state;
    cys1 = requestItem.requestItem.student.studentYearAndSection.split("-");
  }
  if (state && state.autoInstructor) {
    autoCompleteInstructor = state.autoInstructor;
    state = "";
  }
  const auth = useContext(AuthenticationContext);
  const requestContent = useContext(RequestContent);

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
          console.log("Success", response);
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
        console.log("Success", response);
      })
      .catch((error) => {
        alert(error);
      });
  };

  console.log(auth.userType);
  return (
    <>
      <TopNav />
      <Sidebar />
      <Body>
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

        {state &&
          (requestItem.requestItem.status === "REQUESTED" ||
            requestItem.requestItem.status === "SUBMITTED" ||
            requestItem.requestItem.status === "DENIED") && (
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
                    src={`http://localhost:7700/${requestItem.requestItem.signature.studentSignature}`}
                    alt="Student Signature"
                  />
                </div>

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
                          src={`http://localhost:7700/${requestItem.requestItem.signature.instructorSignature}`}
                          alt="Student Signature"
                        />
                      </div>
                    </div>
                  )}
                  <button onClick={submitFacultyResponse}>Approve</button>
                  <button
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
              </div>
              {/* Faculty response Request */}
            </div>
          )}
      </Body>
    </>
  );
};

export default AdminRequestForm;

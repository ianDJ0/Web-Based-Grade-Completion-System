import React from "react";
import { jsPDF } from "jspdf";
import "./PDF.css";
import { useLocation, useNavigate } from "react-router-dom";
const PDF = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const createPDF = async () => {
    const pdf = new jsPDF({
      unit: "px",
      hotfixes: ["px_scaling"],
      width: 850,
      windowWidth: 850,
      height: 1122,
      windowHeight: 1122,
    });
    // const pdf = new jsPDF("portrait", "px", "a4");
    const data = await document.querySelector("#pdf-body");
    pdf.html(data).then(() => {
      pdf.save("Completion Form.pdf");
    });
  };

  const back = () => {
    navigate("/admin/request");
  };
  document.body.style = "background: #8c0000";

  const DATE_OPTIONS = {
    // weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  //DUMMY DATA
  const controlNo = " ";
  const pdfDate = new Date(state.items.dateLog.dateStudent).toLocaleDateString(
    "en-US",
    DATE_OPTIONS
  );
  const profName = state.items.instructor.instructorName;
  const studName = state.items.student.studentFullname;
  const subject =
    state.items.subjectCode + " " + state.items.subjectDescription;
  const semester =
    state.items.incompletePeriod === "1" ? "1st Semester" : "2nd Semester";
  const schoolYrStart = state.items.incompleteYear.slice(2, 4);
  const schoolYrEnd = state.items.incompleteYear.slice(9, 11);
  const reason = state.items.reason;
  const dueDate = " ";
  const isPassed = state.items.grade <= 3 ? true : false;
  const studGrade = parseFloat(state.items.grade);
  const actionDate = new Date(
    state.items.dateLog.dateInstructor
  ).toLocaleDateString("en-US", DATE_OPTIONS);
  const dean = "Dr. Keno Piad";
  const signature =
    "http://localhost:7700/" + state.items.signature.studentSignature;
  const idNo = state.items.student.studentNumber;
  const cys = state.items.student.studentYearAndSection;

  const deanSign =
    "http://localhost:7700/" + state.items.signature.officeSignature; //change the state value to whatever the signature is and append to the localhost ur;
  const profSign =
    "http://localhost:7700/" + state.items.signature.instructorSignature; //change the state value to whatever the signature is and append to the localhost ur;

  return (
    <>
      <button className="btn-pdf-return" onClick={back}>
        Return
      </button>
      <button className="btn-pdf-generate" onClick={createPDF}>
        Create PDF
      </button>

      <div id="pdf-body">
        <div className="pdf-container">
          {/* header */}
          <div className="pdf-heading">
            <img
              id="pdf-bulsu-logo"
              src={require("./bulsu-logo-red.png")}
              alt="bulsu-logo-red"
            />

            <div className="pdf-heading-text">
              <p>Republic of the Philippines</p>
              <h3>BULACAN STATE UNIVERSITY</h3>
              <em>
                <p>Office of the Registrar</p>
              </em>
              <p>City of Malolos, Bulacan</p>
              <p>Tel. no. 919-7800 local 1001 or 1002</p>
            </div>
          </div>

          {/* body */}
          {/* Control No and Date */}
          <div className="pdf-control-no">
            <p className="pdf-control-no-var ans">{controlNo}</p>
            <strong>
              <p>Control No. ________</p>
            </strong>
            <div className="pdf-date-field">
              <p className="pdf-date-var ans">{pdfDate}</p>
              <p className="pdf-date-blank">______________________</p>
              <p className="pdf-date">Date</p>
            </div>
          </div>

          {/* Recipient and Message */}
          <div className="pdf-main-container">
            <div className="pdf-recipient">
              <p className="pdf-recipient-var ans">{profName}</p>
              <p>To: Prof. __________________________,</p>
            </div>
            <p className="pdf-studname-var ans">{studName}</p>
            <p className="pdf-subject-var ans">{subject.toUpperCase()}</p>
            <p className="pdf-semester-var ans">{semester}</p>
            <p className="pdf-schoolYr-start-var ans">{schoolYrStart}</p>
            <p className="pdf-schoolYr-end-var ans">{schoolYrEnd}</p>
            <p className="pdf-reason-var ans">{reason}</p>
            <p className="pdf-duedate-var ans"></p>
            {/* <p className="pdf-duedate-var ans">{dueDate}</p> */}
            <pre className="pdf-indent-pre">
              {`            Mr.    /Ms.    __________________________________________________,    has    an`}
            </pre>
            <pre>
              {`incomplete   grade  in  _____________________________________________  which  he/she `}
            </pre>
            <pre>
              {`took  during  the ___________________________________ trimester/semester/summer  year `}
            </pre>
            <pre>{`20____ - 20_____.`}</pre>

            <pre>{`            The   reason/s for   the   INCOMPLETE as   reflected   in   the grading sheet is / are`}</pre>
            <pre>{`______________________________________________________________________.`}</pre>
            <pre>{`            Please accomplish this form and return to this office not later ____________________.`}</pre>
          </div>

          {/*  Registrar */}
          <div className="pdf-registrar">
            <p>ALBERT B. VILLENA</p>
            <p>Registrar IV</p>
          </div>

          {/* Action taken */}
          <div className="pdf-action-taken">
            {isPassed ? (
              <>
                <img
                  alt="check-mark"
                  className="pass-mark"
                  src={require("./check.png")}
                />

                <p className="pdf-passed-var ans">{studGrade.toFixed(2)}</p>
              </>
            ) : (
              <>
                <img
                  alt="check-mark"
                  className="fail-mark"
                  src={require("./check.png")}
                />
                <p className="pdf-fail-var ans">{studGrade.toFixed(2)}</p>
              </>
            )}
            <p className="pdf-actiondate-var ans">{actionDate}</p>
            <p>ACTION TAKEN</p>
            <div className="pdf-pass-fail">
              <p>PASSED: ________ Rating:__________</p>
              <pre>{`FAILED: ________  Rating:__________`}</pre>
            </div>
            <p>Date: _________________</p>
          </div>

          {/* Noted */}
          <div className="pdf-noted">
            <img
              className="pdf-dean-sign-var"
              alt="dean-signature"
              src={deanSign}
            />
            <p className="pdf-dean-var ans">{dean}</p>
            <p>NOTED:</p>
            <div className="pdf-noted-date">
              <p>____________________________</p>
              <p>Dean</p>
            </div>
          </div>

          {/* Subj Instructor */}
          <div className="pdf-faculty-sign">
            <img
              className="pdf-prof-sign-var"
              alt="instructor-signature"
              src={profSign}
            />
            <p className="pdf-prof-var ans">{profName}</p>
            <p>____________________________</p>
            <p>Subject Instructor/Professor</p>
          </div>

          {/* Distribution of Copies */}
          <div className="pdf-copies">
            <p>Distribution of copies:</p>
            <div className="pdf-copies-list">
              <p>1 &ndash; Registrar&apos;s Office</p>
              <p>1 &ndash; Department Concern</p>
              <p>1 &ndash; Student&apos;s Copy</p>
            </div>
          </div>

          {/* Student Info */}
          <div className="pdf-stud-info">
            {/* <p className="pdf-sign-var ans">{signature}</p> */}
            <img
              className="pdf-sign-var ans"
              alt="student-signature"
              src={signature}
            />
            <p className="pdf-id-var ans">{idNo}</p>
            <p className="pdf-cys-var ans">{cys}</p>
            <p>____________________________</p>
            <p>Student&apos;s Signature</p>
            <p>I.D. No.______________________</p>
            <p>Course/Year &amp; Section _________</p>
          </div>

          {/* Etc */}
          <div className="pdf-etc">
            <strong>
              <p
                className="etc"
                style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
              >
                BulSU-OP-OUR-02F15
              </p>
            </strong>
            <p
              className="etc-small"
              style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
            >
              Revision: 0
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PDF;

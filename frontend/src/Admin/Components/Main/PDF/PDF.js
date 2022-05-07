import React from "react";
import Pdf from "react-to-pdf";
import "./PDF.css";
const PDF = () => {

    const pdfMessage = String.raw`          Mr.      /Ms.      ________________________________________________,    has      an

  incomplete  grade  in  ______________________________________________  which  he/she

  took during the   ___________________________________  trimester/semester/summer  year

  20____ - 20_____.`;

  const pdfReason = String.raw`          The   reason/s  for   the  INCOMPLETE  as   reflected   in   the   grading   sheet   is / are

______________________________________________________________________.

          Please accomplish this form and return to this office not later ____________________.`;

  const ref = React.createRef();

  return (
    <>
      <Pdf targetRef={ref} filename="Completion Form.pdf">
        {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
      </Pdf>
      <div ref={ref} id="pdf-body">
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
          <strong>
            <p>Control No. ________</p>
          </strong>
          <div className="pdf-date-field">
            <p className="pdf-date-blank">______________________</p>
            <p className="pdf-date">Date</p>
          </div>
        </div>

        {/* Recipient and Message */}
        <div className="pdf-main-container">
          <div className="pdf-recipient">
            <p>To: Prof. __________________________,</p>
          </div>
          <pre>{pdfMessage}</pre>
          <pre>{pdfReason}</pre>
        </div>

        {/*  Registrar */}
        <div className="pdf-registrar">
          <p>ALBERT B. VILLENA</p>
          <p>Registrar IV</p>
        </div>

        {/* Action taken */}
        <div className="pdf-action-taken">
          <p>ACTION TAKEN</p>
          <div className="pdf-pass-fail">
            <p>PASSED: ________ Rating:__________</p>
            <p>FAILED: ________ Rating:__________</p>
          </div>
          <p>Date: _________________</p>
        </div>

        {/* Noted */}
        <div className="pdf-noted">
          <p>NOTED:</p>
          <div className="pdf-noted-date">
            <p>____________________________</p>
            <p>Dean</p>
          </div>
        </div>

        {/* Subj Instructor */}
        <div className="pdf-faculty-sign">
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
          <p>____________________________</p>
          <p>Student&apos;s Signature</p>
          <p>I.D. No.______________________</p>
          <p>Course/Year &amp; Section _________</p>
        </div>

        {/* Etc */}
        <div className="pdf-etc">
          <strong>
            <p className="etc">BulSU-OP-OUR-02F15</p>
          </strong>
          <p className="etc-small">Revision: 0</p>
        </div>
      </div>
    </>
  );
};

export default PDF;

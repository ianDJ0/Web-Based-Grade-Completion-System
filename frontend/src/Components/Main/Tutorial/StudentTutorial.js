import React, { useState } from "react";
import Pagination from "./Pagination";
import "./Tutorial.css";
import TutorialCard from "./TutorialCard";

const StudentTutorial = () => {
  const [page, setPage] = useState(1);

  return (
    <>
      <div className="card-content" style={{ style: "none" }}>
        {page === 1 && (
          <TutorialCard
            image={require("../../UI/Home_UI/TutorialImages/stud-step1.png")}
            alt={"step-1"}
            step={"STEP 1"}
            content="Go to Requests Tab in the Side Bar and Click the Request
            Completion Form Button Located on the Upper Right Corner."
          />
        )}
        {page === 2 && (
          <TutorialCard
            image={require("../../UI/Home_UI/TutorialImages/stud-step2.png")}
            alt={"step-2"}
            step={"STEP 2"}
            content="Scroll down and Fill up the Request Information Form. Make sure to
            fill up all the Required Field and Click the Request Grade
            Completion Button."
          />
        )}
        {page === 3 && (
          <TutorialCard
            image={require("../../UI/Home_UI/TutorialImages/stud-step3.png")}
            alt={"step-3"}
            step={"STEP 3"}
            content='Wait for the pop up saying "Request has been sent".'
          />
        )}
        {page === 4 && (
          <TutorialCard
            image={require("../../UI/Home_UI/TutorialImages/stud-step4.png")}
            alt={"step-4"}
            step={"STEP 4"}
            content='After sending the request, it will appear on your Request List
            with "Rquested" status, you can message your Instructor directly
            or wait for your Instructor to Approve your Request.'
          />
        )}
        {page === 5 && (
          <TutorialCard
            image={require("../../UI/Home_UI/TutorialImages/stud-step5.png")}
            alt={"step-5"}
            step={"STEP 5"}
            content='Once your Instructor Approved your Request and Forwarded the
            Request to The Office, your Request Status will change in to
            "Submitted".'
          />
        )}
        {page === 6 && (
          <TutorialCard
            image={require("../../UI/Home_UI/TutorialImages/stud-step6.png")}
            alt={"step-6"}
            step={"STEP 6"}
            content='The Office will Processed your Request and your Request Status
            will change in to " On Process".'
          />
        )}
        {page === 7 && (
          <TutorialCard
            image={require("../../UI/Home_UI/TutorialImages/stud-step7.png")}
            alt={"step-7"}
            step={"STEP 7"}
            content='After 14 days of processing, your Request status will change in to
            "Processed".'
          />
        )}
      </div>
      <Pagination
        source={"request"}
        getPage={(newPage) => {
          console.log(newPage);
          setPage(newPage);
        }}
      />
    </>
  );
};

export default StudentTutorial;

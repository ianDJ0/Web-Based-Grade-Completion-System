import React, { useState } from "react";
import Pagination from "./Pagination";
import TutorialCard from "./TutorialCard";

const FacultyRequest = () => {
  const [page, setPage] = useState(1);
  return (
    <>
      <div className="card-content" style={{ style: "none" }}>
        {page === 1 && (
          <TutorialCard
            image={require("../../UI/Home_UI/TutorialImages/fac-req-tutorial1.png")}
            alt={"step-1"}
            step={"STEP 1"}
            content="Go to the Requests tab on the Side Bar and Look for the List of Request from the Students. You can Click  the List on the table to see more details and to decide whether to Approve or Deny the Request."
          />
        )}
        {page === 2 && (
          <TutorialCard
            image={require("../../UI/Home_UI/TutorialImages/fac-req-tutorial2.png")}
            alt={"step-2"}
            step={"STEP 2"}
            content="Once a List was Clicked, Request Details will show, you can scroll down the details and decide to Approve or Deny the Request."
          />
        )}
        {page === 3 && (
          <TutorialCard
            image={require("../../UI/Home_UI/TutorialImages/Approve 1.png")}
            alt={"step-3"}
            step={"STEP 3"}
            content="If you Approve the Request you can select a grade to give for the Student."
          />
        )}
        {page === 4 && (
          <TutorialCard
            image={require("../../UI/Home_UI/TutorialImages/Approve 2.png")}
            alt={"step-4"}
            step={"STEP 4"}
            content="You can Choose to give a grade of Excellent, Good or Satisfactory from the Dropdown Icon."
          />
        )}
        {page === 5 && (
          <TutorialCard
            image={require("../../UI/Home_UI/TutorialImages/Approve 3.png")}
            alt={"step-5"}
            step={"STEP 5"}
            content='After Choosing a grade, the Request Form will be Submitted to the Office, and a pop up saying "Request has been submitted to Office!" will show'
          />
        )}
        {page === 6 && (
          <TutorialCard
            image={require("../../UI/Home_UI/TutorialImages/Deny 1.png")}
            alt={"step-6"}
            step={"STEP 6"}
            content="If you Deny a Request, A pop up will show to Confirm or Cancel your Action."
          />
        )}
        {page === 7 && (
          <TutorialCard
            image={require("../../UI/Home_UI/TutorialImages/Deny 3.png")}
            alt={"step-7"}
            step={"STEP 7"}
            content='After Denying a Request, A pop up will show saying "Response has been recorded"'
          />
        )}
      </div>

      <Pagination
        source={"request"}
        getPage={(newPage) => {
          setPage(newPage);
        }}
      />
    </>
  );
};

export default FacultyRequest;

import React, { useState } from "react";
import Pagination from "./Pagination";
import "./Tutorial.css";
import TutorialCard from "./TutorialCard";

const TutorialChangePassword = () => {
  const [page, setPage] = useState(1);
  return (
    <>
      <div className="card-content" style={{ style: "none" }}>
        {page === 1 && (
          <TutorialCard
            image={require("../../UI/Home_UI/TutorialImages/EP - step1.png")}
            alt={"step-1"}
            step={"STEP 1 - For changing of password"}
            content="In the top navigation bar, click your name."
          />
        )}
        {page === 2 && (
          <TutorialCard
            image={require("../../UI/Home_UI/TutorialImages/CP - step2.png")}
            alt={"step-2"}
            step={"STEP 2"}
            content="Click the change password button."
          />
        )}
        {page === 3 && (
          <TutorialCard
            image={require("../../UI/Home_UI/TutorialImages/CP - step3.png")}
            alt={"step-3"}
            step={"STEP 3"}
            content="Insert your old password."
          />
        )}
        {page === 4 && (
          <TutorialCard
            image={require("../../UI/Home_UI/TutorialImages/CP - step4.png")}
            alt={"step-4"}
            step={"STEP 4"}
            content="Type in your new password in the new password and confirm new password fields. Make sure the two inputs are the same."
          />
        )}
        {page === 5 && (
          <TutorialCard
            image={require("../../UI/Home_UI/TutorialImages/CP - step5.png")}
            alt={"step-5"}
            step={"STEP 5"}
            content="Click the change password button to save the changes you made."
          />
        )}
      </div>

      <Pagination
        source={"edit"}
        getPage={(newPage) => {
          setPage(newPage);
        }}
      />
    </>
  );
};

export default TutorialChangePassword;

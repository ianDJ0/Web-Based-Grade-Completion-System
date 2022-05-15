import React, { useState } from "react";
import Pagination from "./Pagination";
import TutorialCard from "./TutorialCard";

const TutorialEditProfile = () => {
  const [page, setPage] = useState(1);
  return (
    <>
      <div className="card-content" style={{ style: "none" }}>
        {page === 1 && (
          <TutorialCard
            image={require("../../UI/Home_UI/TutorialImages/EP - step1.png")}
            alt={"step-1"}
            step={"STEP 1 - For updating your profile"}
            content="In the top navigation bar, click your name."
          />
        )}
        {page === 2 && (
          <TutorialCard
            image={require("../../UI/Home_UI/TutorialImages/EP - step2.png")}
            alt={"step-2"}
            step={"STEP 2"}
            content="Click the edit profile button."
          />
        )}
        {page === 3 && (
          <TutorialCard
            image={require("../../UI/Home_UI/TutorialImages/EP - step3.png")}
            alt={"step-3"}
            step={"STEP 3"}
            content="Click add icon to upload your photo from your device."
          />
        )}
        {page === 4 && (
          <TutorialCard
            image={require("../../UI/Home_UI/TutorialImages/EP - step4.png")}
            alt={"step-4"}
            step={"STEP 4"}
            content="You can also change and update your email and contact number."
          />
        )}
        {page === 5 && (
          <TutorialCard
            image={require("../../UI/Home_UI/TutorialImages/EP - step5.png")}
            alt={"step-5"}
            step={"STEP 5"}
            content="Click the save changes button to save the changes you made."
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

export default TutorialEditProfile;

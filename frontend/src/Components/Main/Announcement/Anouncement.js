import React from "react";

import Sidebar from "../../UI/Home_UI/Sidebar";
import TopNav from "../../UI/Home_UI/TopNav";

import "./Announcement.css";

const Anouncement = () => {
  return (
    <>
      <TopNav />
      <Sidebar active={"announcements"} />
      <>{/* announcements here */}</>
    </>
  );
};

export default Anouncement;

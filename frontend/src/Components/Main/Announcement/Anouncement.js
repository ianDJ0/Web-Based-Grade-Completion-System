import React from "react";
import Sidebar from "../../UI/Home_UI/Sidebar";
import TopNav from "../../UI/Home_UI/TopNav";
import SingleAnnouncement from "./Single-Announcement";
import TokenCheck from "../../Shared/Auth";
import "./Announcement.css";


const Anouncement = () => {
  //MAY BUG DITO
  TokenCheck();
  const events = JSON.parse(localStorage.getItem('announcements'))|| []
  return (
    <>
      <TopNav />
      <Sidebar active={"announcements"} />
      
      <div className="body-home">
        <div className="announcement-content">
          
          <SingleAnnouncement AnList={events}/>
        </div>
      </div>

    </>
  );
};

export default Anouncement;

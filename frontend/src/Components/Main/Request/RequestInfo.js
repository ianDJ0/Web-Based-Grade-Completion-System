import React, { useState,useContext } from "react";
import "./RequestInfo.css";
import FindInstructor from "./FindInstructor";
import { RequestContent } from "../../Shared/context/request-context";
import axios from "axios";

const RequestInfo = (props) => {  
  const [search, setSearch]=useState(['User is not Registered']);
  const [visible, setVisible] = useState(false);
  const requestContent = useContext(RequestContent);
  return (
    
    <div className="request-info">
      <p id="request-info-label">Request Information</p>
      <div className="request-info-one">
        <p for="request-fac">Faculty Name</p>
        <input
          placeholder="Search for Faculty"
          name="request-fac"
          id="request-fac"
          onChange={(e) => {
            if(e.target.value )
            axios.post(`http://localhost:7700/api/users/type`, {
              uType: "Faculty",
              findInName: e.target.value ===null ?"zzzzzz":e.target.value
            }).then((response) => {
              setSearch(response.data);
              console.log(e.target.value)
            }).catch((err) => {
              alert(err)
            })
            if(e.target.value===""){
              setVisible(true);
            }else{
              setVisible(false);
            }
          }}
        />
        <FindInstructor componentIsVisible={visible} searchFac={search} setInstructor/>
      </div>
      <div className="request-info-two">
        <p for="request-subj-code">Subject Code</p>
        <input
          placeholder="Subject Code"
          name="request-subj-code"
          id="request-subj-code"
          onChange={(e)=>{
            requestContent.request_SubjectCode = e.target.value
          }}
        />
      </div>
      <div className="request-info-three">
        <p for="request-subj-desc">Subject Description</p>
        <input
          placeholder="Subject Description"
          name="request-subj-desc"
          id="request-subj-desc"
          onChange={(e)=>{
            requestContent.request_SubjectDescription = e.target.value
          }}
        />
      </div>
      <div className="request-info-four">
        <p for="request-subj-sem">Subject Semester</p>
        <input
          placeholder="Subject Semester"
          name="request-subj-sem"
          id="request-subj-sem"
          onChange={(e)=>{
            requestContent.request_SemesterIncomplete = e.target.value
          }}
        />
      </div>
      <div className="request-info-five">
        <p for="request-subj-year">Subject Year</p>
        <input
          placeholder="Subject Year"
          name="request-subj-year"
          id="request-subj-year"
          onChange={(e)=>{
            requestContent.request_YearIncomplete = e.target.value
          }}
        />
      </div>
      <div className="request-info-six">
        <p for="request-reason">Reason</p>
        <input placeholder="Reason" name="request-reason" id="request-reason" onChange={(e)=>{
            requestContent.request_Reason = e.target.value
          }} />
      </div>
    </div>
  );
};
export default RequestInfo;

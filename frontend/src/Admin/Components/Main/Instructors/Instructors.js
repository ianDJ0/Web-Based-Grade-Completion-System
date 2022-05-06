import Sidebar from "../../UI/Sidebar";
import TopNav from "../../UI/TopNav";
import Body from "../../UI/Containers/Body";
import "../../UI/Shared.css";
import "./Instructors.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const Instructors = () => {
  const {state} = useLocation();
  const [searchInstructor, setSearchInstructor] = useState('');
  const [isVerified, setIsverified]= useState('');
  const [instructors, setInstructors] = useState([]);
  if(state){
    setIsverified(false);
  }
  useEffect(()=>{
    axios.post('http://localhost:7700/api/users/type',{
      uType:'Faculty',
      findInName:searchInstructor,
      verified: isVerified, 
    }).then((response)=>{
      setInstructors(response.data)
    }).catch((error)=>{
      alert(error);
    })
  },[searchInstructor, isVerified])
  
  return (
    <>
      <Sidebar />
      <TopNav />
      <Body>
        <h2 id="instructor-label">INSTRUCTORS LIST</h2>
        <div className="list-content">
          <table className="log">
            <tbody>
              <tr id="list-label">
                <th>Name</th>
                <th>Email</th>
                <th>Contact Number</th>
                <th>Status</th>
              </tr>
              {instructors.length>0 &&
                instructors.map((instructor) => {
                  return (
                    <tr key={instructor._id} onClick={()=>{
                      //nevigate to profile page
                    }}>
                      <th>{instructor.fullName}</th>
                      <th>{instructor.email}</th>
                      <th>{instructor.contactNumber}</th>
                      <th>{instructor.verified?"Verified":"Unverified"}</th>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </Body>
    </>
  );
};

export default Instructors;

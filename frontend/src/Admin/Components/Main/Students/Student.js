import Sidebar from "../../UI/Sidebar";
import TopNav from "../../UI/TopNav";
import Body from "../../UI/Containers/Body";
import "../../UI/Shared.css";
import "./Student.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Student = () => {
  const {state} = useLocation();
  const [searchStudent, setSearchStudent] = useState('');
  const [students, setStudents] = useState([]);

  useEffect(()=>{
    axios.post('http://localhost:7700/api/users/type',{
      uType:'Student',
      findInName:searchStudent,
    }).then((response)=>{
      setStudents(response.data)
    }).catch((error)=>{
      alert(error);
    })
  },[searchStudent])
  


  return (
    <>
      <Sidebar />
      <TopNav />
      <Body>
        <h2 id="instructor-label">STUDENT LIST</h2>
        <div className="list-content">
          <table className="log">
            <tbody>
              <tr id="instructor-label">
                <th>Student Number</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact Number</th>
              </tr>
              {students.length>0 &&
                students.map((student) => {
                  return (
                    <tr key={student._id} onClick={()=>{
                      //nevigate to profile page
                    }}>
                      <th>{student.studentNumber}</th>
                      <th>{student.fullName}</th>
                      <th>{student.email}</th>
                      <th>{student.contactNumber}</th>
                      
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

export default Student;

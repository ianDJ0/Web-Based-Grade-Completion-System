import Sidebar from "../../UI/Sidebar";
import TopNav from "../../UI/TopNav";
import Body from "../../UI/Containers/Body";
import "../../UI/Shared.css";
import "./Student.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminSearch from "../../UI/AdminSearch";
import Pagination from "../../UI/Pagination";

const Student = () => {
  const { state } = useLocation();
  const [searchStudent, setSearchStudent] = useState("");
  const [students, setStudents] = useState([]);
  const [current, setCurrent] = useState(1);
  const [entry, setEntry] = useState(7);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .post("http://localhost:7700/api/users/type", {
        uType: "Student",
        findInName: searchStudent,
      })
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, [searchStudent]);

  const indexOfLastEntry = current * entry;
  const indexOfFirstEntry = indexOfLastEntry - entry;
  const currentEntry = students.slice(indexOfFirstEntry, indexOfLastEntry);
  const paginate = (pageNumber) => setCurrent(pageNumber);
  return (
    <>
      <Sidebar active={"student"} />
      <TopNav />
      <Body>
        <AdminSearch
          entity={"student"}
          change={(query) => {
            setSearchStudent(query);
          }}
        />
        <button
          id="admin-create-account"
          onClick={() => {
            navigate("/admin/create", { state: { source: "Student" } });
          }}
        >
          Create account
        </button>
        <h2 id="instructor-label">STUDENT LIST</h2>
        <div className="list-content">
          <table className="log" cellSpacing={0}>
            <tbody>
              <tr id="instructor-label">
                <th>Student Number</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact Number</th>
              </tr>
              {currentEntry.length > 0 &&
                currentEntry.map((student) => {
                  return (
                    <tr
                      className="student-tabler-tr"
                      key={student._id}
                      onClick={() => {
                        navigate("/admin/profile", {
                          state: { user: student },
                        });
                      }}
                    >
                      <th>{student.studentNumber}</th>
                      <th>{student.fullName}</th>
                      <th>{student.email}</th>
                      <th>{student.contactNumber}</th>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <Pagination
          postsPerPage={entry}
          totalPosts={students.length}
          paginate={paginate}
        />
      </Body>
    </>
  );
};

export default Student;

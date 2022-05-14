import Sidebar from "../../UI/Sidebar";
import TopNav from "../../UI/TopNav";
import Body from "../../UI/Containers/Body";
import "../../UI/Shared.css";
import "./Instructors.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSearch from "../../UI/AdminSearch";
const Instructors = () => {
  const navigate = useNavigate();
  const [searchInstructor, setSearchInstructor] = useState("");
  const [isVerified, setIsverified] = useState("");
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:7700/api/users/type", {
        uType: "Faculty",
        findInName: searchInstructor,
        verified: isVerified,
      })
      .then((response) => {
        setInstructors(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, [searchInstructor, isVerified]);

  return (
    <>
      <Sidebar active={'instructor'} />
      <TopNav />
      <Body>
        <AdminSearch
          entity={"instructor"}
          change={(query) => {
            setSearchInstructor(query);
          }}
        />
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
              {instructors.length > 0 &&
                instructors.map((instructor) => {
                  return (
                    <tr
                      key={instructor._id}
                      onClick={() => {
                        navigate("/admin/profile", {
                          state: { user: instructor },
                        });
                      }}
                    >
                      <th>{instructor.fullName}</th>
                      <th>{instructor.email}</th>
                      <th>{instructor.contactNumber}</th>
                      <th>{instructor.verified ? "Verified" : "Unverified"}</th>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </Body>
    </>
  );
};

export default Instructors;

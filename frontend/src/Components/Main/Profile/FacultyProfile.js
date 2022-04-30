import { useNavigate, useParams } from "react-router-dom";
import TopNav from "../../UI/Home_UI/TopNav";
import Sidebar from "../../UI/Home_UI/Sidebar";
import "./FacultyProfile.css";

const FacultyProfile = (props) => {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  return (
    <>
      <TopNav />
      <Sidebar active={""} />
      <div className="search-faculty-profile">
        <div id="bulsu-header">
          <button
            id="request-faculty"
            onClick={() => {
              navigate("/request/form");
            }}
          >
            Request Completion Form
          </button>
          <button
            id="send-msg"
            onClick={() => {
              alert("message click");
            }}
          >
            Message
          </button>
          <div id="search-faculty-profile">
            <img
              alt={"wallpaper-img"}
              src={require("../../UI/Home_UI/Icons/image-wallpaper-15.jpg")}
              id="search-faculty-img"
            />
            <p id="search-faculty-name">John Doe</p>
            <p id="search-faculty-college">
              College of Information and Communications Technology
            </p>
          </div>
          <div className="search-faculty-email">
            <p>Email</p>
            <p id="search-email">johndoe@gmail.com</p>
          </div>
          <div className="search-faculty-number">
            <p>Contact Number</p>
            <p id="search-number">09123456789</p>
          </div>
          <div className="search-faculty-bday">
            <p>Birthday</p>
            <p id="search-bday">January 1, 1968</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default FacultyProfile;

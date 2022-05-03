import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-sidebar">
      <div className="admin-name-logo">
        <img
          alt="bulsu-logo"
          src={require("../../../Components/UI/Home_UI/Icons/bulsu-logo.png")}
          id="bulsu-logo"
        />
        <h3 id="admin-site-name">BULSU</h3>
        <br />
      </div>

      <span
        id="nav-dashboard"
        onClick={() => {
          navigate("/admin");
        }}
      >
        <i className="fa fa-tachometer"></i>
        <div className="title"> Dashboard </div>
      </span>

      <span
        onClick={() => {
          navigate("/admin/faculty");
        }}
      >
        <i className="fa fa-user"></i>
        <div className="title"> Instructors</div>
      </span>

      <span
        onClick={() => {
          navigate("/admin/student");
        }}
      >
        <i className="fa fa-users"></i>
        <div className="title"> Students </div>
      </span>

      <span
        onClick={() => {
          alert("Click");
        }}
      >
        <i className="fa fa-envelope"></i>
        <div className="title"> Requests </div>
      </span>
    </div>
  );
};

export default Sidebar;

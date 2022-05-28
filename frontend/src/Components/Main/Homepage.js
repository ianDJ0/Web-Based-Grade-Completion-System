// import React, { useContext } from "react";
import Sidebar from "../UI/Home_UI/Sidebar";
import TopNav from "../UI/Home_UI/TopNav";
// import { AuthenticationContext } from "../Shared/context/auth-context";
import TokenCheck from "../Shared/Auth";
import Footer from "../UI/Home_UI/Footer/Footer";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Homepage = (props) => {
  TokenCheck();
  const [vmgo, setVmgo] = useState({
    vision: "",
    mission: "",
    goals: "",
    objective: ""
  })
  const [logo, setLogo] = useState('uploads\\images\\bulsu-logo.png');

  // const auth = useContext(AuthenticationContext);
  const navigate = useNavigate();
  useEffect(() => {
    axios.post("http://localhost:7700/api/announcements/getVMGO")
      .then(response => {
        setVmgo(response.data)
        setLogo(response.data.logo);
      }).catch(error => {
        alert(error)
      })
  }, [])
  return (
    <>
      <TokenCheck />
      <TopNav />
      <Sidebar active={"homepage"} />
      <div className="home-punch">
        <h3 id="home-opening-line">Keep track of your form requests.</h3>
        <p id="home-opening-sub">
          Find out the status of your request by navigating to the requests page.
        </p>
        <span
          onClick={() => {
            navigate("/requests");
          }}
          id="opening-navigate-btn"
        >
          <button className="home-opening-btn">
            FIND OUT NOW
            <span className="fas fa-angle-double-right"></span>
          </button>
        </span>
      </div>

      <div className="home-aboutus">
        <h3 id="home-aboutus-label">ABOUT US</h3>
        <p id="home-aboutus-info">
          The students with an incomplete grade can request for completion
          requirements. The user can monitor the students requirements that need
          to be complete. May help the user to track a given activities to the
          students until it was completed. The Students will be notified for
          processing period about 14 days once the completion form has been
          made.
        </p>
        <div className="bulsu-vmgo">
          {/* VMGO */}
          <h1 id="vmgo-label">VMGO</h1>
          <div className="vmgo-vision">
            <h2>Vision</h2>
            <p>{vmgo.vision}</p>
          </div>

          <div className="vmgo-mission">
            <h2>Mission</h2>
            <p>{vmgo.mission}</p>
          </div>

          <div className="vmgo-goals">
            <h2 id="vmgo-goals-label">Goals</h2>
            <pre>{vmgo.goals}</pre>
          </div>

          <div className="vmgo-objective">
            <h2 id="vmgo-objective-label">Objective</h2>
            <pre>{vmgo.objective}</pre>
          </div>
          {/* end vmgo */}
        </div>

        <div className="home-get-started">
        <img
          alt="bulsu-logo"
          src={`http://localhost:7700/${logo}`}
          id="home-bulsu-logo"
        />
        <div className="to-tutorial">
          <h3 id="system-title-label">Grade Completion System</h3>
          <p id="tutorial-sub-desc">
            Know more about how to use the Bulacan State University grade
            completion system
          </p>
          <button
            id="navigate-tutorial"
            onClick={() => {
              navigate("/tutorial");
            }}
          >
            GO TO TUTORIALS PAGE
          </button>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
};
export default Homepage;

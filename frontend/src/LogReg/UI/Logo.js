import React from "react";
import "./Logo.css";

const Logo = () => {
  return (
    <React.Fragment>
        {/*Dunno whyy pa, pero this makes the logreg component go down(?), maybe dahil div?*/}
        {/* <div className="logo-name-icon">
            <img src="https://bit.ly/3rmsS90" id="bulsu-logo" alt="BulSU Logo"/>
            <h3 id="site-name">BULACAN STATE UNIVERSITY</h3>
        </div> */}
      <img src="https://bit.ly/3EgPvkD" id="logreg-design" alt="App Logo" />
    </React.Fragment>
  );
};

export default Logo;

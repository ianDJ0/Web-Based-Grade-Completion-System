import React from "react";
import "./Tutorial.css";

const TutorialCard = (props) => {
  return (
    <div className="card">
      <div className="image-container">
        <img className="card-image" alt={props.alt} src={props.image} />
      </div>
      <div className="card-info">
        <h3>{props.step}</h3>
        <p>{props.content}</p>
      </div>
    </div>
  );
};

export default TutorialCard;

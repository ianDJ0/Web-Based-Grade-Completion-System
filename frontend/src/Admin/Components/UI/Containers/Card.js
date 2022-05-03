import "./Card.css";

const Card = (props) => {
  return (
    <div className="card-component">
      <div>{props.children}</div>
      <div className="icon-box">
        <i className={props.class}></i>
      </div>
    </div>
  );
};

export default Card;

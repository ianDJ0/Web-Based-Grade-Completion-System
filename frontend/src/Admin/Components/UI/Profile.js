import "./Profile.css";

const Profile = (props) => {
  return (
    <div id="instructor-profile">
      <img alt="intructor-profile" src={props.img} id="instructor-img" />
      <p id="instructor-name">{props.name}</p>
      <p id="instructor-college">{props.college}</p>
    </div>
  );
};

export default Profile;

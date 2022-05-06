import "./Notifications.css";

const Notifications = (props) => {
  return (
    <div
      className="notifications"
    >
      <h2>Notifications</h2>
      <hr />
      {props.notifications ? (
        <h3>No notifications</h3>
      ) : (
        <div>
          <li
            onClick={() => {
              alert("click");
            }}
            className="notification"
          >
            Notification 1
          </li>
          <li
            onClick={() => {
              alert("click");
            }}
            className="notification"
          >
            Notification 1
          </li>
          <li
            onClick={() => {
              alert("click");
            }}
            className="notification"
          >
            Notification 1
          </li>
        </div>
      )}
    </div>
  );
};

export default Notifications;

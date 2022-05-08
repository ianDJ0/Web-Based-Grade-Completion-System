import "./Notifications.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Notifications = (props) => {

  const navigate = useNavigate();
  console.log("Notification Props", props.notificationProps);



  return (
    <div
      className="notifications"
    >
      <h2>Notifications</h2>
      <hr />
      {props.notificationProps <= 0 ? (
        <h3>No notifications</h3>
      ) : (
        <div>
          {props.notificationProps.length > 0 &&
            props.notificationProps.map((notification) => {
              return <li className="notification" key={notification._id} onClick={() => {
                axios.all([
                  axios.post('http://localhost:7700/api/request/getOne', {
                    requestID: notification.requestCode
                  }),
                  axios.post('http://localhost:7700/api/request/viewNotification', {
                    notificationID: notification._id
                  })
                ]).then(axios.spread((redirectRequest, viewRequest) => {
                  props.viewNotif();
                    navigate("/request/form", {
                      state: { requestItem: redirectRequest.data },
                    })
                }))
              }}>
                {notification.seen === false ? <b>{notification.contents}</b> : notification.contents}
              </li>
            })
          }
        </div>
      )}
    </div>
  );
};

export default Notifications;

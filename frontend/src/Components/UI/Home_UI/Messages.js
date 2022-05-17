import "./Messages.css";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../Shared/context/auth-context";
import { MessageContext } from "../../Shared/message-context";
import axios from "axios";

const Messages = (props) => {
  const auth = useContext(AuthenticationContext);
  const messageContext = useContext(MessageContext);
  const [latest, setLatestMessages] = useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:7700/api/users/getLatestMessages", {
        currentUserID: auth.userId,
      })
      .then((response) => {
        setLatestMessages(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
  const DATE_OPTIONS = {
    // weekday: "short",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  return (
    <div id="messages-container">
      <div id="messages-container-header">
        <h2>Messages</h2>
      </div>
      <hr />
      <div id="messages-container-body">
        {props.messages ? (
          <h3 id="no-messages-default">No messages</h3>
        ) : (
          <>
            
            {latest.length > 0 &&
              latest.map((message) => {
                let partnerID = "";
                let partnerName = "";
                if (message.receiver.receiverID === auth.userId) {
                  partnerID = message.sender.senderID;
                  partnerName = message.sender.senderName;
                } else {
                  partnerID = message.receiver.receiverID;
                  partnerName = message.sender.receiverName;
                }

                return (
                  <div
                    className="message"
                    key={message._id}
                    onClick={() => {
                      props.partnerSet(partnerID);
                      messageContext.passFacultyID = partnerID;
                      messageContext.passFacultyName = partnerName;
                      props.onMessage();
                    }}
                  >
                    <h4>{auth.userFullName !== message.sender.senderName ? message.sender.senderName : message.receiver.receiverName}</h4>
                    <p className="message-content">{message.contents}</p>
                    <p className="message-date">
                      {new Date(message.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      {new Date(message.date).toLocaleDateString(
                        "en-US",
                        DATE_OPTIONS
                      )}
                    </p>
                  </div>
                );

              })}
          </>
        )}
      </div>
    </div>
  );
};

export default Messages;

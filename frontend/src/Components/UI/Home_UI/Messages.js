import "./Messages.css";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../Shared/context/auth-context";
import axios from "axios";

const Messages = (props) => {
  const auth = useContext(AuthenticationContext);
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
                if (message.receiver === auth.userId) {
                  partnerID = message.sender.senderID;
                } else {
                  partnerID = message.receiver;
                }

                return (
                  <div
                    className="message"
                    key={message._id}
                    onClick={() => {
                      props.partnerSet(partnerID);
                      props.onMessage();
                    }}
                  >
                    <h4>{message.sender.senderName}</h4>
                    <p className="message-content">{message.contents}</p>
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

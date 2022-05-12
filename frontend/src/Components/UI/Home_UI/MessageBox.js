import { useEffect, useRef, useState, useContext } from "react";
import { AuthenticationContext } from "../../Shared/context/auth-context";
import axios from "axios";
import "./MessageBox.css";

const AlwaysScrollToBottom = () => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};

const MessageBox = (props) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);
  const auth = useContext(AuthenticationContext);
  const [conversation, setConversation] = useState([]);
  const [partnerName, setPartnerName] = useState("");
  useEffect(() => {
    setInterval(() => {
      axios
        .post("http://localhost:7700/api/users/getMessages", {
          currentUserID: auth.userId,
          partnerID: props.partner,
        })
        .then((response) => {
          if (
            conversation !== response.data &&
            response.data.length > conversation.length
          ) {
            setConversation(response.data);
          }
        })
        .catch((err) => {
          alert(err);
        });
    }, 5000);
    axios
      .get(`http://localhost:7700/api/users/findUser/${props.partner}`)
      .then((response) => {
        setPartnerName(response.data.fullName);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
  const DATE_OPTIONS = {
    // weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return (
    <div id="chat-box-container">
      <div id="chat-box-header">
        <div className="chat-box-name">{partnerName}</div>
        <div className="close-chat" onClick={props.closeChat}>
          close
        </div>
        {/* <i className="fa-solid fa-xmark fa-2xs show"></i> */}
      </div>
      <div id="chat-box-messages">
        {conversation.length > 0 &&
          conversation.map((mes) => {
            if (mes.sender.senderID !== auth.userId) {
              return (
                <div className="received-message" key={mes._id}>
                  <p>{mes.contents}</p>
                  <div className="receive-time">
                    {new Date(mes.date).toLocaleDateString(
                      "en-US",
                      DATE_OPTIONS
                    )}{" "}
                    {new Date(mes.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              );
            }
            return (
              <div className="sent-message" key={mes._id}>
                <p>{mes.contents}</p>
                <div className="sent-time">
                  {new Date(mes.date).toLocaleDateString("en-US", DATE_OPTIONS)}{" "}
                  {new Date(mes.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            );
          })}

        <AlwaysScrollToBottom />
      </div>
      <div id="chat-box-controls">
        <div className="message-input-box">
          <input
            ref={inputRef}
            id="message-input"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            type="text"
            placeholder="Aa"
          />
          <button
            id="message-send"
            className="fa fa-send"
            onClick={() => {
              setMessage("");
              axios
                .post("http://localhost:7700/api/users/sendMessage", {
                  receiverID: props.partner,
                  senderID: auth.userId,
                  senderName: auth.userFullName,
                  contents: inputRef.current.value,
                })
                .then((response) => {})
                .catch((err) => {
                  alert(err);
                });
              inputRef.current.value = "";
            }}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;

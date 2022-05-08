import { useState } from "react";
import "./MessageBox.css";

const MessageBox = (props) => {
  const [message, setMessage] = useState("");
  console.log(message);
  return (
    <div id="chat-box-container">
      <div id="chat-box-header">
        <div className="chat-box-name">NAME</div>
        <div className="close-chat" onClick={props.closeChat}>
          close
        </div>
        {/* <i className="fa-solid fa-xmark fa-2xs show"></i> */}
      </div>
      <div id="chat-box-messages">
        {/* <div className="received-message">
          <div className="received-message-text">Lorem ipsum</div>
          <div className="receive-time">some time.jpeg</div>
        </div>
        <div className="sent-mesage">
          <div className="sent-message-text">Lorem ipsum</div>
          <div className="sent-time">some time.jpeg</div>
        </div> */}
      </div>
      <div id="chat-box-controls">
        <div className="message-input-box">
          <input
            id="message-input"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            type="text"
          />
          <button
            id="message-send"
            onClick={() => {
              alert("send " + message);
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;

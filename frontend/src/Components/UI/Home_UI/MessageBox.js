import { useEffect, useRef, useState } from "react";
import "./MessageBox.css";

const AlwaysScrollToBottom = () => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};

const MessageBox = (props) => {
  const [message, setMessage] = useState("");
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
        <div className="received-message">
          <p>
            What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum.
          </p>
          <div className="receive-time">some time.jpeg</div>
        </div>
        <div className="sent-message">
          <p>
            Why do we use it? It is a long established fact that a reader will
            be distracted by the readable content of a page when looking at its
            layout. The point of using Lorem Ipsum is that it has a more-or-less
            normal distribution of letters, as opposed to using 'Content here,
            content here', making it look like readable English. Many desktop
            publishing packages and web page editors now use Lorem Ipsum as
            their default model text, and a search for 'lorem ipsum' will
            uncover many web sites still in their infancy. Various versions have
            evolved over the years, sometimes by accident, sometimes on purpose
            (injected humour and the like).
          </p>
          <div className="sent-time">some time.jpeg</div>
        </div>
        <AlwaysScrollToBottom />
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
            placeholder="Aa"
          />
          <button
            id="message-send"
            className="fa fa-send"
            onClick={() => {
              alert("send " + message);
            }}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;

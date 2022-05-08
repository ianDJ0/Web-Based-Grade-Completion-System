import "./Messages.css";

const Messages = (props) => {
  return (
    <div id="messages-container">
      <div id="messages-container-header">
        <h2>Messages</h2>
      </div>
      <hr />
      <div id="messages-container-body">
        {!props.messages ? (
          <>
            <div className="message" onClick={props.onMessage}>
              {" "}
              {/** Could prolly pass the message object here */}
              <h4>Sender</h4>
              <p className="message-content">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae,
                distinctio.
              </p>
            </div>
            <div className="message" onClick={props.onMessage}>
              <h4>Sender</h4>
              <p className="message-content">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae,
                distinctio.
              </p>
            </div>
          </>
        ) : (
          <h3 id="no-messages-default">No messages</h3>
        )}
      </div>
    </div>
  );
};

export default Messages;

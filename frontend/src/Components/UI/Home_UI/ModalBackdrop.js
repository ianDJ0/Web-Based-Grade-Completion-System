import ReactDom from "react-dom";

import "./ModalBackdrop.css";

const ModalBackdrop = (props) => {
  return ReactDom.createPortal(
    <div className="modal-bg" onClick={props.onClose}>
      <button id="cancel-request" onClick={props.onClose}>
        X
      </button>
      <div className="step-count">{props.children}</div>
    </div>,
    document.getElementById("modal-portal")
  );
};

export default ModalBackdrop;

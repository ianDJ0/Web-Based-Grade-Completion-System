import ReactDom from "react-dom";

import "./ModalBackdrop.css";

const ModalBackdrop = (props) => {
  return ReactDom.createPortal(
    //dapat i portal tong modal bg para onClick={props.onClose}
    <div className="modal-bg" >
      <button id="cancel-request" onClick={props.onClose}>
        X
      </button>
      <div className="step-count">{props.children}</div>
    </div>,
    document.getElementById("modal-portal")
  );
};

export default ModalBackdrop;

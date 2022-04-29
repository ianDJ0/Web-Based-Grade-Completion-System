import RequestInfo from "../../Main/Request/RequestInfo";
import StudentInfo from "../../Main/Request/StudentInfo";
import ModalBackdrop from "./ModalBackdrop";
import "./RequestModal.css";

const RequestModal = (props) => {
  if (!props.open) return null;
  return (
    <ModalBackdrop onClose={props.onClose}>
      <div className="request-modal">
        <h2 id="modal-label">GRADE COMPLETION FORM</h2>
        <div className="process-track">
          <p id="first-step">1</p>
          <div className="col-3">
            <div className="snippet">
              <div className="stage">
                <div className="dot-flashing finished-process"></div>
              </div>
            </div>
          </div>
          <p id="second-step">2</p>
          <div className="col-3">
            <div className="snippet">
              <div className="stage">
                <div className="dot-flashing active-process"></div>
              </div>
            </div>
          </div>
          <p id="third-step">3</p>
          <div className="col-3">
            <div className="snippet">
              <div className="stage">
                <div className="dot-flashing non-active-process"></div>
              </div>
            </div>
          </div>
          <p id="fourth-step">4</p>
        </div>
        <StudentInfo />

        <RequestInfo />
        <div className="wrap">
          <button id="request-complete">Request Grade Completion</button>
        </div>
      </div>
    </ModalBackdrop>
  );
};

export default RequestModal;

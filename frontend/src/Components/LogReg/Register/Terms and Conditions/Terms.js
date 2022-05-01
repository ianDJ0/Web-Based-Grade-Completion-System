import ModalBackdrop from "../../../UI/Home_UI/ModalBackdrop";
import "./Terms.css";
const Terms = (props) => {
  return (
    <>
      <ModalBackdrop>
        <div className="center">
          <iframe src="https://docs.google.com/document/d/e/2PACX-1vTIGXrigaqFL5HJ3tcdTbsMCmPT0-bnTXtz2pux43TGz86xIAcctQXTGslarpNT72OMKo7XYwS4pcCu/pub?embedded=true"></iframe>
          <div className="btn-container">
            <button onClick={props.cancel} className="cancel-btn">
              Cancel
            </button>
            <button onClick={props.accept} className="accept-btn">
              Accept
            </button>
          </div>
        </div>
      </ModalBackdrop>
    </>
  );
};

export default Terms;

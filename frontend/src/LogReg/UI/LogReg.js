import LogRegButton from "./LogRegButton";

import "./LogReg.css";

const LogReg = (props) => {
  return (
    <div className="logreg-body">
      <LogRegButton />
      <div className="logreg-form">{props.children}</div>
    </div>
  );
};

export default LogReg;

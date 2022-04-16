import LogRegButton from "./LogRegButton";

import "./LogReg.css";

const LogReg = (props) => {
  const choice = props.choice;

  return (
    <div className="logreg-body">
      <LogRegButton choice={choice} />
      <div className="logreg-form">{props.children}</div>
    </div>
  );
};

export default LogReg;

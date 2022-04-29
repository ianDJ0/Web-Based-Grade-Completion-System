import "./RequestInfo.css";

const RequestInfo = () => {
  return (
    <div className="request-info">
      <p id="request-info-label">Request Information</p>
      <div className="request-info-one">
        <p for="request-fac">Faculty Name</p>
        <input
          placeholder="Search for Faculty"
          name="request-fac"
          id="request-fac"
        />
      </div>
      <div className="request-info-two">
        <p for="request-subj-code">Subject Code</p>
        <input
          placeholder="Subject Code"
          name="request-subj-code"
          id="request-subj-code"
        />
      </div>
      <div className="request-info-three">
        <p for="request-subj-desc">Subject Description</p>
        <input
          placeholder="Subject Description"
          name="request-subj-desc"
          id="request-subj-desc"
        />
      </div>
      <div className="request-info-four">
        <p for="request-subj-sem">Subject Semester</p>
        <input
          placeholder="Subject Semester"
          name="request-subj-sem"
          id="request-subj-sem"
        />
      </div>
      <div className="request-info-five">
        <p for="request-subj-year">Subject Year</p>
        <input
          placeholder="Subject Year"
          name="request-subj-year"
          id="request-subj-year"
        />
      </div>
      <div className="request-info-six">
        <p for="request-reason">Reason</p>
        <input placeholder="Reason" name="request-reason" id="request-reason" />
      </div>
    </div>
  );
};
export default RequestInfo;

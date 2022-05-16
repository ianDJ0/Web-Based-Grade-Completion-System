import React from "react";
import Body from "../UI/Containers/Body";
import Sidebar from "../UI/Sidebar";
import TopNav from "../UI/TopNav";
import "./EditVMGO.css";

const EditVMGO = () => {
  return (
    <>
      <TopNav />
      <Sidebar />
      <Body>
        <div className="edit-vmgo-body">
          <form>
            <div>
              <label htmlFor="vision">VISION</label>
              <textarea id="vision" name="vision" />
            </div>
            <div>
              <label htmlFor="mision">MISION</label>
              <textarea id="mision" name="mision" />
            </div>
            <div>
              <label htmlFor="goals">GOALS</label>
              <textarea id="goals" name="goals" />
            </div>
            <div>
              <label htmlFor="objectives">GOALS</label>
              <textarea id="objectives" name="objectives" />
            </div>
            <input type="submit" />
          </form>
        </div>
      </Body>
    </>
  );
};

export default EditVMGO;

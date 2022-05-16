import React from "react";
import { useFormik } from "formik";
import Body from "../UI/Containers/Body";
import Sidebar from "../UI/Sidebar";
import TopNav from "../UI/TopNav";
import "./EditVMGO.css";

const EditVMGO = () => {
  const formik = useFormik({
    initialValues: {
      vision: "",
      mision: "",
      goals: "",
      objectives: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <>
      <TopNav />
      <Sidebar />
      <Body>
        <div className="edit-vmgo-body">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="vision">VISION</label>
              <textarea
                id="vision"
                name="vision"
                onChange={formik.handleChange}
                value={formik.values.vision}
              />
            </div>
            <div>
              <label htmlFor="mision">MISION</label>
              <textarea
                id="mision"
                name="mision"
                onChange={formik.handleChange}
                value={formik.values.mision}
              />
            </div>
            <div>
              <label htmlFor="goals">GOALS</label>
              <textarea
                id="goals"
                name="goals"
                onChange={formik.handleChange}
                value={formik.values.goals}
              />
            </div>
            <div>
              <label htmlFor="objectives">GOALS</label>
              <textarea
                id="objectives"
                name="objectives"
                onChange={formik.handleChange}
                value={formik.values.objectives}
              />
            </div>
            <input type="submit" />
          </form>
        </div>
      </Body>
    </>
  );
};

export default EditVMGO;

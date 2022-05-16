import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Body from "../UI/Containers/Body";
import Sidebar from "../UI/Sidebar";
import TopNav from "../UI/TopNav";
import "./EditVMGO.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const EditVMGO = () => {
  const navigate = useNavigate();
  const [getVision, setVision] = useState('');
  const [getMission, setMission] = useState('');
  const [getGoals, setGoals] = useState('');
  const [getObjectives, setObjectives] = useState('');


  useEffect(() => {
    axios.post("http://localhost:7700/api/announcements/getVMGO")
      .then(response => {
        setVision(response.data.vision);
        setMission(response.data.mission);
        setGoals(response.data.goals);
        setObjectives(response.data.objective);

      }).catch(error => {
        alert(error)
      })
  }, [])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      vision: getVision,
      mission: getMission,
      goals: getGoals,
      objectives: getObjectives,
    },
    onSubmit: (values) => {
      axios.post("http://localhost:7700/api/announcements/editVMGO", values)
        .then(response => {
          Swal.fire({
            title: 'Edit VMGO',
            text: "Confirm Save",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/admin");
            }
          })
        }).catch(error => {
          alert(error)
        })
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
                defaultValue={getVision}
              />
            </div>
            <div>
              <label htmlFor="mision">MISION</label>
              <textarea
                id="mision"
                name="mision"
                onChange={formik.handleChange}
                defaultValue={getMission}
              />
            </div>
            <div>
              <label htmlFor="goals">GOALS</label>
              <textarea
                id="goals"
                name="goals"
                onChange={formik.handleChange}
                defaultValue={getGoals}
              />
            </div>
            <div>
              <label htmlFor="objectives">OBJECTIVES</label>
              <textarea
                id="objectives"
                name="objectives"
                onChange={formik.handleChange}
                defaultValue={getObjectives}
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

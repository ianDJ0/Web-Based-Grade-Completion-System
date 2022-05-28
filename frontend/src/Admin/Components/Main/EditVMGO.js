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
  const [getVision, setVision] = useState("");
  const [getMission, setMission] = useState("");
  const [getGoals, setGoals] = useState("");
  const [getObjectives, setObjectives] = useState("");
  const [getLogo, setLogo] = useState("");
  const [getTitle, setTitle] = useState("");
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreview(fileReader.result);
    };
    fileReader.readAsDataURL(file);
    console.log(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
    }
  };
  //change logo
  const submitChange = () => {
    let formData = new FormData();

    if (file) {
      formData.append("image", file);
    }
    axios
      .post("http://localhost:7700/api/announcements/editLogo", formData)
      .then(function (response) {
        Swal.fire({
          icon: "success",
          title: "Edit Sucessful!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          // navigate("/profile");
        });
      })
      .catch((error) => {});
  };

  useEffect(() => {
    axios
      .post("http://localhost:7700/api/announcements/getVMGO")
      .then((response) => {
        setVision(response.data.vision);
        setMission(response.data.mission);
        setGoals(response.data.goals);
        setObjectives(response.data.objective);
        setLogo(response.data.logo);
        setTitle(response.data.name);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      vision: getVision,
      mission: getMission,
      goals: getGoals,
      objectives: getObjectives,
    },
    onSubmit: (values) => {
      axios
        .post("http://localhost:7700/api/announcements/editVMGO", values)
        .then((response) => {
          Swal.fire({
            title: "Edit VMGO",
            text: "Confirm Save",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/admin");
            }
          });
        })
        .catch((error) => {
          alert(error);
        });
    },
  });
  const formikTitle = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: getTitle,
    },
    onSubmit: (values) => {
      Swal.fire({
        title: "Edit App Title",
        text: "Confirm Save",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post(
            "http://localhost:7700/api/announcements/editTitle",
            values
          );
          navigate("/admin");
        }
      });
    },
  });
  return (
    <>
      <TopNav />
      <Sidebar />
      <Body>
        <div className="edit-vmgo-body">
          <form onSubmit={formikTitle.handleSubmit}>
            <h1>Title</h1>
            <div className="title-edit-container">
              <input
                type={"text"}
                id="name"
                name="name"
                className="application-title-field"
                onChange={formikTitle.handleChange}
                defaultValue={getTitle}
              />
              <input
                type="submit"
                // id="input-edit-vmgo"
                className="save-title-button"
                value="Save"
              />
            </div>
          </form>
        </div>
        <div className="edit-vmgo-body">
          <h1>Logo</h1>
          <div>
            {preview ? (
              <img
                alt="wallpaper-img"
                src={preview}
                id="logo-preview"
              />
            ) : (
              !preview && (
                <img
                  alt="wallpaper-img"
                  src={`http://localhost:7700/${getLogo}`}
                  id="logo-preview"
                />
              )
            )}
          </div>
          <form>
            <div className="logo-edit-container">
              <fieldset className="logo-fieldset">
                <legend>Upload Logo Image</legend>
                <input
                  type={"file"}
                  className="logo-submit"
                  accept=".jpg,.png,.jpeg"
                  onChange={pickedHandler}
                />
                <input
                  type="submit"
                  className="logo-save-button"
                  value="Save"
                  // id="input-edit-vmgo"
                  onClick={submitChange}
                />
              </fieldset>
            </div>
          </form>
        </div>
        <div className="edit-vmgo-body">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="vision">VISION</label>
              <textarea
                id="vision"
                name="vision"
                className="edit-vmgo-textarea"
                onChange={formik.handleChange}
                defaultValue={getVision}
              />
            </div>
            <div>
              <label htmlFor="mision">MISSION</label>
              <textarea
                id="mision"
                name="mision"
                className="edit-vmgo-textarea"
                onChange={formik.handleChange}
                defaultValue={getMission}
              />
            </div>
            <div>
              <label htmlFor="goals">GOALS</label>
              <textarea
                id="goals"
                name="goals"
                className="edit-vmgo-textarea"
                onChange={formik.handleChange}
                defaultValue={getGoals}
              />
            </div>
            <div>
              <label htmlFor="objectives">OBJECTIVES</label>
              <textarea
                id="objectives"
                name="objectives"
                className="edit-vmgo-textarea"
                onChange={formik.handleChange}
                defaultValue={getObjectives}
              />
            </div>
            <input type="submit" id="input-edit-vmgo" />
          </form>
        </div>
      </Body>
    </>
  );
};

export default EditVMGO;

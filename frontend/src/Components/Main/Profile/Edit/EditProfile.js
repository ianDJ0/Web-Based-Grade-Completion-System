import TopNav from "../../../UI/Home_UI/TopNav";
import Sidebar from "../../../UI/Home_UI/Sidebar";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthenticationContext } from "../../../Shared/context/auth-context";
import TokenCheck from "../../../Shared/Auth";
import axios from "axios";
import Swal from "sweetalert2";
import "./EditProfile.css";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthenticationContext);
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const [isValid, setValid] = useState(false);
  const [email, setEmail] = useState(auth.userEmail);
  const [contactNumber, setContactNumber] = useState(auth.userContactNumber);
  let cys = [];
  if (auth.userCourseYearAndSection) {
    cys = auth.userCourseYearAndSection.split("-");
  }
  TokenCheck();
  const filePickerRef = useRef();
  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreview(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setValid(true);
    } else {
      setValid(false);
    }
  };
  const pickImageHandler = () => {
    filePickerRef.current.click();
  };
  const submitChange = () => {


    let formData = new FormData();

    formData.append("userId", auth.userId);
    if (file) {
      formData.append("image", file);
    } else {
      console.log(isValid);
    }
    if (email) {
      formData.append("email", email);
    }
    if (contactNumber) {
      formData.append("contactNumber", contactNumber);
    }
    if(cys.length > 2){
      formData.append("courseYearAndSection", cys[0]+"-"+cys[1]+"-"+cys[2]);
    }
    axios
      .post("http://localhost:7700/api/users/profileChange", formData)
      .then(function (response) {
        auth.userProfilePic = response.data.new.profilePicture;
        auth.userEmail = response.data.new.email;
        auth.userContactNumber = response.data.new.contactNumber;
        auth.userCourseYearAndSection = response.data.new.yearAndSection;
        localStorage.setItem("token", response.data.token);
        Swal.fire({
          icon: 'success',
          title: 'Edit Sucessful!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          navigate('/profile');
        })
      })
      .catch((error) => { });
  };
  return (
    <>
      <TopNav />
      <Sidebar active={""} />
      <div className="user-profile">
        <div className="profile-header">
          <button id="save-changes-btn" onClick={submitChange}>
            Save Changes
          </button>
          <button
            id="cancel-btn"
            onClick={() => {
              navigate("/profile");
            }}
          >
            Cancel
          </button>
          <div className={`hover-change ${preview ? "hide" : ""}`}>
            <button
              className={`fa fa-plus-circle   ${preview ? "darken" : ""}`}
              style={{ fontSize: "3em" }}
              onClick={pickImageHandler}
            ></button>
          </div>
          <input
            type="file"
            ref={filePickerRef}
            style={{ display: "none" }}
            accept=".jpg,.png,.jpeg"
            onChange={pickedHandler}
          />

          {preview && (
            <img alt="wallpaper-img" src={preview} id="edit-profile-picture" />
          )}
          {!preview && (
            <img
              alt="wallpaper-img"
              src={require("../../../UI/Home_UI/Icons/image-wallpaper-15.jpg")}
              id="edit-profile-picture"
            />
          )}
        </div>
        <div className="edit-profile-details">

          <label className="leftover-label">Email</label>
          <input
            placeholder={auth.userEmail}
            id="edit-email-input"
            type="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          {auth.userType === "Student" &&
            <div>
              <label className="leftover-label">Course Year {"&"} Section</label>
              <input
                placeholder={cys[0]}
                type="text"
                onChange={(event) => {
                  cys[0]=event.target.value;
                }}
              />
              <input
                placeholder={cys[1]}
                type="text"
                onChange={(event) => {
                  cys[1]=event.target.value;
                }}
              />
              <input
                placeholder={cys[2]}
                type="text"
                onChange={(event) => {
                  cys[2]=event.target.value;
                }}
              />
            </div>}
          <label className="leftover-label">Contact Number</label>
          <input
            placeholder={auth.userContactNumber}
            id="edit-num-input"
            type="number"
            onChange={(event) => {
              setContactNumber(event.target.value);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default EditProfile;

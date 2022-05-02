import TopNav from "../../../UI/Home_UI/TopNav";
import Sidebar from "../../../UI/Home_UI/Sidebar";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthenticationContext } from "../../../Shared/context/auth-context";
import TokenCheck from "../../../Shared/Auth";
import axios from "axios";
import "./EditProfile.css";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthenticationContext);
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const [isValid, setValid] = useState(false);
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
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
    axios
      .post("http://localhost:7700/api/users/profileChange", formData)
      .then(function (response) {
        auth.userProfilePic = response.data.new.profilePicture;
        auth.userEmail = response.data.new.email;
        auth.userContactNumber = response.data.new.contactNumber;
        localStorage.setItem("token", response.data.token);
      })
      .catch((error) => {});
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
          {/* <div class="edit-first-name">
            <label>First Name</label>
            <input placeholder="John" id="edit-fname-input" />
          </div>
          <div class="edit-mi">
            <label>M.I.</label>
            <input placeholder="D." id="edit-mi-input" />
          </div>
          <div class="edit-last-name">
            <label>Last Name</label>
            <input placeholder="Doe" id="edit-lname-input" />
          </div> */}
          <label className="leftover-label">Email</label>
          <input
            placeholder="Email"
            id="edit-email-input"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            value={auth.userEmail}
          />
          <label className="leftover-label">Contact Number</label>
          <input
            placeholder="Contact Number"
            id="edit-num-input"
            onChange={(event) => {
              setContactNumber(event.target.value);
            }}
            value={auth.userContactNumber}
          />
          {/* <label class="leftover-label">Birthday</label>
          <input type="date" placeholder="Birthday" id="edit-bday-input" /> */}
        </div>
      </div>
    </>
  );
};

export default EditProfile;

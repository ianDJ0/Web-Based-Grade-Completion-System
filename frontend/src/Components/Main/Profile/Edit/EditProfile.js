import TopNav from "../../../UI/Home_UI/TopNav";
import Sidebar from "../../../UI/Home_UI/Sidebar";
import "./EditProfile.css";

const EditProfile = () => {
  return (
    <>
      <TopNav />
      <Sidebar active={""} />
      <div class="user-profile">
        <div class="profile-header">
          <button id="save-changes-btn">Save Changes</button>
          <button id="cancel-btn">Cancel</button>
          <div class="hover-change">
            <button
              class="fa fa-plus-circle"
              style={{ fontSize: "3em" }}
            ></button>
          </div>
          <img
            alt="wallpaper-img"
            src={require("../../../UI/Home_UI/Icons/image-wallpaper-15.jpg")}
            // src="Icons/image-wallpaper-15.jpg"
            id="edit-profile-picture"
          />
        </div>
        <div class="edit-profile-details">
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
          <label class="leftover-label">Email</label>
          <input placeholder="Email" id="edit-email-input" />
          <label class="leftover-label">Contact Number</label>
          <input placeholder="Contact Number" id="edit-num-input" />
          {/* <label class="leftover-label">Birthday</label>
          <input type="date" placeholder="Birthday" id="edit-bday-input" /> */}
        </div>
      </div>
    </>
  );
};

export default EditProfile;

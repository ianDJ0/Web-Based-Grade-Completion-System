import { useFormik } from "formik";
import Body from "../../UI/Containers/Body";
import Sidebar from "../../UI/Sidebar";
import TopNav from "../../UI/TopNav";
import "./CreateAccount.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateAccount = () => {
  const { state } = useLocation();
  console.log(state.source);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      registerUserType: state.source,
      registerEmail: "",
      registerPassword: "",
      conpassword: "",
      firstname: "",
      middleinit: "",
      lastname: "",
      course: "",
      year: "",
      section: "",
      registerStudentNumber: "",
      registerContactNumber: "",
      registerBirthday: "",
      signature: "",
    },
    onSubmit: (values) => {
      let names = {
        registerName:
          values.firstname + " " + values.middleinit + " " + values.lastname,
      };
      values = Object.assign(names, values);
      if (
        !values.registerUserType ||
        !values.registerEmail ||
        !values.registerPassword ||
        !values.registerName ||
        !values.registerContactNumber ||
        !values.image
      ) {
        return alert("fill all please");
      }
      let form = new FormData();
      form.append("registerUserType", values.registerUserType);
      form.append("registerEmail", values.registerEmail);
      form.append("registerPassword", values.registerPassword);
      form.append("registerName", values.registerName);
      form.append("registerContactNumber", values.registerContactNumber);
      form.append("registerBirthday", values.registerBirthday);
      form.append("image", values.image);
      form.append("regVerify", true);
      if (values.registerUserType === "Faculty") {
        axios
          .post("http://localhost:7700/api/users/signup", form)
          .then(function (response) {
            Swal.fire({
              icon: "success",
              title: "Instructor is created!",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              navigate("/admin/faculty");
            });
          })
          .catch(function (error) {
            alert(values.image);
          });
      } else {
        let names = {
          registerCourseYearAndSection:
            values.course + "-" + values.year + "-" + values.section,
        };
        values = Object.assign(names, values);
        form.append(
          "registerCourseYearAndSection",
          values.registerCourseYearAndSection
        );
        form.append("registerStudentNumber", values.registerStudentNumber);
        axios
          .post("http://localhost:7700/api/users/signup", form)
          .then(function (response) {
            Swal.fire({
              icon: "success",
              title: "Instructor is created!",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              navigate("/admin/student");
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  });

  return (
    <>
      <TopNav />
      <Sidebar />
      <Body>
        <div className="create-account-body">
          <h2>Create account</h2>
          <form encType="multipart/form-data" onSubmit={formik.handleSubmit}>
            <div className="admin-create-type">
              <p>Account Type</p>
              <select
                name="registerUserType"
                id="accounttype"
                className="create-select-type"
                placeholder="Account type"
                onChange={formik.handleChange}
                value={formik.values.registerUserType}
              >
                <option value="Faculty">Faculty</option>
                <option value="Student">Student</option>
              </select>
            </div>
            <div className="admin-create-email">
              <p>Email</p>
              <input
                type="email"
                name="registerEmail"
                id="admin-email-input"
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
                required
              />
            </div>
            <div className="admin-create-pass">
              <p>Password</p>
              <input
                type="password"
                name="registerPassword"
                id="password"
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
                required
              />
            </div>
            <div className="admin-create-confirm-pass">
              <p>Confirm Password</p>
              <input
                name="conpassword"
                id="conpassword"
                type="password"
                placeholder="Confirm password"
                onChange={formik.handleChange}
                value={formik.values.conpassword}
                required
              />
            </div>
            <div className="admin-create-lastn">
              <p>Last Name</p>
              <input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Last Name"
                onChange={formik.handleChange}
                value={formik.values.lastname}
                required
              />
            </div>
            <div className="admin-create-firstn">
              <p>First Name</p>
              <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="First Name"
                onChange={formik.handleChange}
                value={formik.values.firstname}
                required
              />
            </div>
            <div className="admin-create-middlei">
              <p>Middle Initial</p>
              <input
                type="text"
                name="middleinit"
                id="middleinit"
                placeholder="Middle Initial"
                onChange={formik.handleChange}
                value={formik.values.middleinit}
                required
              />
            </div>
            {formik.values.registerUserType === "Student" && (
              <>
                <div  className="admin-create-course">
                  <p>Course</p>
                  <input
                    type="text"
                    name="course"
                    id="course"
                    placeholder="Course"
                    onChange={formik.handleChange}
                    value={formik.values.course}
                    required
                  />
                </div>
                <div  className="admin-create-year">
                  <p>Year</p>
                  <input
                    type="text"
                    name="year"
                    id="year"
                    placeholder="year"
                    onChange={formik.handleChange}
                    value={formik.values.year}
                    required
                  />
                </div>
                <div  className="admin-create-section">
                  <p>Section</p>
                  <input
                    type="text"
                    name="section"
                    id="section"
                    placeholder="section"
                    onChange={formik.handleChange}
                    value={formik.values.section}
                    required
                  />
                </div>
                <div className="admin-create-studno">
                  <p>Student No.</p>
                  <input
                    type="text"
                    name="registerStudentNumber"
                    id="studno"
                    placeholder="studno"
                    onChange={formik.handleChange}
                    value={formik.values.studno}
                    required
                  />
                </div>
              </>
            )}
            <div className="admin-create-contact">
              <p>Contact Number</p>
              <input
                type="number"
                name="registerContactNumber"
                id="contact"
                placeholder="Contact Number"
                onChange={formik.handleChange}
                value={formik.values.contact}
                required
              />
            </div>
            <div className="admin-create-birthdate">
              <p>Birthdate</p>
              <input
                type="date"
                name="registerBirthday"
                id="birthday"
                placeholder="Birthdate"
                onChange={formik.handleChange}
                value={formik.values.birthday}
                required
              />
            </div>
            <div className="admin-create-sign">
              <p>Signature</p>
              <input
                name="image"
                id="signature"
                accept=".jpg,.png,.jpeg"
                type="file"
                onChange={(event) => {
                  let file = event.target.files[0];
                  formik.setFieldValue("image", file);
                }}
                required
              />
            </div>
            <button type="submit" id="admin-create-btn">Create Account</button>
          </form>
        </div>
      </Body>
    </>
  );
};

export default CreateAccount;

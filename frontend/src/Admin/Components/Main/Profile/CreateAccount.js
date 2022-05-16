import { useFormik } from "formik";
import Body from "../../UI/Containers/Body";
import Sidebar from "../../UI/Sidebar";
import TopNav from "../../UI/TopNav";
import "./CreateAccount.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateAccount = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      registerUserType: "",
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

      let names = { 'registerName': values.firstname + " " + values.middleinit + " " + values.lastname }
      values = Object.assign(names, values)
      if(!values.registerUserType||!values.registerEmail||!values.registerPassword||!values.registerName||!values.registerContactNumber||!values.image){
        return alert("fill all please")
      }
      let form = new FormData();
      form.append('registerUserType', values.registerUserType)
      form.append('registerEmail', values.registerEmail)
      form.append('registerPassword', values.registerPassword)
      form.append('registerName', values.registerName)
      form.append('registerContactNumber', values.registerContactNumber)
      form.append('registerBirthday', values.registerBirthday)
      form.append('image', values.image)
      form.append('regVerify', true)
      if (values.registerUserType === "Faculty") {
        axios
          .post("http://localhost:7700/api/users/signup", form)
          .then(function (response) {
            Swal.fire({
              icon: 'success',
              title: 'Instructor is created!',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              navigate('/admin/faculty');
            })
          })
          .catch(function (error) {
            alert(values.image);
          });
      } else {
        let names = { 'registerCourseYearAndSection': values.course + "-" + values.year + "-" + values.section }
        values = Object.assign(names, values)
        form.append('registerCourseYearAndSection', values.registerCourseYearAndSection)
        form.append('registerStudentNumber', values.registerStudentNumber)
        axios
          .post("http://localhost:7700/api/users/signup", form)
          .then(function (response) {
            Swal.fire({
              icon: 'success',
              title: 'Instructor is created!',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              navigate('/admin/student');
            })
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
            <div>
              <label>Account Type</label>
              <select
                name="registerUserType"
                id="accounttype"
                placeholder="Account type"
                onChange={formik.handleChange}
                value={formik.values.accounttype}
              >
                <option value="Faculty">Faculty</option>
                <option value="Student">Student</option>
              </select>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="registerEmail"
                id="email"
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
              required
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
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
            <div>
              <label htmlFor="conpassword">Confirm Password</label>
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
            <div>
              <label htmlFor="lastname">Last Name</label>
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
            {formik.values.registerUserType === "Student" && (
              <>
                <div>
                  <label htmlFor="course">Course</label>
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
                <div>
                  <label htmlFor="year">year</label>
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
                <div>
                  <label htmlFor="section">section</label>
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
                <div>
                  <label htmlFor="studno">studno</label>
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

            <div>
              <label htmlFor="firstname">First Name</label>
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
            <div>
              <label htmlFor="middleinit">Middle Init</label>
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
            <div>
              <label htmlFor="contact">Contact Number</label>
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
            <div>
              <label htmlFor="birthday">Birthdate</label>
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
            <div>
              <label htmlFor="signature">Signature</label>
              <input
                name="image"
                id="signature"
                accept=".jpg,.png,.jpeg"
                type="file"
                onChange={(event) => {
                  let file = event.target.files[0]
                  formik.setFieldValue("image", file)
                }}
              required
              />
            </div>
            <button type="submit">Create account</button>
          </form>
        </div>
      </Body>
    </>
  );
};

export default CreateAccount;

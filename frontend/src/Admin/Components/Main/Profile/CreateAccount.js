import { useFormik } from "formik";
import Body from "../../UI/Containers/Body";
import Sidebar from "../../UI/Sidebar";
import TopNav from "../../UI/TopNav";
import "./CreateAccount.css";

const CreateAccount = () => {
  const formik = useFormik({
    initialValues: {
      accounttype: "",
      email: "",
      password: "",
      conpassword: "",
      lastname: "",
      firstname: "",
      middleinit: "",
      contact: "",
      birthday: "",
      signature: "",
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
        <div className="create-account-body">
          <h2>Create account</h2>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label>Account Type</label>
              <select
                name="account-type"
                id="account-type"
                placeholder="Account type"
              >
                <option value="Faculty">Faculty</option>
                <option value="Student">Student</option>
              </select>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
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
                name="password"
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
                name="con-password"
                id="con-password"
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
                name="contact"
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
                name="birthday"
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
                name="signature"
                id="signature"
                type="file"
                onChange={formik.handleChange}
                value={formik.values.signature}
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

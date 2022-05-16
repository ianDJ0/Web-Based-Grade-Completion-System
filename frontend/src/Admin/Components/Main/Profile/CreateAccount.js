import Body from "../../UI/Containers/Body";
import Sidebar from "../../UI/Sidebar";
import TopNav from "../../UI/TopNav";
import "./CreateAccount.css";

const CreateAccount = () => {



  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <TopNav />
      <Sidebar />
      <Body>
        <div className="create-account-body">
          <form onSubmit={onSubmit}>
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
              <input type="email" name="email" id="email" placeholder="Email" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="conpassword">Confirm Password</label>
              <input
                name="con-password"
                id="con-password"
                type="password"
                placeholder="Confirm password"
              />
            </div>
            <div>
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Last Name"
              />
            </div>
            <div>
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="First Name"
              />
            </div>
            <div>
              <label htmlFor="middleinit">Middle Init</label>
              <input
                type="text"
                name="middleinit"
                id="middleinit"
                placeholder="Middle Initial"
              />
            </div>
            <div>
              <label htmlFor="contact">Contact Number</label>
              <input
                type="number"
                name="contact"
                id="contact"
                placeholder="Contact Number"
              />
            </div>
            <div>
              <label htmlFor="birthday">Birthdate</label>
              <input
                type="date"
                name="birthday"
                id="birthday"
                placeholder="Birthdate"
              />
            </div>
            <div>
              <label htmlFor="signature">Signature</label>
              <input name="signature" id="signature" type="file" />
            </div>
            <button type="submit">Create account</button>
          </form>
        </div>
      </Body>
    </>
  );
};

export default CreateAccount;

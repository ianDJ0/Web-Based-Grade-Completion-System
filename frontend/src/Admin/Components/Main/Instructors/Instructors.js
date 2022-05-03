import Sidebar from "../../UI/Sidebar";
import TopNav from "../../UI/TopNav";
import Body from "../../UI/Containers/Body";
import "../../UI/Shared.css";
import "./Instructors.css";

const Instructors = () => {
  return (
    <>
      <Sidebar />
      <TopNav />
      <Body>
        <h2 id="instructor-label">INSTRUCTORS LIST</h2>
        <div className="list-content">
          <table className="log">
            <tbody>
              <tr id="list-label">
                <th>Name</th>
                <th>Email</th>
                <th>Contact Number</th>
                <th>Status</th>
              </tr>
              <tr>
                <th>Mr. Aaron Paul M. Dela Rosa</th>
                <th>delarosa@gmaul.com</th>
                <th>+639764891064</th>
                <th>Verified</th>
              </tr>
              <tr>
                <th>John Doe</th>
                <th>jd@gmail.com</th>
                <th>+639785930154</th>
                <th>Verified</th>
              </tr>
              <tr>
                <th>Sample Prof</th>
                <th>Sample@gmail.com</th>
                <th>+6396878767841</th>
                <th>Unverified</th>
              </tr>
            </tbody>
          </table>
        </div>
      </Body>
    </>
  );
};

export default Instructors;

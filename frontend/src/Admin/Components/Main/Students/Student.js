import Sidebar from "../../UI/Sidebar";
import TopNav from "../../UI/TopNav";
import Body from "../../UI/Containers/Body";
import "../../UI/Shared.css";
import "./Student.css";

const Student = () => {
  return (
    <>
      <Sidebar />
      <TopNav />
      <Body>
        <h2 id="instructor-label">STUDENT LIST</h2>
        <div className="list-content">
          <table className="log">
            <tbody>
              <tr id="instructor-label">
                <th>Student Number</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact Number</th>
              </tr>
              <tr>
                <th>2018-234567</th>
                <th>Student 1</th>
                <th>student1@gmail.com</th>
                <th>+639989876543</th>
              </tr>
              <tr>
                <th>2018-123456</th>
                <th>Student 2</th>
                <th>student2@gmail.com</th>
                <th>+639994367094</th>
              </tr>
              <tr>
                <th>2020-567908</th>
                <th>Student 3</th>
                <th>student3@gmail.com</th>
                <th>+639784532097</th>
              </tr>
            </tbody>
          </table>
        </div>
      </Body>
    </>
  );
};

export default Student;

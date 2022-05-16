import { jsPDF } from "jspdf";
import Sidebar from "../../UI/Sidebar";
import TopNav from "../../UI/TopNav";
import "./Report.css";

const Report = (props) => {
  const requested = "";
  const submitted = "";
  const onprocess = "";
  const processed = "";
  const denied = "";
  const requestTotal = "";

  const students = "";
  const verifiedFac = "";
  const unverifiedFac = "";
  const userTotal = "";

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;

  const createPDF = async () => {
    const pdf = new jsPDF({
      unit: "px",
      hotfixes: ["px_scaling"],
      width: 850,
      windowWidth: 850,
      height: 1122,
      windowHeight: 1122,
    });
    // const pdf = new jsPDF("portrait", "px", "a4");
    const data = await document.querySelector("#report-body");
    pdf.html(data).then(() => {
      pdf.save("Data Report.pdf");
    });
  };

  return (
    <>
      <TopNav />
      <Sidebar />
      <div id="pad"></div>
      <button className="create-pdf" onClick={createPDF}>
        Create PDF
      </button>
      <div id="report-body">
        <div id="report-container">
          <div id="report-header-container">
            <img
              id="report-bulsu-logo"
              alt="logo"
              src={require("./bulsu-logo-red.png")}
            />
            <div className="report-heading-text">
              <p>Republic of the Philippines</p>
              <h3>BULACAN STATE UNIVERSITY</h3>
              <p>City of Malolos, Bulacan</p>
              <p>Tel. no. 919-7800 local 1001 or 1002</p>
            </div>
          </div>
          <div id="report-date-container">
            <p id="report-date-var">{today}</p>
            <p className="report-date">Date:</p>
          </div>

          <div id="report-request-container">
            <strong>
              <p>REQUESTS</p>
            </strong>
            <p>
              Attached herewith are the request with their units according to
              current attached status accompanied by the total number of
              generated requests.
            </p>

            <div id="report-request-diagram">
              <div id="request-diagram"></div>
            </div>

            <div id="report-request-table">
              <table id="request-table">
                <tr>
                  <th>Requested</th>
                  <th>Submitted</th>
                  <th>On Process</th>
                  <th>Processed</th>
                  <th>Denied</th>
                  <th>Total</th>
                </tr>
                <tr>
                  <td>{requested}</td>
                  <td>{submitted}</td>
                  <td>{onprocess}</td>
                  <td>{processed}</td>
                  <td>{denied}</td>
                  <td>{requestTotal}</td>
                </tr>
              </table>
            </div>
          </div>
          <div id="report-users-container">
            <strong>
              <p>USERS</p>
            </strong>
            <p>
              Included below are the number of students and faculty registered
              unto the system.
            </p>

            <div id="report-users-diagram">
              <div id="users-diagram"></div>
            </div>

            <div id="report-user-table">
              <table id="user-table">
                <tr>
                  <th>Students</th>
                  <th>Verified Faculty</th>
                  <th>Unverified Faculty</th>
                  <th>Total</th>
                </tr>
                <tr>
                  <td>{students}</td>
                  <td>{verifiedFac}</td>
                  <td>{unverifiedFac}</td>
                  <td>{userTotal}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Report;

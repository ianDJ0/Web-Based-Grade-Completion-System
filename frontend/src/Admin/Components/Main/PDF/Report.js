import { jsPDF } from "jspdf";
import Sidebar from "../../UI/Sidebar";
import TopNav from "../../UI/TopNav";
import PieChartRequest from "./PieChartRequest";
import "./Report.css";
import { useEffect, useState } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import Body from "../../UI/Containers/Body";

const Report = (props) => {
  const [requested, setRequested] = useState(0);
  const [submitted, setSubmitted] = useState(0);
  const [onprocess, setOnprocess] = useState(0);
  const [processed, setProcessed] = useState(0);
  const [denied, setDenied] = useState(0);
  const [requestTotal, setRequestTotal] = useState(0);

  const [students, setStudent] = useState(0);
  const [verifiedFac, setVerified] = useState(0);
  const [unverifiedFac, setUnverified] = useState(0);
  const [userTotal, setUserTotal] = useState(0);

  useEffect(() => {
    axios
      .all([
        axios.post("http://localhost:7700/api/users/type", {
          uType: "Student",
          findInName: "",
        }),
        axios.post("http://localhost:7700/api/users/type", {
          uType: "Faculty",
          findInName: "",
        }),
        axios.post("http://localhost:7700/api/request/admin/getRequests", {}),
        axios.post("http://localhost:7700/api/users/admin/verified", {}),
      ])
      .then(
        axios.spread(
          (getStudentNo, getFacultyNo, getRequestNo, getVerified) => {
            setStudent(getStudentNo.data ? getStudentNo.data.length : 0);
            setVerified(getFacultyNo.data ? getFacultyNo.data.length : 0);
            setUnverified(getVerified.data ? getVerified.data.length : 0);
            setUserTotal(
              getStudentNo.data.length +
                getFacultyNo.data.length +
                getVerified.data.length
            );
            // console.log("aaaaaaaaaaaaaa",getVerified.data.length)
            if (getRequestNo.data) {
              let requested = getRequestNo.data.filter((request) => {
                return request.status === "REQUESTED";
              });
              let sub = getRequestNo.data.filter((request) => {
                return request.status === "SUBMITTED";
              });
              let onp = getRequestNo.data.filter((request) => {
                return request.status === "ON PROCESS";
              });
              let pro = getRequestNo.data.filter((request) => {
                return request.status === "PROCESSED";
              });
              let den = getRequestNo.data.filter((request) => {
                return request.status === "DENIED";
              });
              setRequested(requested.length);
              setSubmitted(sub.length);
              setOnprocess(onp.length);
              setProcessed(pro.length);
              setDenied(den.length);
              setRequestTotal(
                requested.length +
                  sub.length +
                  onp.length +
                  pro.length +
                  den.length
              );
            }
          }
        )
      );
  }, []);

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;

  // const createPDF = async () => {
  //   const pdf = new jsPDF({
  //     unit: "px",
  //     hotfixes: ["px_scaling"],
  //     width: 850,
  //     windowWidth: 850,
  //     height: 1122,
  //     windowHeight: 1122,
  //     // format: "PNG",
  //   });
  //   // const pdf = new jsPDF("portrait", "px", "a4");
  //   const data = await document.querySelector("#report-body");
  //   pdf.html(data).then(() => {
  //     pdf.save("Data Report.pdf");
  //   });
  // };

  const createPDF = () => {
    const input = document.getElementById("report-body");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("General_Report.pdf");
    });
  };
  const requeststate = {
    labels: ["Requested", "Submitted", "On Process", "Processed", "Denied"],
    datasets: [
      {
        label: "Requests",
        backgroundColor: ["green", "red", "yellow", "blue", "purple", "pink"],
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1.5,
        data: [requested, submitted, onprocess, processed, denied],
      },
    ],
  };
  const userstate = {
    labels: ["Students", "Verified Faculty", "Unverified Faculty"],
    datasets: [
      {
        label: "Requests",
        backgroundColor: ["red", "yellow", "blue"],
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1.5,
        data: [students, verifiedFac, unverifiedFac],
      },
    ],
  };

  const requestoptions = {
    plugins: {
      legend: {
        display: true,
        position: "left",
      },
    },
  };

  return (
    <>
      <TopNav />
      <Sidebar />
      <div id="pad"></div>
      <Body>
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
                {/* <div id="request-diagram"></div> */}
                <PieChartRequest
                  state={requeststate}
                  options={requestoptions}
                />
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
                {/* <div id="users-diagram"></div> */}
                <PieChartRequest state={userstate} options={requestoptions} />
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
      </Body>
      {/* </div> */}
    </>
  );
};

export default Report;

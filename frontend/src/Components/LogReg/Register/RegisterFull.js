import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  Component,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SignaturePad from "signature_pad";

import Logo from "../../UI/LogReg_UI/Logo";
import LogRegBody from "../../UI/LogReg_UI/LogRegBody";
import LogRegForm from "../../UI/LogReg_UI/LogRegForm";
import { AuthenticationContext } from "../../Shared/context/auth-context";
import "../../Shared/Shared.css";
import "./RegisterFull.css";
import Terms from "./Terms and Conditions/Terms";

const RegisterFull = (props) => {
  const navigate = useNavigate();
  const auth = useContext(AuthenticationContext);
  const pad = useRef();
  const refSignature = useRef();
  //email from register
  const { state } = useLocation();
  const { email } = state;

  //field states
  const [acctType, setAcctType] = useState("Faculty");
  const [pwd, setPWD] = useState("");
  const [conPWD, setConPWD] = useState("");

  //names
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [mname, setMname] = useState("");

  //other
  const [contact, setContact] = useState("");
  const [birthday, setBirthday] = useState("");
  const [isTACRead, setIfRead] = useState(false);
  const [isValid, setIsValid] = useState(false);
  let signature;
  const [terms, setTerms] = useState(false);

  //student only fields
  const [studentNumber, setStudentNumber] = useState();
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [section, setSection] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [isEqual, setIsEqual] = useState(true);

  //error messages
  const unequalErr =
    !isEqual && errMsg.trim().length < 1 ? (
      <div className="error">Password confirmation does not match</div>
    ) : (
      ""
    );

  useEffect(() => {
    if (pwd.trim().length < 6 && pwd.trim().length > 0)
      setErrMsg(
        <div className="error">Password must be at least 6 characters long</div>
      );
    else setErrMsg("");
  }, [pwd]);

  useEffect(() => {
    if (isValid) {
      //not sure where to redirect user after successful registration
      navigate("/homepage");
      // navigate("/");
    }
  }, [isValid, navigate, auth]);

  var formData = new FormData();

  const submitRegistrationHandler = (event) => {
    event.preventDefault();
    setIsEqual(pwd.trim() === conPWD.trim());
    if (pwd.trim() === conPWD.trim() && errMsg.trim().length < 1) {
      formData.append("registerName", fname + " " + mname + " " + lname);
      formData.append("registerEmail", email);
      formData.append("registerPassword", pwd);
      formData.append("registerContactNumber", contact);
      formData.append("registerUserType", acctType);
      formData.append("registerBirthday", birthday);

      if (acctType === "Faculty") {
        console.log("axios", formData.get("image"));
        axios
          .post("http://localhost:7700/api/users/signup", formData)
          .then(function (response) {
            auth.isLoggedIn = true;
            auth.userId = response.data.new.id;
            auth.userEmail = response.data.new.email;
            auth.userFullName = response.data.new.fullName;
            auth.userContactNumber = response.data.new.contactNumber;
            auth.userSignature = response.data.new.image;
            auth.userBirthday = response.data.new.birthday;
            auth.userType = response.data.new.userType;
            localStorage.setItem("token", response.data.token);
            setIsValid(true);
          })
          .catch(function (error) {
            console.log(formData.get("image"));
            alert(error);
          });
      } else {
        formData.append("registerStudentNumber", studentNumber);
        formData.append(
          "registerCourseYearAndSection",
          course + "-" + year + "-" + section
        );
        axios
          .post("http://localhost:7700/api/users/signup", formData)
          .then(function (response) {
            auth.isLoggedIn = true;
            auth.userId = response.data.new.id;
            auth.userEmail = response.data.new.email;
            auth.userFullName = response.data.new.fullName;
            auth.userContactNumber = response.data.new.contactNumber;
            auth.userSignature = response.data.new.image;
            auth.userBirthday = response.data.new.birthday;
            auth.userType = response.data.new.userType;
            localStorage.setItem("token", response.data.token);
            auth.userStudentNumber = response.data.new.studentNumber;
            auth.userCourseYearAndSection = response.data.new.yearAndSection;
            setIsValid(true);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      for (var key of formData.keys()) {
        console.log(key);
        formData.delete(key);
      }
      signature = "";
    }
  };
  let signaturePad;
  useEffect(() => {
    // will edit this, signaturepad's value will be gone everytime you changed something in the regFull form
    // this will only work if you added the signature after inputting all the other required fields
    let canvas = document.getElementById("signature-pad");
    signaturePad = new SignaturePad(canvas, {
      backgroundColor: "rgb(255, 255, 255)",
    });
  }, [formData]);

  //https://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
  function dataURItoBlob(dataURI) {
    var byteString;
    if (dataURI.split(",")[0].indexOf("base64") >= 0)
      byteString = atob(dataURI.split(",")[1]);
    else byteString = unescape(dataURI.split(",")[1]);
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
  }
  const [visible, setVisible] = useState(false);
  const studentOnly =
    acctType === "Student" ? (
      <div>
        <label>Student Number</label>
        <input
          type="number"
          placeholder="Student Number (2018 123456)"
          className="reg-input-field"
          value={studentNumber}
          onChange={(event) => {
            setStudentNumber(event.target.value);
          }}
          required
        />
        <table className="full-width">
          <thead>
            <tr>
              <th>Course</th>
              <th>Year</th>
              <th>Section</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="Course"
                  id="student-course"
                  value={course}
                  onChange={(event) => {
                    setCourse(event.target.value);
                  }}
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  placeholder="Year"
                  id="student-year"
                  min="1"
                  max="4"
                  value={year}
                  onChange={(event) => {
                    setYear(event.target.value);
                  }}
                  required
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Section"
                  id="student-section"
                  value={section}
                  onChange={(event) => {
                    setSection(event.target.value);
                  }}
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    ) : (
      ""
    );

  const cancelHandler = () => {
    setTerms((prevState) => !prevState);
  };

  const acceptHandler = () => {
    setTerms((prevState) => !prevState);
    setIfRead((prevState) => !prevState);
  };

  return (
    <>
      {terms && <Terms cancel={cancelHandler} accept={acceptHandler} />}
      <Logo />
      <LogRegBody>
        <LogRegForm>
          <form
            id="login-form"
            className="input-group"
            onSubmit={submitRegistrationHandler}
            encType="application/json; charset=utf-8"
          >
            <i
              onClick={() => {
                navigate("/");
              }}
              className="fa fa-times-circle close-form click"
              style={{ fontSize: "2em" }}
            ></i>
            <h3 id="logreg-label">Create An Account</h3>
            <label>Account Type</label>
            <select
              className="reg-input-field full-width"
              value={acctType}
              onChange={(event) => {
                setAcctType(event.target.value);
              }}
            >
              <option value="Faculty">Faculty</option>
              <option value="Student">Student</option>
            </select>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="reg-input-field"
              value={email}
              readOnly
              required
            />
            <label htmlFor="pwd">Password</label>
            <input
              id="pwd"
              type="password"
              placeholder="Password"
              className="reg-input-field same-row"
              value={pwd}
              onChange={(event) => {
                setPWD(event.target.value);
              }}
              required
            />
            <label htmlFor="conpwd">Confirm Password</label>
            <input
              id="conpwd"
              type="password"
              placeholder="Confirm Password"
              className="reg-input-field same-row"
              value={conPWD}
              onChange={(event) => {
                setConPWD(event.target.value);
              }}
              required
            />
            {/* error messages */}
            {unequalErr}
            {errMsg}

            <table className="full-width">
              <thead>
                <tr>
                  <th>Last Name</th>
                  <th>First Name</th>
                  <th> M.I </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="name-input-field"
                      value={lname}
                      onChange={(event) => {
                        setLname(event.target.value);
                      }}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="First Name"
                      className="name-input-field"
                      value={fname}
                      onChange={(event) => {
                        setFname(event.target.value);
                      }}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="M. I "
                      className="name-input-field"
                      value={mname}
                      onChange={(event) => {
                        setMname(event.target.value);
                      }}
                      required
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            {studentOnly}
            <div className="contact-detail">
              <p>Contact Number</p>
              <input
                type="number"
                placeholder="Contact Number"
                id="contact-no"
                value={contact}
                onChange={(event) => {
                  setContact(event.target.value);
                }}
                required
              />
            </div>

            {/*Change date picker. IDK, maybe use some bootstrap? */}
            <div className="birth-details">
              <p>Birthdate</p>
              <input
                type="date"
                placeholder="Birthdate"
                id="birth-date"
                value={birthday}
                onChange={(event) => {
                  setBirthday(event.target.value);
                }}
                required
              />
            </div>
            <label htmlFor="signature" id="sign-label">
              Signature
            </label>
            <br />
            <div
              className="wrapper"
              ref={pad}
              style={{ display: visible ? "block" : "none" }}
            >
              <div className="btn-wrapper canvas-wrapper ">
                <canvas
                  id="signature-pad"
                  className="signature-pad"
                  width={400}
                  height={200}
                />
              </div>
              <div className="btn-wrapper">
                <input
                  className="save-btn"
                  type="button"
                  id="save-png"
                  value="Use Signature"
                  onClick={(event) => {
                    formData.delete("image");
                    if (signaturePad.isEmpty()) {
                      return alert("Please provide a signature first.");
                    }
                    let data = signaturePad.toDataURL("image/png");
                    let blob = dataURItoBlob(data);
                    formData.append("image", blob);
                    console.log(formData.get("image"));
                  }}
                />
                <input
                  className="clear-btn"
                  type="button"
                  id="clear"
                  value="Clear Canvas"
                  onClick={(event) => {
                    signaturePad.clear();
                  }}
                />
              </div>
            </div>
            <input
              className="btn-signature"
              type="button"
              onClick={() => setVisible(!visible)}
              value={visible ? "Hide Signature Pad" : "Show Signature Pad"}
              // value="Show/Hide Signature Pad"
            />
            <input
              id="signature"
              ref={refSignature}
              type="file"
              accept=".jpg,.png,.jpeg"
              placeholder="Digital Signature"
              value={signature}
              onChange={(event) => {
                formData.delete("image");
                formData.append("image", event.target.files[0]);
                console.log(formData.get("image"));
              }}
            />
            <br />
            <br />
            <input
              type="Checkbox"
              className="check-box"
              onChange={(event) => {
                setIfRead((prevState) => !prevState);
              }}
              checked={isTACRead}
              required
            />
            <span>
              {" "}
              I have read the{" "}
              <i
                className={"terms"}
                onClick={() => {
                  setTerms((prevState) => !prevState);
                }}
              >
                terms and conditions.
              </i>
            </span>

            <button type="submit" id="btn-submit">
              PROCEED
            </button>
          </form>
        </LogRegForm>
      </LogRegBody>
    </>
  );
};
export default RegisterFull;

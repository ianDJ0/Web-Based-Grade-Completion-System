import React, { useEffect, useState, useContext, useRef } from "react";
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
import LogRegButton from "../../UI/LogReg_UI/LogRegButton";

const RegisterFull = (props) => {
  const navigate = useNavigate();
  const auth = useContext(AuthenticationContext);
  const pad = useRef();
  const refSignature = useRef();
  //email from register
  // const { state } = useLocation();
  // const { email } = state;

  //field states
  const [acctType, setAcctType] = useState("Faculty");
  const [pwd, setPWD] = useState("");
  const [conPWD, setConPWD] = useState("");
  const [email, setEmail] = useState("");

  //names
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [mname, setMname] = useState("");

  //other
  const [contact, setContact] = useState("");
  const [birthday, setBirthday] = useState("");
  const [isTACRead, setIfRead] = useState(true);
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
    if (pwd.trim().length < 8 && pwd.trim().length > 0)
      setErrMsg(
        <div className="error">Password must be at least 8 characters long</div>
      );
    else setErrMsg("");
  }, [pwd]);

  useEffect(() => {
    if (isValid) {
      navigate("/homepage");
    }
  }, [isValid, navigate, auth]);

  const [formData, setFormData] = useState(new FormData());

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
            navigate("/");
          })
          .catch(function (error) {
            for (var key of formData.keys()) {
              formData.delete(key);
            }
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
            for (var key of formData.keys()) {
              formData.delete(key);
            }
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
    const canvas = document.getElementById("signature-pad");
    signaturePad = new SignaturePad(canvas, {
      backgroundColor: "rgb(255, 255, 255)",
    });
  });
  //https://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
  function dataURItoBlob(dataURI) {
    var byteString;
    if (dataURI.split(",")[0].indexOf("base64") >= 0)
      byteString = atob(dataURI.split(",")[1]);
    else byteString = unescape(dataURI.split(",")[1]);
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
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

  const pwField = useRef();
  const conpwField = useRef();
  const pw_Icon = useRef();
  const cpw_Icon = useRef();

  const togglePW = () => {
    if (pwField.current.type === "password") {
      pwField.current.type = "text";
      pwField.current.setAttribute("title", "Hide Password");
      pw_Icon.current.classList.replace("fa-eye", "fa-eye-slash");
    } else {
      pwField.current.type = "password";
      pwField.current.setAttribute("title", "Show Password");
      pw_Icon.current.classList.replace("fa-eye-slash", "fa-eye");
    }
  };
  const toggleCPW = () => {
    if (conpwField.current.type === "password") {
      pwField.current.title = "Hide Password";
      conpwField.current.type = "text";
      cpw_Icon.current.classList.replace("fa-eye", "fa-eye-slash");
    } else {
      pwField.current.title = "Show Password";
      conpwField.current.type = "password";
      cpw_Icon.current.classList.replace("fa-eye-slash", "fa-eye");
    }
  };

  return (
    <>
      {terms && <Terms cancel={cancelHandler} accept={acceptHandler} />}
      <Logo />
      <LogRegBody>
        <LogRegButton choice={"register"} />
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
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              required
            />
            <label htmlFor="pwd">Password</label>
            <div className="password-container">
              <input
                ref={pwField}
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
              {/* Eye toggle */}
              <div className="show-hide-pw" onClick={togglePW}>
                <i id="pw-icon" ref={pw_Icon} className="far fa-eye icon"></i>
              </div>
            </div>
            <label htmlFor="conpwd">Confirm Password</label>
            <div className="conpw-container">
              <input
                ref={conpwField}
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
              {/* Eye toggle */}
              <div className="show-hide-pw" onClick={toggleCPW}>
                <i
                  id="conpw-icon"
                  ref={cpw_Icon}
                  className="far fa-eye icon"
                ></i>
              </div>
            </div>

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
                    // console.log(signaturePad.toDataURL("image/png"));
                    formData.append("image", blob);
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
                // console.log('Insert signature', formData.get("image"));
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

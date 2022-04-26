import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import Logo from "../../UI/LogReg_UI/Logo";
import LogRegBody from "../../UI/LogReg_UI/LogRegBody";
import LogRegForm from "../../UI/LogReg_UI/LogRegForm";

import "../../Shared/Shared.css";
import "./RegisterFull.css";

const RegisterFull = (props) => {
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
  let signature;

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
    if (pwd.trim().length < 5 && pwd.trim().length > 0)
      setErrMsg(
        <div className="error">Password must be at least 6 characters long</div>
      );
    else setErrMsg("");
  }, [pwd]);

  const submitRegistrationHandler = (event) => {
    event.preventDefault();

    setIsEqual(pwd.trim() === conPWD.trim());

    if (isEqual && errMsg.trim().length < 1) {
      let formData = new FormData();
      formData.append("registerName", fname + " " + mname + " " + lname);
      formData.append("registerEmail", email);
      formData.append("registerPassword", pwd);
      formData.append("registerContactNumber", contact);
      formData.append("registerUserType", acctType);
      formData.append("image", signature);
      if (acctType === "Faculty") {
        axios
          .post("http://localhost:7700/api/users/signup", formData)
          .then(function (response) {
            setIfRead(true);
          })
          .catch(function (error) {
            alert(error);
          });
      } else {
        formData.append(
          "registerCourseYearAndSection",
          course + " " + year + "" + section
        );
        axios
          .post("http://localhost:7700/api/users/signup", formData)
          .then(function (response) {
            console.log(response);
            setIfRead(true);
          })
          .catch(function (error) {
            console.log(error);
          });
      }

      signature = "";
    }
  };

  const pickHandle = (event) => {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length === 1) {
      const [file] = event.target.files;
      signature = event.target.files[0];
      reader.readAsDataURL(file);
    }
  };

  const studentOnly =
    acctType === "Student" ? (
      <div>
        <label>Student Number</label>
        <input
          type="number"
          placeholder="Student Number (2018123456)"
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

  return (
    <>
      <Logo />
      <LogRegBody>
        <LogRegForm>
          <form
            id="login-form"
            className="input-group"
            onSubmit={submitRegistrationHandler}
            encType="application/json; charset=utf-8"
          >
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
            <input
              id="signature"
              type="file"
              accept=".jpg,.png,.jpeg"
              placeholder="Digital Signature"
              value={signature}
              onChange={pickHandle}
              required
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
            {/* Will add a link to the Terms and Conditions */}
            <span> I have read the terms and conditions.</span>

            {/*So, do we need some password inputs here? */}
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

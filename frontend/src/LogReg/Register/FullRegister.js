import React from "react";
import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import Logo from "../UI/Logo";

import "../UI/LogReg.css";
import "../Shared/shared.css";
import "./FullRegister.css";

const FullRegister = () => {
  const { state } = useLocation();
  const { email } = state;

  const [acctPWD, setPWD] = useState("");
  const [conPWD, setConPWD] = useState("");
  const [acctType, setAcctType] = useState("Faculty");
  const [studentNumber, setStudentNumber] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleInit, setMiddleInit] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [isTACRead, setIfRead] = useState(false);

  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [section, setSection] = useState("");
  const [signature, setSignature] = useState("");

  const submitRegistrationHandler = (event) => {
    event.preventDefault();
    if (acctType === "Faculty") {
      axios
        .post("http://localhost:7700/api/users/signup", {
          registerName: firstName + middleInit + lastName,
          registerEmail: email,
          registerPassword: acctPWD,
          registerContactNumber: contactNumber,
          registerUserType: acctType,
        })
        .then(function (response) {
          setIfRead(true);
        })
        .catch(function (error) {
          alert(error.response.data.message);
        });
    } else {
      axios
        .post("http://localhost:7700/api/users/signup", {
          registerName: firstName + middleInit + lastName,
          registerEmail: email,
          registerPassword: acctPWD,
          registerContactNumber: contactNumber,
          registerUserType: acctType,
          registerStudentNumber: studentNumber,
        })
        .then(function (response) {
          console.log(response);
          setIfRead(true);
        })
        .catch(function (error) {
          alert(error.response.data.message);
        });
    }
    //do something
    //prolly check if TAC is checked?
  };

  const setAcctTypeHandler = (event) => {
    setAcctType(event.target.value);
  };

  const setStudentNumberHandler = (event) => {
    setStudentNumber(event.target.value);
  };

  //Will add input validation later
  const setLastNameHandler = (event) => {
    setLastName(event.target.value);
  };

  //Will add input validation later
  const setFirstNameHandler = (event) => {
    setFirstName(event.target.value);
  };

  //Will add input validation later
  const setMiddleInitHandler = (event) => {
    setMiddleInit(event.target.value);
  };
  const setContactNumberHandler = (event) => {
    setContactNumber(event.target.value);
  };
  const setBirthDateHandler = (event) => {
    // Will look for a better way to parse into a Date value
    setBirthDate(event.target.value);
  };

  const setReadHandler = (event) => {
    console.log(event.target.checked);
    setIfRead(event.target.checked);
  };

  const studentOnly =
    acctType === "Student" ? (
      <div>
        <label>Student Number</label>
        <input
          type="number"
          placeholder="Student Number"
          className="reg-input-field"
          value={studentNumber}
          onChange={setStudentNumberHandler}
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
                  className="name-input-field"
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
                  className="name-input-field"
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
                  className="name-input-field"
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
    <React.Fragment>
      <Logo />
      <div className="logreg-body body">
        <div className="logreg-form card">
          <form
            id="login-form"
            className="input-group"
            onSubmit={submitRegistrationHandler}
          >
            <h3 id="logreg-label">Create An Account</h3>
            <label>Account Type</label>
            <select
              className="reg-input-field full-width"
              value={acctType}
              onChange={setAcctTypeHandler}
              placeholder="Hello"
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
              className="reg-input-field"
              value={acctPWD}
              onChange={(event) => {
                setPWD(event.target.value);
              }}
              readOnly
              required
            />
            <label htmlFor="conpwd">Confirm Password</label>
            <input
              id="conpwd"
              type="password"
              placeholder="Confirm Password"
              className="reg-input-field"
              value={conPWD}
              onChange={(event) => {
                setConPWD(event.target.value);
              }}
              readOnly
              required
            />

            {studentOnly}

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
                      value={lastName}
                      onChange={setLastNameHandler}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="First Name"
                      className="name-input-field"
                      value={firstName}
                      onChange={setFirstNameHandler}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="M. I "
                      className="name-input-field"
                      value={middleInit}
                      onChange={setMiddleInitHandler}
                      required
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <label>Contact Number</label>
            <input
              type="number"
              placeholder="Contact Number"
              className="reg-input-field"
              value={contactNumber}
              onChange={setContactNumberHandler}
              required
            />

            {/*Change date picker. IDK, maybe use some bootstrap? */}

            <label>Birthdate</label>
            <input
              type="date"
              placeholder="Birthdate"
              className="reg-input-field"
              value={birthDate}
              onChange={setBirthDateHandler}
              required
            />
            <label htmlFor="signature">Signature</label>
            <br />
            <input
              id="signature"
              type="file"
              placeholder="Digital Signature"
              value={signature}
              onChange={(event) => {
                setSignature(event.target.value);
              }}
              required
            />
            <br />
            <br />
            <input
              type="Checkbox"
              className="check-box"
              onChange={setReadHandler}
              checked={isTACRead}
            />
            {/* Will add a link to the Terms and Conditions */}
            <span> I have read the terms and conditions.</span>

            {/*So, do we need some password inputs here? */}
            <button type="submit" id="btn-submit">
              PROCEED
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FullRegister;

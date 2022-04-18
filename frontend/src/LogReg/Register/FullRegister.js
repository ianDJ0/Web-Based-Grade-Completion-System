import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import Logo from "../UI/Logo";

import "../UI/LogReg.css";
import "../Shared/shared.css";
import "./FullRegister.css";

const FullRegister = () => {
  const { state } = useLocation();
  const { email, password } = state;

  const [acctType, setAcctType] = useState("Faculty");
  const [studentNumber, setStudentNumber] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleInit, setMiddleInit] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [isTACRead, setIfRead] = useState(false);

  const submitRegistrationHandler = (event) => {
    event.preventDefault();

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
            {studentOnly}
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              className="reg-input-field"
              value={email}
              readOnly
              required
            />

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

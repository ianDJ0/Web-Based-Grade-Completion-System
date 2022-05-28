import React, { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import Logo from "../../UI/LogReg_UI/Logo";
import LogRegBody from "../../UI/LogReg_UI/LogRegBody";
import LogRegButton from "../../UI/LogReg_UI/LogRegButton";
import LogRegForm from "../../UI/LogReg_UI/LogRegForm";
import { AuthenticationContext } from "../../Shared/context/auth-context";
import "../../Shared/Shared.css";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPWD] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isValid, setIsValid] = useState(false);
  const emailRef = useRef();
  const auth = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    emailRef.current.focus();
    if (localStorage.getItem("token")) {
      navigate("/homepage");
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  useEffect(() => {
    if (isValid) {
      setEmail("");
      setPWD("");
      if (auth.userType === "Admin") {
        return navigate("/admin");
      }
      navigate("/homepage");
    }
  }, [isValid, navigate, auth]);

  const loginHandler = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:7700/api/users/login", {
        loginEmail: email,
        loginPassword: pwd,
      })
      .then(function (response) {
        auth.isLoggedIn = true;
        auth.userId = response.data.user.id;
        auth.userEmail = response.data.user.email;
        auth.userFullName = response.data.user.fullName;
        auth.userContactNumber = response.data.user.contactNumber;
        auth.userSignature = response.data.user.image;
        auth.userType = response.data.user.userType;
        auth.userBirthday = response.data.user.birthday;
        auth.userVerified = response.data.user.verified;
        if (auth.userType === "Student") {
          auth.userStudentNumber = response.data.user.studentNumber;
          auth.userCourseYearAndSection = response.data.user.yearAndSection;
        }
        if (
          (auth.userVerified && auth.userType === "Faculty") ||
          auth.userType === "Student"
        ) {
          localStorage.setItem("token", response.data.token);
          setIsValid(true);
        } else if (auth.userType === "Admin") {
          setErrMsg("Incorrect Email/Password");
          setIsValid(false);
          setAttempts((prevAttempt) => prevAttempt + 1);
        } else {
          Swal.fire(
            "Account Unverified",
            "Contact your admin to verify your account.",
            "error"
          );
        }
      })
      .catch(function (error) {
        setErrMsg(error.response.data.message);
        setIsValid(false);
        setAttempts((prevAttempt) => prevAttempt + 1);
      });
  };

  const error =
    errMsg.trim().length > 2 ? (
      <div className="error">Incorrect Email/Password</div>
    ) : (
      ""
    );

  const pwdError =
    errMsg.trim().length < 2 &&
    pwd.trim().length < 8 &&
    pwd.trim().length > 0 ? (
      <div className="error">Password must be at least 8 characters long</div>
    ) : (
      ""
    );

  // const cover = <div id="cover-me"></div>;

  useEffect(() => {
    if (attempts > 2) {
      let timerInterval;
      Swal.fire({
        title: "Too many wrong attempts.",
        html: "You have tried to login with wrong credentials for too many times.",
        timer: 10000,
        timerProgressBar: true,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
          const b = Swal.getHtmlContainer().querySelector("b");
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft();
          }, 100);
          // document.getElementById("cover-me").style.display = "block";
        },
        willClose: () => {
          // document.getElementById("cover-me").style.display = "none";
          clearInterval(timerInterval);
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          // console.log("I was closed by the timer");
        }
      });
    }
  }, [attempts]);

  document.body.style = "background: #810000";
  return (
    <>
      {/* {cover} */}
      <Logo />
      <LogRegBody>
        <LogRegButton choice={"login"} />
        <LogRegForm>
          <form id="login-form" className="input-group" onSubmit={loginHandler}>
            <h3 id="logreg-label">Log In</h3>
            <label htmlFor="email">Email</label>
            <br />
            <input
              ref={emailRef}
              id="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              type="text"
              placeholder="Email"
              className="input-field"
              required
            />
            <br />
            <label htmlFor="pass-input">Password</label>
            <br />
            <input
              value={pwd}
              onChange={(event) => {
                setPWD(event.target.value);
              }}
              type="Password"
              id="pass-input"
              placeholder="Password"
              className="input-field"
              required
            />
            {/* <span alt="forgot-password" id="forgot-pass">
              Forgot Password?
            </span> */}

            {error}
            {pwdError}

            <button type="submit" id="btn-submit">
              SIGN IN
            </button>
            <div className="separator-logreg">OR LOGIN USING</div>
            <div className="social-logreg">
              <img
                alt="login-google"
                src={"https://bit.ly/3rn9ed6"}
                id="google-account"
              />
              <img
                alt="login-ms"
                src={"https://bit.ly/3vfdU61"}
                id="ms-account"
              />
            </div>
          </form>
        </LogRegForm>
        <div className="admin-login-container">
          <p className="admin-login-text">
            Are you an admin? Login your account
            <em>
              <span
                className="admin-login"
                onClick={() => {
                  navigate("./admin/login");
                }}
              >
                {" "}
                here.
              </span>
            </em>
          </p>
        </div>
      </LogRegBody>
    </>
  );
};
export default Login;

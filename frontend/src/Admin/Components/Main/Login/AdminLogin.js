import "./Login.css";
import axios from "axios";
import { AuthenticationContext } from "../../../../Components/Shared/context/auth-context";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const AdminLogin = () => {
  const auth = useContext(AuthenticationContext);
  const [email, setEmail] = useState("");
  const [pwd, setPWD] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const clickHandle = () => {
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
        if (auth.userType === "Admin") {
          localStorage.setItem("token", response.data.token);
          setIsValid(true);
        } else {
          setErrMsg("Wrong Email or Passord");
          setAttempts((prevAttempt) => prevAttempt + 1);
        }
      })
      .catch(function (error) {
        setErrMsg(error.response.data.message);
        setIsValid(false);
        setAttempts((prevAttempt) => prevAttempt + 1);
      });
  };
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
          console.log("I was closed by the timer");
        }
      });
    }
  }, [attempts]);

  const error =
    errMsg.trim().length > 2 ? (
      <div className="error">Incorrect Email/Password</div>
    ) : (
      ""
    );

  const pwdError =
    errMsg.trim().length < 2 &&
    pwd.trim().length < 6 &&
    pwd.trim().length > 0 ? (
      <div className="error">Password must be at least 6 characters long</div>
    ) : (
      ""
    );

  return (
    <div className="admin-login-bg">
      <div className="admin-login-picname">
        <img
          src={require("../../../../Components/UI/Home_UI/Icons/bulsu-logo.png")}
          alt="Logo"
          id="admin-logo"
        />
        <h2 id="admin-login-site-name">BULACAN STATE UNIVERSITY</h2>
      </div>
      <div className="admin-input">
        <h2 id="admin-login-label">Log In</h2>
        <h4>Sign in to your account.</h4>
        <div className="admin-input-email">
          <p className="admin-login-labels">Email</p>
          <input
            type="email"
            placeholder="Enter email"
            className="admin-input-fields"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div className="admin-input-pass">
          <p className="admin-login-labels">Password</p>
          <input
            type="password"
            placeholder="Enter password"
            className="admin-input-fields"
            onChange={(event) => {
              setPWD(event.target.value);
            }}
          />
        </div>
        {error}
        {pwdError}
        <button id="admin-login-btn" onClick={clickHandle}>
          SIGN IN
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;

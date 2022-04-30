import { Navigate, Route, Routes } from "react-router-dom";
import { useState, useCallback, useContext } from "react";
import Homepage from "./Components/Main/Homepage";
import Login from "./Components/LogReg/Login/Login";
import Register from "./Components/LogReg/Register/Register";
import RegisterFull from "./Components/LogReg/Register/RegisterFull";
import "./App.css";
import Request from "./Components/Main/Request/Request";
import { AuthenticationContext } from "./Components/Shared/context/auth-context";
import jwtDecode from "jwt-decode";
import Anouncement from "./Components/Main/Announcement/Anouncement";
import Tutorial from "./Components/Main/Tutorial/Tutorial";
import FacultyProfile from "./Components/Main/Profile/FacultyProfile";
import StudentProfile from "./Components/Main/Profile/StudentProfile";
import RequestForm from "./Components/Main/Request/RequestForm";
import ChangePassword from "./Components/Main/Profile/Edit/ChangePassword";
import EditProfile from "./Components/Main/Profile/Edit/EditProfile";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = useContext(AuthenticationContext);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  const token = localStorage.getItem("token");
  if (token) {
    const tokenContent = jwtDecode(token);
    auth.isLoggedIn = true;
    auth.userId = tokenContent.user.id;
    auth.userEmail = tokenContent.user.email;
    auth.userFullName = tokenContent.user.fullName;
    auth.userContactNumber = tokenContent.user.contactNumber;
    auth.userSignature = tokenContent.user.image;
    auth.userType = tokenContent.user.userType;
  }

  return (
    <AuthenticationContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/complete" element={<RegisterFull />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/requests" element={<Request />} />
          <Route path="/announcements" element={<Anouncement />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/profile" element={<StudentProfile />} />
          <Route path="/search/:id" element={<FacultyProfile />} />
          <Route path="/request/form" element={<RequestForm />} />
          <Route path="/account/edit-account" element={<EditProfile />} />
          <Route path="/account/change-password" element={<ChangePassword />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </>
    </AuthenticationContext.Provider>
  );
}

export default App;

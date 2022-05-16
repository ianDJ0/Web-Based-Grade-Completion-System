import { Navigate, Route, Routes } from "react-router-dom";
import { useState, useCallback, useContext } from "react";
import Homepage from "./Components/Main/Homepage";
import Login from "./Components/LogReg/Login/Login";
import Register from "./Components/LogReg/Register/Register";
import RegisterFull from "./Components/LogReg/Register/RegisterFull";
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
import TokenCheck from "./Components/Shared/Auth";

import Dashboard from "./Admin/Components/Main/Dashboard";
import Instructors from "./Admin/Components/Main/Instructors/Instructors";
import Student from "./Admin/Components/Main/Students/Student";
import AccountProfile from "./Admin/Components/Main/Profile/AccountProfile";
import "./App.css";
import AdminRequests from "./Admin/Components/Main/Requests/AdminRequests";
import AdminRequestForm from "./Admin/Components/UI/AdminRequestForm";
import PDF from "./Admin/Components/Main/PDF/PDF";
import Report from "./Admin/Components/Main/PDF/Report";
import AdminLogin from "./Admin/Components/Main/Login/AdminLogin";
import CreateAccount from "./Admin/Components/Main/Profile/CreateAccount";
import EditVMGO from "./Admin/Components/Main/EditVMGO";

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
    auth.userProfilePic = tokenContent.user.profilePicture
      ? tokenContent.user.profilePicture
      : "";
    auth.userType = tokenContent.user.userType;
    auth.userBirthday = tokenContent.user.birthday;
  }
  TokenCheck();
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

          {/**Admin Routes */}

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/" element={<Dashboard />} />
          <Route path="/admin/create" element={<CreateAccount />} />
          <Route path="/admin/faculty" element={<Instructors />} />
          <Route path="/admin/student" element={<Student />} />
          <Route path="/admin/profile" element={<AccountProfile />} />
          <Route path="/admin/request" element={<AdminRequests />} />
          <Route path="/admin/request/form" element={<AdminRequestForm />} />
          <Route path="/admin/request/form/pdf" element={<PDF />} />
          <Route path="/admin/report" element={<Report />} />
          <Route path="/admin/edit" element={<EditVMGO />} />
        </Routes>
      </>
    </AuthenticationContext.Provider>
  );
}

export default App;

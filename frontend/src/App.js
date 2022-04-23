import { Route, Routes } from "react-router-dom";

import Login from "./LogReg/Login/Login";
import SoftRegister from "./LogReg/Register/SoftRegister";
import FullRegister from "./LogReg/Register/FullRegister";
import NewPass from "./LogReg/ForgotPW/NewPass";
import ForgotPW from "./LogReg/ForgotPW/ForgotPW";
import StudentHomepage from "./Homepage/StudentHomepage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<SoftRegister />} />
        <Route path="/register/full" element={<FullRegister />} />
        <Route path="/newpass" element={<NewPass />} />
        <Route path="/forgotpass" element={<ForgotPW />} />
        <Route path="/homepage" element={<StudentHomepage />} />
      </Routes>
    </div>
  );
}

export default App;

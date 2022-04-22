import { Route, Routes } from "react-router-dom";

import Login from "./LogReg/Login/Login";
import SoftRegister from "./LogReg/Register/SoftRegister";
import FullRegister from "./LogReg/Register/FullRegister";
import NewPass from "./LogReg/ForgotPW/NewPass";

import "./App.css";
import ForgotPW from "./LogReg/ForgotPW/ForgotPW";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<SoftRegister />} />
        <Route path="/register/full" element={<FullRegister />} />
        <Route path="/newpass" element={<NewPass/>} />
        <Route path="/forgotpass" element={<ForgotPW/>} />
      </Routes>
    </div>
  );
}

export default App;

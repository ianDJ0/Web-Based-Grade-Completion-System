import { Route, Routes } from "react-router-dom";

import Login from "./LogReg/Login/Login";
import SoftRegister from "./LogReg/Register/SoftRegister";
import FullRegister from "./LogReg/Register/FullRegister";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<SoftRegister />} />
        <Route path="/register/full" element={<FullRegister />} />
      </Routes>
    </div>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";

import Homepage from "./Components/Main/Homepage";
import Login from "./Components/LogReg/Login/Login";
import Register from "./Components/LogReg/Register/Register";
import RegisterFull from "./Components/LogReg/Register/RegisterFull";

import "./App.css";
import Request from "./Components/Main/Request/Request";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/complete" element={<RegisterFull />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/requests" element={<Request />} />
      </Routes>
    </>
  );
}

export default App;

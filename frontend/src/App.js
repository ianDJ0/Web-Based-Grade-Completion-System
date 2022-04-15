import { Route, Routes } from "react-router-dom";

import AccountDetails from "./AccountDetails";
import Login from "./LogReg/Login/Login";
import SoftRegister from "./LogReg/Register/SoftRegister";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<SoftRegister />} />
        <Route path="/accountdetails" element={<AccountDetails />} />
      </Routes>
    </div>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import { useState, useCallback } from "react";
import Homepage from "./Components/Main/Homepage";
import Login from "./Components/LogReg/Login/Login";
import Register from "./Components/LogReg/Register/Register";
import RegisterFull from "./Components/LogReg/Register/RegisterFull";

import "./App.css";
import Request from "./Components/Main/Request/Request";
import { AuthenticationContext } from "./Components/Shared/context/auth-context"

function App() {
  const [isLoggedIn, setIsLoggedIn]= useState(false);

  const login = useCallback(()=>{
    setIsLoggedIn(true);
  },[])
  const logout = useCallback(()=>{
    setIsLoggedIn(false);
  },[])

  

  return (
    <AuthenticationContext.Provider value={{isLoggedIn:isLoggedIn, login:login, logout:logout}}>
      <>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/complete" element={<RegisterFull />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/requests" element={<Request />} />
        </Routes>
      </>
    </AuthenticationContext.Provider>
  );
}

export default App;

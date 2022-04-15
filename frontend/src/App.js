import logo from './logo.svg';
import './App.css';
import Login from "./Login";
import{Route, Routes } from "react-router-dom";
import AccountDetails from "./AccountDetails";

function App() {
  return (
    <div className="App">
<Routes>
  <Route path="/" element = {<Login/>}/>
  <Route path="/accountdetails" element = {<AccountDetails/>}/>
</Routes>
    </div>
  );
}

export default App;

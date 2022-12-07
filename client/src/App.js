import "./App.css";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import { useState } from "react";
import Error from "./Error";

function App() {
  const [user, setUser] = useState(null);
  const [errCode, setErrCode] = useState(200);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home user={user} />} /> 
        <Route path="/login" element={<Login user={user} setUser={setUser} setErrCode={setErrCode}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/error" element={<Error errCode={errCode}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

//TODO -> add pages for error(wrong creds)

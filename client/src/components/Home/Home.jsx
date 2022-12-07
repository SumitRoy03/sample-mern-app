import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
const Home = ({user}) => {
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

  const handleClickLogin = ()=> {
    navigate('/login');
  }
  const handleClickSignup = ()=> {
    navigate('/register');
  }

  useEffect(() => {
    setInterval(() => setDate(new Date()), 1000);
  }, [date]);

  return (
    <div className="container">
      <h1>Hello, <span>{user!=null ? user : "World"}</span></h1>
      <div className="Digits">
        {("0" + date.getHours()).slice(-2)}
        <span>:</span>
        {("0" + date.getMinutes()).slice(-2)}
        <span>:</span>
        {("0" + date.getSeconds()).slice(-2)}
      </div>
      <div className="buttons">
        <button className="btn" onClick={handleClickLogin}>
          Login
        </button>
        <button className="btn" onClick={handleClickSignup}>
          Join us
        </button>
      </div>
    </div>
  );
};

export default Home;

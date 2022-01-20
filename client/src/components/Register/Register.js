import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(e) {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        password
      })
    });

    const data = await res.json();
    console.log(data);

    if (data.status === "ok") {
      navigate("/login");
    }
  }

  return (
    <>
      <Header />
      <div className="auth-container">
        <h2>Register</h2>
        <form onSubmit={registerUser}>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            type="text"
            placeholder="username"
          />
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />
          <input type="submit" value="Register" />
        </form>
        <div className="login-link">
          <Link to="/login">Log in</Link>
        </div>
      </div>
    </>
  );
};

export default Register;
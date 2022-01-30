import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/Header";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function registerUser(e) {
    e.preventDefault();

    const res = await fetch("/api/register", {
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

    if (data.status === "ok") {
      navigate("/login");
    } else if (data.status === "error") {
      if (data.error === "No password") {
        setError("password");
      } else if (data.error === "Duplicate Username") {
        setError("username");
      }
    }
  }

  return (
    <>
      <Header />
      <div className="auth-container">
        <h2>Register</h2>
        {error === "password" && <p className="error">Password is empty!</p>}
        {error === "username" && (
          <p className="error">Username is already taken!</p>
        )}
        <form onSubmit={registerUser}>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            type="text"
            placeholder="username"
            autoFocus
          />
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />
          <input type="submit" value="Register" />
        </form>
        <div className="auth-link">
          <Link to="/login">Log in</Link>
        </div>
      </div>
    </>
  );
};

export default Register;

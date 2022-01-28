import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/Header";

const Login = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  async function loginUser(e) {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/login", {
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

    if (data.user) {
      localStorage.setItem("token", data.user);
      navigate("/chat", { state: { user: name } });
    } else {
      setError(true);
    }
  }

  return (
    <>
      <Header />
      <div className="auth-container">
        <h2>Login</h2>
        {error && <p className="error">Invalid username or password!</p>}
        <form onSubmit={loginUser}>
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
          <input type="submit" value="Login" />
        </form>
        <div className="auth-link">
          <Link to="/register">Register</Link>
        </div>
      </div>
    </>
  );
};

export default Login;

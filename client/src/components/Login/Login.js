import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";

const Login = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

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
    console.log(data);

    if (data.user) {
      localStorage.setItem("token", data.user);
      alert("Login successful");
      navigate("/chat", { state: { user: name } });
    } else {
      alert("Please chceck your username and password");
    }
  }

  return (
    <>
      <Header />
      <div className="auth-container">
        <h2>Login</h2>
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
      </div>
    </>
  );
};

export default Login;

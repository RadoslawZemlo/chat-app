import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import "./Home.css";

const Home = () => {
  return (
    <>
      <Header />
      <div className="home-container">
        <h2>Welcome on Chat App</h2>
        <p>
          To start chatting <Link to="/register">register</Link> or{" "}
          <Link to="/login">log in</Link> if you already have an account
        </p>
      </div>
    </>
  );
};

export default Home;

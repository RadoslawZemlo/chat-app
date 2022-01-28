import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({ user }) => {
  return (
    <header className="header">
      <Link to="/">
        <h1>Chat App</h1>
      </Link>
      {user && <p>{user}</p>}
    </header>
  );
};

export default Header;

import React from "react";
import "./Header.css";

const Header = ({ user }) => {
  return (
    <header className="header">
      <h1>Chat App</h1>
      {user && <p>{user}</p>}
    </header>
  );
};

export default Header;

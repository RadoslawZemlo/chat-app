import React from "react";

const Header = ({ user }) => {
  return (
    <header className="header">
      <h1>Chat App</h1>
      {user && <p>{user}</p>}
    </header>
  );
};

export default Header;

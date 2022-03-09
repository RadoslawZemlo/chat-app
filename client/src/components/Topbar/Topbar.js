import React, { useState } from "react";
import Users from "../Users/Users";
import "./Topbar.css";

const Topbar = ({ socket, user }) => {
  const [toggle, setToggle] = useState(false);

  const toggleUsers = () => setToggle(!toggle);

  return (
    <div className="topbar">
      <h2>Global Chat</h2>
      <div className="toggle-container">
        <input type="submit" name="users" value="users" onClick={toggleUsers} />
        <Users socket={socket} user={user} toggle={toggle} />
      </div>
    </div>
  );
};

export default Topbar;

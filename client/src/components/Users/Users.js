import React, { useState, useEffect } from "react";
import "./Users.css";

const Users = ({ toggle }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users");
      const data = await res.json();

      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={toggle ? "users-container active" : "users-container"}>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;

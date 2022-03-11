import React, { useState, useEffect } from "react";
import "./Users.css";

const Users = ({ user, socket, toggle }) => {
  const [users, setUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    getUsers(user);
  }, [user]);

  useEffect(() => {
    const getOnlineUsers = users => setOnlineUsers(users);

    socket.on("online-users", getOnlineUsers);

    return () => {
      socket.off("online-users", getOnlineUsers);
    };
  }, [socket]);

  const getUsers = async user => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      const index = data.indexOf(user);

      data.splice(index, 1);

      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={toggle ? "users-container active" : "users-container"}>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <span
              className={onlineUsers.includes(user) ? "online" : "offline"}
            ></span>
            {user}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;

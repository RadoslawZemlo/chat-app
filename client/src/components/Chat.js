import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
import Conversation from "./Conversation";
import Input from "./Input";
import Users from "./Users";

const Chat = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { user } = state;

  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const userToken = jwt.decode(token);

      if (!userToken) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  }, []);

  useEffect(() => {
    getUsers();
    getMessages();
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

  const getMessages = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/messages");
      const data = await res.json();

      setMessages(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="outer-container">
      <h2>Global Chat</h2>
      <p>{user}</p>
      <div className="chat-container">
        <Conversation messages={messages} />
        <Input user={user} getMessages={getMessages} />
      </div>
      <div className="users-container">
        <Users users={users} />
      </div>
    </div>
  );
};

export default Chat;

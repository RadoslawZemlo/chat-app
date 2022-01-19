import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
import Conversation from "./Conversation";
import Input from "./Input";
import Users from "./Users";

const Chat = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { user } = state;

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

  return (
    <div className="outer-container">
      <h2>Global Chat</h2>
      <p>{user}</p>
      <div className="chat-container">
        <Conversation />
        <Input user={user} />
      </div>
      <Users />
    </div>
  );
};

export default Chat;

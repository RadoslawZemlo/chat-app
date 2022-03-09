import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
import { io } from "socket.io-client";
import Header from "../Header/Header";
import Topbar from "../Topbar/Topbar";
import Conversation from "../Conversation/Conversation";

const socket = io("http://localhost:5000");

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
  }, [navigate]);

  useEffect(() => {
    socket.emit("user-login", user);
  }, [user]);

  return (
    <>
      <Header user={user} />
      <div className="chat-container">
        <Topbar socket={socket} user={user} />
        <Conversation user={user} socket={socket} />
      </div>
    </>
  );
};

export default Chat;

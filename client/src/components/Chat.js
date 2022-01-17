import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
import Conversation from "./Conversation";
import Input from "./Input";

const Chat = () => {
  const navigate = useNavigate();

  const [sender, setSender] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = jwt.decode(token);

      if (!user) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setSender(user.name);
      }
    }
  }, []);

  return (
    <div className="outer-container">
      <h2>Global Chat</h2>
      <div className="chat-container">
        <Conversation />
        <Input sender={sender} />
      </div>
    </div>
  );
};

export default Chat;

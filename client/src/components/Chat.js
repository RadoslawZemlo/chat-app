import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
import Conversation from "./Conversation";
import Input from "./Input";

const Chat = () => {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
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

  useEffect(() => {
    getMessages();
  });

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
      <div className="chat-container">
        <Conversation messages={messages} />
        <Input sender={sender} />
      </div>
    </div>
  );
};

export default Chat;

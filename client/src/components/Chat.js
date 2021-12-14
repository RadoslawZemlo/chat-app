import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
import Conversation from "./Conversation";
import Input from "./Input";

const Chat = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = jwt.decode(token);

      if (!user) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setName(user.name);
      }
    }
  }, []);

  console.log(name);

  return (
    <div className="chat-container">
      <Conversation />
      <Input message={message} setMessage={setMessage} />
    </div>
  );
};

export default Chat;

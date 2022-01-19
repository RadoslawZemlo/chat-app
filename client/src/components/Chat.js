import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
import Header from "./Header";
import Topbar from "./Topbar";
import Conversation from "./Conversation";
import Input from "./Input";

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
    <>
      <Header user={user} />
      <div className="chat-container">
        <Topbar />
        <Conversation />
        <Input user={user} />
      </div>
    </>
  );
};

export default Chat;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";

// const Input = ({ message, setMessage }) => {
const Input = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const displayMessage = async () => {
    const req = await fetch("http://localhost:5000/api/message", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    });

    const data = await req.json();
    if (data.status === "ok") {
      setMessage(data.messege);
    } else {
      alert(data.error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        displayMessage();
      }
    }
  }, []);

  const sendMessage = async e => {
    e.preventDefault();

    const req = await fetch("http://localhost:5000/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "appliation/json",
        "x-access-token": localStorage.getItem("token")
      },
      body: JSON.stringify({
        message: newMessage
      })
    });

    const data = await req.json();

    if (data.status === "ok") {
      console.log(newMessage);
      setMessage(newMessage);
      setNewMessage("");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="message-input">
      <p>Message: {message || "No messages"}</p>
      <form onSubmit={sendMessage}>
        <input
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          type="text"
          placeholder="Type a message..."
        />
        <input type="submit" value="Send message" />
      </form>
    </div>
  );
};

export default Input;

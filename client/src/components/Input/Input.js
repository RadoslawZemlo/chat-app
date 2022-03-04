import React, { useState } from "react";
import "./Input.css";

const Input = ({ user, socket, messages, setMessages }) => {
  const [message, setMessage] = useState("");

  const sendMessage = async e => {
    e.preventDefault();

    const res = await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user,
        message
      })
    });

    const data = await res.json();

    if (data.status === "ok") {
      setMessages([...messages, { sender: user, message: message }]);
      socket.emit("send-chat-message", message);
      setMessage("");
    }
  };

  return (
    <div className="message-input">
      <form onSubmit={sendMessage}>
        <input
          value={message}
          onChange={e => setMessage(e.target.value)}
          type="text"
          placeholder="Type a message..."
          autoFocus
        />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
};

export default Input;

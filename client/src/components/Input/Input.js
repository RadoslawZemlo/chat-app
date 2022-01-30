import React, { useState } from "react";
import "./Input.css";

const Input = ({ user }) => {
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

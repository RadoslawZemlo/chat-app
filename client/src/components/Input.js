import React, { useState } from "react";

const Input = ({ sender, getMessages }) => {
  const [message, setMessage] = useState("");

  const sendMessage = async e => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sender,
        message
      })
    });

    const data = await res.json();

    if (data.status === "ok") {
      setMessage("");
      getMessages();
    } else {
      console.log(data.error);
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
        />
        <input type="submit" value="Send message" />
      </form>
    </div>
  );
};

export default Input;

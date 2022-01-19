import React, { useState, useEffect } from "react";

const Conversation = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages();
    const timer = setInterval(getMessages, 3000);

    return () => clearInterval(timer);
  }, []);

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
    <div className="conversation-container">
      {messages.map((message, index) => (
        <div key={index} className="message-container">
          <p>
            {message.sender}: {message.message}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Conversation;

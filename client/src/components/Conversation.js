import React, { useState, useEffect, useRef } from "react";

const Conversation = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const last = useRef(null);

  const scrollToBottom = () => {
    last.current.scrollIntoView(false);
  };

  useEffect(() => {
    getMessages();
    const timer = setInterval(getMessages, 3000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
        <div
          key={index}
          className={
            message.sender === user
              ? "message-container message-sended"
              : "message-container"
          }
        >
          {message.sender === user ? (
            <p>{message.message}</p>
          ) : (
            <>
              <p className="user-name">{message.sender}</p>
              <p>{message.message}</p>
            </>
          )}
        </div>
      ))}
      <div ref={last} className="last"></div>
    </div>
  );
};

export default Conversation;

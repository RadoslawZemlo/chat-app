import React, { useState, useEffect, useRef } from "react";
import Input from "../Input/Input";
import "./Conversation.css";

const Conversation = ({ user, socket }) => {
  const [messages, setMessages] = useState([]);
  const last = useRef(null);

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const join = user =>
      setMessages([...messages, { message: `${user} join` }]);

    const hasLeft = user =>
      setMessages([...messages, { message: `${user} has left` }]);

    const message = data =>
      setMessages([
        ...messages,
        { sender: data.sender, message: data.message }
      ]);

    socket.on("user-connected", join);
    socket.on("chat-message", message);
    socket.on("user-disconnected", hasLeft);

    return () => {
      socket.off("user-connected", join);
      socket.off("chat-message", message);
      socket.off("user-disconnected", hasLeft);
    };
  }, [socket, messages]);

  const getMessages = async () => {
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();

      setMessages(data);
    } catch (err) {
      console.log(err);
    }
  };

  const scrollToBottom = () => {
    last.current.scrollIntoView(false);
  };

  return (
    <>
      <div className="conversation-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${message.sender ? "message-container" : "info"} ${
              message.sender === user ? "message-sended" : ""
            }`}
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
      <Input
        user={user}
        socket={socket}
        messages={messages}
        setMessages={setMessages}
      />
    </>
  );
};

export default Conversation;

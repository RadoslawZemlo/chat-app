import React from "react";

const Conversation = ({ messages }) => {
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

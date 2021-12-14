import React from "react";

const Input = ({ message, setMessage }) => {
  const sendMessage = e => {
    e.preventDefault();

    if (message) {
      console.log(message);
      setMessage("");
    }
  };

  return (
    <div className="message-input">
      <form onSubmit={sendMessage}>
        <input
          value={message}
          onChange={({ target: { value } }) => setMessage(value)}
          type="text"
          placeholder="Type a message..."
        />
        <input type="submit" value="Send message" />
      </form>
    </div>
  );
};

export default Input;

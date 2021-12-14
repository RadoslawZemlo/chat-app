import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";

const Chat = () => {
  const navigate = useNavigate();

  async function populateQuote() {
    const req = await fetch("http://localhost:5000/api/quote", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    });

    const data = req.json();
    console.log(data);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = jwt.decode(token);
      console.log(user);

      if (!user) {
        localStorage.removeItem("token");
        navigate("/chat");
      } else {
        populateQuote();
      }
    }
  }, []);

  return (
    <div>
      <h2>Welcome to Chat</h2>
    </div>
  );
};

export default Chat;

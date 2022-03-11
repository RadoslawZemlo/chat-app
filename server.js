const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/api");
const path = require("path");
const dotenv = require("dotenv");
const { createServer } = require("http");
const { Server } = require("socket.io");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/chat-app";
const PORT = process.env.PORT || 5000;

const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.log(err));

app.use("/api", routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

const onlineUsers = {};

io.on("connection", socket => {
  console.log("Socket on!");

  socket.on("user-login", user => {
    onlineUsers[socket.id] = user;
    socket.broadcast.emit("user-connected", user);

    io.emit("online-users", Object.values(onlineUsers));
  });

  socket.on("send-chat-message", message => {
    socket.broadcast.emit("chat-message", {
      sender: onlineUsers[socket.id],
      message: message
    });
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", onlineUsers[socket.id]);
    delete onlineUsers[socket.id];

    io.emit("online-users", Object.values(onlineUsers));
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

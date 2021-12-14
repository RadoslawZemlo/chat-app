const express = require("express");

const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/chat-app");

app.post("/api/register", async (req, res) => {
  try {
    await User.create({
      name: req.body.name,
      password: req.body.password
    });

    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: "Duplicate Username" });
  }
});

app.post("/api/login", async (req, res) => {
  console.log(req.body);

  const user = await User.findOne({
    name: req.body.name,
    password: req.body.password
  });

  if (user) {
    const token = jwt.sign(
      {
        name: user.name
      },
      "casablanca21"
    );

    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.get("/api/message", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "casablanca21");
    const name = decoded.name;
    const user = await User.findOne({ name: name });

    return res.json({ status: "ok", message: user.message });
  } catch (err) {
    console.log(error);
    res.json({ status: "error", error: "Invalid token" });
  }
});

app.post("/api/message", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "casablanca21");
    const name = decoded.name;
    await User.updateOne(
      { name: name },
      { $set: { message: req.body.message } }
    );

    return res.json({ status: "ok" });
  } catch (err) {
    console.log(error);
    res.json({ status: "error", error: "Invalid token" });
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});

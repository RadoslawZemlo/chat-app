const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const Message = require("../models/message.model");

const router = express.Router();

router.post("/register", async (req, res) => {
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

router.post("/login", async (req, res) => {
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

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});

    res.json(users);
  } catch (err) {
    console.log(err);
  }
});

router.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find({});

    res.json(messages);
  } catch (err) {
    console.log(err);
  }
});

router.post("/messages", async (req, res, next) => {
  try {
    await Message.create({
      sender: req.body.user,
      message: req.body.message
    });

    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: "error" });
  }
});

module.exports = router;

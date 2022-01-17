const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

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

module.exports = router;

const mongoose = require("mongoose");

const User = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  message: { type: String }
});

const model = mongoose.model("user", User);

module.exports = model;

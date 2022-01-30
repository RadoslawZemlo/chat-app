const mongoose = require("mongoose");

const Message = new mongoose.Schema(
  {
    sender: { type: String },
    message: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const model = mongoose.model("message", Message);

module.exports = model;

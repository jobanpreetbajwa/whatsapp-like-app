// models/users.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  chatId: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("users", userSchema);

module.exports = User;

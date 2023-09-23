const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  chatId: {type: String, required: true},
  fromUserId: { type: String, required: true },
  toUserId: { type: String, required: true },
  message: {type: String, required: true},
  createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.model("messages", messageSchema);

module.exports = Message;


const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    chatId: {type: String,required: true,unique: true},
  users:[ { type: String, required: true }],
  createdAt: { type: Date, default: Date.now },
});

const Chats = mongoose.model("chats", chatSchema);

module.exports = Chats;
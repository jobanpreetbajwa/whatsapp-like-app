
const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  friendId: {type: String, required: true},
  friendName: {type: String, required: true},
  createdAt: { type: Date, default: Date.now },
});

const Friends = mongoose.model("friends", friendSchema);

module.exports = Friends;
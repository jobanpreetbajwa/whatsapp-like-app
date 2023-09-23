
const mongoose = require("mongoose");

const otpAuthSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true,unique: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const OTPAuth = mongoose.model("otp_auth", otpAuthSchema);

module.exports = OTPAuth;

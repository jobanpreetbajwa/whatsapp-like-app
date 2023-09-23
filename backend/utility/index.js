const crypto = require('crypto');

function generateOTP(length) {
    const chars = '0123456789';
    const otp = [];
    for (let i = 0; i < length; i++) {
      const randomIndex = crypto.randomInt(0, chars.length);
      otp.push(chars[randomIndex]);
    }
    return otp.join('');
  }

module.exports.generateOTP = generateOTP;
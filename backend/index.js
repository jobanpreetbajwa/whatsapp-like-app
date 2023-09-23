const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const OTPAuth = require('./database/models/otpAuth');
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/whatsapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/hello', (req, res) => {
    console.log("hello")
  res.json({ message: 'This is a sample route with CORS enabled!' });
});

const otps = {

}

function generateOTP(length) {
    const chars = '0123456789';
    const otp = [];
    for (let i = 0; i < length; i++) {
      const randomIndex = crypto.randomInt(0, chars.length);
      otp.push(chars[randomIndex]);
    }
    return otp.join('');
  }
  
app.post('/sendOtp', async (req,res)=>{
    try {
        const body = req.body;
        const otp = generateOTP(6);

        otps[body.phoneNumber] = otp;    
        await OTPAuth.create({otp,phoneNumber:body.phoneNumber})

        res.status(200).send({message:'Otp Send Successfully',otp})
    }
    catch(error){
      res.status(500).send({message:`Failed with error ${error.message}`})
    }
})

app.post('/verifyOtp', async (req,res)=>{
    try {
        const body = req.body;
       const data = await OTPAuth.findOne({phoneNumber:body.phoneNumber}).select('otp');
       console.log("saved",data)
        if (data.otp === body.otp){
            res.status(200).send('Otp Verified Successfully')
        }
        else{
            res.status(400).send('Unable to verify')
        }
    }
    catch(error){

    }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

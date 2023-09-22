const express = require('express');
const cors = require('cors');
const crypto = require('crypto');


const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Define a sample route
app.get('/hello', (req, res) => {
    console.log("hello")
  res.json({ message: 'This is a sample route with CORS enabled!' });
});

const otps = {

}

function generateOTP(length) {
    const chars = '0123456789'; // You can include more characters if needed
    const otp = [];
    for (let i = 0; i < length; i++) {
      const randomIndex = crypto.randomInt(0, chars.length);
      otp.push(chars[randomIndex]);
    }
    return otp.join('');
  }
  
app.post('/sendOtp', (req,res)=>{
    try {
        const body = req.body;
        const otp = generateOTP(6);

        otps[body.phoneNumber] = otp;    

        res.status(200).send({message:'Otp Send Successfully',otp})
    }
    catch(error){

    }
})

app.post('/verifyOtp', (req,res)=>{
    try {
        const body = req.body;
       
        if (otps[body.phoneNumber] === body.otp){
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

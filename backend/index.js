const express = require('express');
const cors = require('cors');
const OTPAuth = require('./database/models/otpAuth');
const mongoose = require("mongoose");
const User = require('./database/models/users');
const Friends = require('./database/models/friends');
const { generateOTP } = require('./utility');
const Chats = require('./database/models/chats');
const { v4: uuidv4 } = require('uuid');
const Message = require('./database/models/messages');
const WebSocket = require('ws');

const app = express();

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const wss = new WebSocket.Server({server});
const clients = new Map();

wss.on('connection', (ws,req) => {
  console.log("Herer")
  ws.on('message', (message) => {
    
    const data = JSON.parse(message);
    console.log("messa",data)
    if (data.type === 'join') {
      const { userId } = data;
      clients.set(userId, ws);
      console.log(`User ${userId} connected`);
    } else if (data.type === 'message') {
      // Send a message to a specific user by their userId
      const { to, text,userId } = data;
      const toSocket = clients.get(to);
      console.log("cleints",clients)
      if (toSocket) {
        toSocket.send(JSON.stringify({ type: 'message', from: userId, text }));
      }
    }
  })
  ws.on('close', () => {
    // Handle user disconnection and remove them from the clients map
    for (const [userId, socket] of clients.entries()) {
      if (socket === ws) {
        clients.delete(userId);
        console.log(`User ${userId} disconnected`);
        break;
      }
    }
  });
});
mongoose.connect("mongodb://localhost/whatsapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



app.use(cors());
app.use(express.json());
  
app.post('/sendOtp', async (req,res)=>{
    try {
        const body = req.body;
        const otp = generateOTP(6);
        const otpData = await OTPAuth.findOne({phoneNumber:body.phoneNumber});
        if (otpData){
          console.log("herer")
          await OTPAuth.findOneAndUpdate({phoneNumber:body.phoneNumber},{otp})
        }
       else{
        await OTPAuth.create({otp,phoneNumber:body.phoneNumber})
       }

        res.status(200).send({message:'Otp Send Successfully',otp})
    }
    catch(error){
      res.status(500).send({message:`Failed with error ${error.message}`})
    }
})

app.post('/verifyOtp', async (req,res)=>{
    try {
        const {phoneNumber,otp} = req.body;
       const data = await OTPAuth.findOne({phoneNumber}).select('otp');
        if (data.otp === otp){
          let user;
             user = await User.findOne({phoneNumber});
            if (!user){
              user = await User.create({phoneNumber,username:phoneNumber})
            }
            //add this userId in token
            res.status(200).send({message: 'Otp Verified Successfully',userId: user.id})
        }
        else{
            res.status(400).send('Unable to verify')
        }
    }
    catch(error){
      console.log("error",error)
    }
})

app.get('/getUser/:id', async (req,res)=>{
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    const friends = await Friends.find({userId: user.id});

    res.status(200).send({user,friends})
  }
  catch(error){
    console.log("error",error)
  }
})

app.post('/addUser', async (req,res)=>{
  try {
    const {userId,friendPhoneNumber} = req.body;
    const user = await User.findById(userId);
    const friend = await User.findOne({phoneNumber:friendPhoneNumber});

    if (!user || !friend){
      res.status(404).send({message:'One ot both users not found'})
    }
    const isFriends = await Friends.findOne({userId,friendId:friend.id});
    if (isFriends){
      res.status(400).send({message:'Already added'})
    }
    else{
      await Friends.create({userId,friendId: friend.id, friendName: friend.phoneNumber});
      await Friends.create({userId:friend.id,friendId: userId, friendName: user.phoneNumber})
  
      res.status(200).send({message:'succesfully added'})
    }

  }
  catch(error){
    console.log("error",error)
  }
})

app.get('/getChat/', async (req,res)=>{
  try {
  
    const userId = req.query.currentUserId;
    const friendId = req.query.friendId;
    // console.log("res",userId,friendId)
    const chat = await Chats.findOne({
      $and: [
        { users: { $all: [userId, friendId] } },
        { users: { $size: 2 } }, // Ensure that there are exactly 2 users in the chat (userId and friendId)
      ],
    })
    // console.log("chat",chat);

    if (!chat){
      return res.status(200).send({chat:[]})
    }

    const chats = await Message.find({ chatId:chat.chatId }).sort({ createdAt: 1 })

    return res.status(200).send({chat:chats,chatId:chat.chatId});
  }
  catch(error){
    console.log("error",error)
  }
})

app.post('/sendMessage',async (req,res)=>{
  // console.log("body",req.body)
  try {const {chatId, fromUserId, toUserId, message} = req.body;

    if (!chatId){
      const uniqueId = uuidv4();
      await Chats.create({chatId:uniqueId,users:[fromUserId,toUserId]});
      await Message.create({chatId:uniqueId,fromUserId,toUserId,message});
      return res.status(200).send({chatId:uniqueId});
    }else{
      await Message.create({chatId,fromUserId,toUserId,message});
    }
    return res.status(200).send({chatId});
  }
  catch(error){
    console.log("errror",error)
  }
})



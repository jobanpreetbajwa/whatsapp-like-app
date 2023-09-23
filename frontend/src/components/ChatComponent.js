import { styled } from "styled-components";
import { SearchConatiner } from "./ContactList";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../constant";
import moment from 'moment';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 2;
  background: #f6f7f8;
`;
const ProfileHeader = styled.div`
  display: flex;
  flex-direction: row;
  padding: 15px;
  background-color: #ededed;
  align-item: center;
  gap: 10px;
`;
const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;
const ChatBox = styled.div`
  display: flex;
  background: #f0f0f0;
  padding: 10px;
  align-item: center;
  bottom: 0;
`;

const Input = styled.input`
  width: 100%;
  border-style: none;
  font-size: 15px;
`;
const SearchBar = styled.div`
  display: flex;
  margin-left: 10px;
  background: #ededed;
  width: 100%;
  border:none
`;
const EmojiImage = styled.div`
  width: 30px;
  height: 28px;
  margin-left: 10px;
  opacity: 0.4;
  cursor: pointer;
`;
const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #ece5dd;
  height: 100%;
`;
const MessageDiv = styled.div`
  display: flex;
  justify-content: ${(props) => (props.isyours ? "flex-end" : "flex-start")};
  margin: 5px 16px;
`;
const Message = styled.div`
  max-width: 50%;
  color: #303030;
  background: d8f8cb;
  padding: 10px 10px;
  font-size: 14px;
  border-radius: 15%;
`;
const Time = styled.div`
  font-size: 10px;
  text-align: end;
`;
const ChatComponent = ({friendId}) => {

  const currentUserId = localStorage.getItem("userId");

  const [chat,setChat] = useState();
  const [message,setMessage] = useState('');
  const [chatId, setChatId] = useState('');

  const sendMessage = ()=>{
    try {
      return axios.post(`${SERVER_URL}/sendMessage`,{
        fromUserId: currentUserId,
        toUserId: friendId,
        message,
        chatId
      })
    }
    catch(error){

    }
  }

  useEffect(()=>{

    const getChat = async (friendId)=>{
      const response = await axios.get(`${SERVER_URL}/getChat`,{
       params: { currentUserId,friendId}
      });
   
      setChat(response.data.chat)
      setChatId(response.data.chatId)
    }
    getChat(friendId)
  },[friendId])

  const handleEnterKeyPress = async (e) => {
    if (e.key === 'Enter') {
     const res = await sendMessage()
  
     setChatId(res.data.chatId)
     setMessage('')
    }
  };

  return (
    <>
      <Container>
        <ProfileHeader>
          <ProfileImage src="/profile/f1.jpeg"></ProfileImage>
          in ChatComponent
        </ProfileHeader>
        <MessageContainer>
          {chat && chat.map(item=>
            {
              const date = moment(item.createdAt);
              const formattedTime = date.format('hh:mm A');
              return <MessageDiv isyours={item.fromUserId === currentUserId}>
              <Message>{item.message} <Time>{formattedTime}</Time></Message>
            </MessageDiv>
            }
            
          )}

        </MessageContainer>
        <ChatBox>
          <SearchConatiner>
            <EmojiImage>
              <HiOutlineEmojiHappy size={30} />
            </EmojiImage>
            <SearchBar>
              <Input placeholder="Type a message here" onChange={(e)=>setMessage(e.target.value)} 
               onKeyPress={handleEnterKeyPress}
              value = {message}></Input>
            </SearchBar>
          </SearchConatiner>
        </ChatBox>
      </Container>
    </>
  );
};
export default ChatComponent;

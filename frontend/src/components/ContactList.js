import { styled } from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import "./ContactList.css";
import { DataInfo } from "./Data";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { SERVER_URL } from "../constant";
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { useAppContext } from "../store/AppContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #ededed;
  flex: 0.9;
`;
const ProfileInfo = styled.div`
  display: flex;
  flex-direction: row;
  background: #ededed;
  padding: 15px;
  align-items: center
`;
const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  margin-left:8px;
  border-radius: 50%;
`;
export const SearchBar = styled.div`
  display: flex;
  background: #ededed;
  padding: 8px;
`;

export const SearchConatiner = styled.div`
  display: flex;
  height: 30px;
  flex-direction: row;
  background: white;
  border-radius: 9px;
  padding: 10px 0;
  width: 100%;
`;
const SearchIcon = styled.div`
padding:6px;
margin-left:8px;
width:30px;
heigth;30px;
`;
const ContactItem = styled.div`
  display: flex;
  flex-direction: row;
  // width:100%;
  border-radius: 10px;
  border-bottom: 2px solid #f2f2f2;
  background: white;
  margin-bottom: 1px;
  cursor: pointer;
  padding: 15px;
`;
const ProfileIcon = styled.img`
  width: 38px;
  height: 38px;
  padding: 8px;
  border-radius:50%;
`;
const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 10px;
`;
const ContactName = styled.span`
  display: flex;
  font-size: 16px;
  padding: 2px;
  color: black;
`;
const Messages = styled.span`
  width: 100px;
  padding: 2px;
  font-size: 14px;
  margin-top: 3px;
  color: rgba(0, 0, 0, 0.8);
`;

const ContactComponent = (props) => {

  const data = props.data;
  return (
    <ContactItem>
      <ProfileIcon src={'/profile/f1.jpeg'} />
      <ContactInfo>
        <ContactName>{data?.friendName}</ContactName>
        {/* <Messages>{data?.localText}</Messages> */}
      </ContactInfo>
      {/* <Messages>{data?.lastTextTime}</Messages> */}
    </ContactItem>
  );
};

const ContactList = (props) => {
  const [userName,setUserName] = useState('')
  const [currentUserId, setCurrentUserId] = useState(localStorage.getItem("userId"))
  const [friendNumber,setFriendNumber] = useState('');

  const {state,dispatch} = useAppContext();

  useEffect(()=>{
    const getUser = async (userId)=>{
      try {
        const res = await axios.get(`${SERVER_URL}/getUser/${userId}`);

        dispatch({type:'ADD_FRIENDS',friends:res.data.friends})
        setUserName(res.data.user.username)
      }
      catch(error){
        
      }
    }
    getUser(currentUserId)
  },[])

  const [isEditing,setIsEditing] = useState(true);

  const addUser = async ()=>{
      try{

        const res = await axios.post(`${SERVER_URL}/addUser`,{
          userId: currentUserId,
          friendPhoneNumber:friendNumber
        })
        const response = await axios.get(`${SERVER_URL}/getUser/${currentUserId}`);

        dispatch({type:'ADD_FRIENDS',friends:response.data.friends})
      }
      catch(error){

      }
  }

  const handleOnClick = (userId)=>{
    dispatch({type:'SET_CURRENT_OPEN',userId})
  }

  return (
    <>
      <Container>
        <ProfileInfo>
          <ProfileImage src="/profile/f1.jpeg"></ProfileImage>
          <TextField style={{padding: '5px'}} id="standard-basic" variant="standard" value={userName} disabled={isEditing}
          onBlur={()=>{
            setIsEditing(true)
          }}
          />
          <EditIcon style={{cursor:'pointer'}} onClick={()=>setIsEditing(false)}/>
          <Button onClick={props.onLogout}>Logout</Button>
        </ProfileInfo>
        <SearchBar>
          <SearchConatiner>
            <SearchIcon> <AiOutlineSearch size={20} /></SearchIcon>
            
            <input
              className="searchbar "
              placeholder="search or start new chat"
              onChange={(e)=>setFriendNumber(e.target.value)}
              value = {friendNumber}
              onBlur={addUser}
            ></input>
          </SearchConatiner>
        </SearchBar>
        {state.friends && state.friends.map((item) => {
          return <div onClick={() => handleOnClick(item.friendId)}>
            <ContactComponent  data={item}></ContactComponent>
          </div>;
        })}
      </Container>
    </>
  );
};
export default ContactList;

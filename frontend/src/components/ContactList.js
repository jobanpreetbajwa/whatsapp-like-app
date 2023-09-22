import { styled } from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import "./ContactList.css";
import { DataInfo } from "./Data";
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
      <ProfileIcon src={data?.profilePic} />
      <ContactInfo>
        <ContactName>{data?.name}</ContactName>
        <Messages>{data?.localText}</Messages>
      </ContactInfo>
      <Messages>{data?.lastTextTime}</Messages>
    </ContactItem>
  );
};

const ContactList = () => {
  return (
    <>
      <Container>
        <ProfileInfo>
          <ProfileImage src="/profile/f1.jpeg"></ProfileImage>
        </ProfileInfo>
        <SearchBar>
          <SearchConatiner>
            <SearchIcon> <AiOutlineSearch size={20} /></SearchIcon>
            
            <input
              className="searchbar "
              placeholder="search or start new chat"
            ></input>
          </SearchConatiner>
        </SearchBar>
        {DataInfo.map((item) => {
          return <ContactComponent data={item}></ContactComponent>;
        })}
      </Container>
    </>
  );
};
export default ContactList;

import styled from "styled-components";
import ContactList from "./components/ContactList";
import ChatComponent from "./components/ChatComponent";
import { LandingPage } from "./components/LandingPage";
import { useAppContext } from "./store/AppContext";
import { useState } from "react";

const Container=styled.div`
display:flex;
flex-direction:row;
height:100vh;
width:100%;
background:#f8f9fb;
`

function App() {

  const {state} = useAppContext();
  
  const [isLoggedIn,setLoggedIn] = useState(state.isLoggedIn);
  const handleLogIn = (value) =>{
    setLoggedIn(value);
  } 

  const handleLogout = ()=>{
    setLoggedIn(false);
    localStorage.removeItem('isLoggedIn')
  }

  return <Container>
    {!isLoggedIn && <LandingPage onLogin={handleLogIn}/>}
    {isLoggedIn  && <ContactList onLogout={handleLogout}/>}
    {isLoggedIn && <ChatComponent friendId={state.currentOpen}/>}
  
  </Container>

}

export default App;

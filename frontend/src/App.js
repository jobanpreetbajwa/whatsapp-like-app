import styled from "styled-components";
import ContactList from "./components/ContactList";
import ChatComponent from "./components/ChatComponent";
import { LandingPage } from "./components/LandingPage";
import { useAppContext } from "./store/AppContext";

const Container=styled.div`
display:flex;
flex-direction:row;
height:100vh;
width:100%;
background:#f8f9fb;
`

function App() {

  const {state} = useAppContext();
  console.log("state",state.isLoggedIn)

  return <Container>
    {!state.isLoggedIn && <LandingPage/>}
    {state.isLoggedIn  && <ContactList/>}
    {state.isLoggedIn && <ChatComponent/>}
  
  </Container>

}

export default App;

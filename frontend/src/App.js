import styled from "styled-components";
import ContactList from "./components/ContactList";
import ChatComponent from "./components/ChatComponent";

const Container=styled.div`
display:flex;
flex-direction:row;
height:100vh;
width:100%;
background:#f8f9fb;
`

function App() {
  
  return <Container>
    <ContactList/>
    <ChatComponent/>
  </Container>
  
}

export default App;

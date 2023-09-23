import React, { useState } from "react";
import "./LandingPage.css";
import TextField from "@mui/material/TextField";
import { styled } from "styled-components";
import { Button } from "@mui/material";
import axios from "axios";
import { SERVER_URL } from "../constant";

const Login = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; /* Align the text vertically in the center */
  align-items: center; /* Align the text horizontally in the center */
  height: 50%;
  width: 50%;
  background: #ece5dd;
  margin: auto;
  padding: 10px;
  text-align: center; /* Center-align the text */
`;

const ButtonContainer = styled.div`
  width: 50%; /* Make the button 50% width */
  margin-top: 20px; /* Add margin to separate the button from the text fields */
`;

export const LandingPage = (props) => {
  const [number, setNumber] = useState("+91");
  const [otp, setOtp] = useState("");
  const [buttonDisabled, setButtondisabled] = useState(false);
  const phoneNumberRegex = /^\+91\d{10}$/;

  const numberHandler = (event) => {
    const phoneNumber = event.target.value;
    setNumber(phoneNumber);
  };

  const otpHandler = (event) => {
    setOtp(event.target.value);
  };

  const handleSendOtp = async () => {
    try {
      if (buttonDisabled) {
        const response = await axios.post(`${SERVER_URL}/verifyOtp`, {
          phoneNumber: number,
          otp,
        });
        localStorage.setItem("isLoggedIn", true);
        props.onLogin(true);
      } else {
        const response = await axios.post(`${SERVER_URL}/sendOtp`, {
          phoneNumber: number,
        });
        setButtondisabled(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Login>
        <h2>Login</h2> {/* Use an <h2> element for the "Login" text */}
        <TextField
     
          disabled={buttonDisabled}
          id="outlined-basic"
          label="Phone number"
          variant="outlined"
          onChange={numberHandler}
          value={number}
        />
        {buttonDisabled && (
          <TextField
          style={{marginTop:'20px'}}
            id="outlined-basic"
            label="Otp"
            variant="outlined"
            value={otp}
            onChange={otpHandler}
          />
        )}
        <ButtonContainer>
          <Button
          style={{backgroundColor:'#19d261', color:'#FFFFFF'}}
            variant="contained"
            disabled={!phoneNumberRegex.test(number)}
            onClick={handleSendOtp}
            fullWidth /* Make the button occupy 100% width */
          >
            {buttonDisabled ? "Verify" : "Send Otp"}
          </Button>
        </ButtonContainer>
      </Login>
    </>
  );
};

export default LandingPage;

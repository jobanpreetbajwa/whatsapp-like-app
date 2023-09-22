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
  height: 50%;
  width: 50%;
  background: #add8e6;
  margin: auto;
  padding: 10px;
`;

export const LandingPage = (props) => {
  const [number, setNumber] = useState();
  const [otp, setOtp] = useState();
  const [numberDisabled, setNumberdisabled] = useState(false);
  const [buttonDisabled, setButtondisabled] = useState(false);
  const phoneNumberRegex = /^\+91\d{10}$/;
  const numberHandler = (event) => {
    const phoneNumber = event.target.value;

    setNumber(phoneNumber);
  };

  const otpHandler = (event) => {
    setOtp(event.target.value)
  };

  const handleSendOtp = async () => {
   try { if ( buttonDisabled){
        const response = await axios.post(`${SERVER_URL}/verifyOtp`,{phoneNumber:number,otp})
        localStorage.setItem('isLoggedIn',true)
        props.onLogin(true)
    }
    else {
       const response = await axios.post(`${SERVER_URL}/sendOtp`, {phoneNumber:number});
        setButtondisabled(true)
    }}catch(error){
        console.log("error",error)
    }
  };

  return (
    <>
      <Login>
        Login
        <TextField
          disabled={buttonDisabled}
          id="outlined-basic"
          label="Phone number"
          variant="outlined"
          onChange={numberHandler}
          value={number ? number : ""}
        />
        {buttonDisabled && (
          <TextField id="outlined-basic" label="Otp" variant="outlined" value={otp?otp:''} onChange={otpHandler}/>
        )}
        <Button
          variant="contained"
          disabled={!phoneNumberRegex.test(number)}
          onClick={handleSendOtp}
        >
          {buttonDisabled ? 'Verify' : 'Send Otp'}
        </Button>
      </Login>
    </>
  );
};

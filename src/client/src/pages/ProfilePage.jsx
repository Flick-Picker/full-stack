import {
    Box,
    Button,
    Typography,
  } from '@mui/material';
import React, { useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { useLocation, useRouteError } from 'react-router';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { selectEmail } from '../features/token/tokenSlice';

const ProfilePage = () => {
  //const email = useSelector(selectEmail);

  // const auth = getAuth();
  // const user = auth.currentUser;
  // let username = user.displayName ? user.displayName: "No username. Please add one!";
  // let email = "";
  const auth = getAuth();
  const user = auth.currentUser;
  let username = '';
  let email = ''

  if (user !== null) {
    email = user.email;
    username = user.displayName;
  } else {
    email = "no email";
    
    console.log("No user is currently signed in");
  }

  const navigate = useNavigate();

  const handleChangeUsernameClick = (e) => {
    e.preventDefault();
    navigate('/profile/username');
  };

  const handleChangeEmailClick = (e) => {
    e.preventDefault();
    navigate('/profile/emailchange');
  };

  const handleChangePasswordClick = (e) => {
    e.preventDefault();
    navigate('/profile/passwordchange');
  };

  return (
    <Box>
      <Header />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap="5vh"
        marginTop="5%"
        marginBottom="5%"
        minHeight="75vh">
        <Typography variant="h4" component="h4">
        Account Details
        </Typography>
        <Typography variant="h6" component="h6" align="left">
        Username: {username}
        </Typography>
        <Typography variant="h6" component="h6" align="left">
        Email: {email}
        </Typography>
        
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="5%">
        <Button
          variant="outlined"
          size="large"
          onClick={handleChangeUsernameClick}>
          Change Username
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={handleChangeEmailClick}>
          Change Email
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={handleChangePasswordClick}>
          Change Password
        </Button>
        </Box>
      </Box>
    </Box>
  )
};

export default ProfilePage;
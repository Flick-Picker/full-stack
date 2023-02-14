import {
    Box,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
  } from '@mui/material';
import React from 'react';
import axios from 'axios';
import { useLocation, useRouteError } from 'react-router';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { Check, Clear } from '@mui/icons-material';
import { selectEmail } from '../features/token/tokenSlice';

const ProfilePage = () => {
  const email = useSelector(selectEmail);

  const navigate = useNavigate();

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
        Username: 
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
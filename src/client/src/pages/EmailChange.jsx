import {
    Box,
    Button,
    FormControl,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
  } from '@mui/material';
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';
import React from 'react';
import { getAuth, updateEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation, useRouteError } from 'react-router';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import { Check, Clear } from '@mui/icons-material';
import { selectEmail, selectPassword } from '../features/token/tokenSlice';

const EmailChange = () => {
  //const oldemail = useSelector(selectEmail);
  //const userpassword = useSelector(selectPassword);

  const auth = getAuth();
  const user = auth.currentUser;

  const navigate = useNavigate();

  // Page Specific State
  const [email, setEmail] = React.useState('');
  const [emailAgain, setEmailAgain] = React.useState('');

  const handleEmailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleEmailAgainChange = (e) => {
    e.preventDefault();
    setEmailAgain(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    changeEmail();
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigate('/profile');
  };

  const changeEmail = () => {
    if(email === emailAgain) {
      updateEmail(user, email)
      .then(() => {
        // Email updated successfully
      })
      .catch((error) => {
      });
    }
    else {
      alert('The emails provided are different');
      setEmail('');
      setEmailAgain('');
    }
  }

  return (
    <Box>
      <Header />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap="2vh"
        minHeight="100vh">
        <Button onClick={handleBack}>Back</Button>
        <FormControl variant="standard" required={true}>
          <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-email"
            sx={{ width: '25ch' }}
            endAdornment={
              <InputAdornment position="end">
                <AccountCircle edge="end" />
              </InputAdornment>
            }
            onChange={(e) => handleEmailChange(e)}
            label="Email"
            value={email}
          />
        </FormControl>
        <FormControl variant="standard" required={true}>
          <InputLabel htmlFor="outlined-adornment-email-again">
            Re-Enter Email
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-email=again"
            sx={{ width: '25ch' }}
            endAdornment={
              <InputAdornment position="end">
                <AccountCircle edge="end" />
              </InputAdornment>
            }
            onChange={(e) => handleEmailAgainChange(e)}
            label="Re-Enter Email"
            value={emailAgain}
          />
        </FormControl>
        <Button
          variant="outlined"
          disabled={!email || !emailAgain}
          onClick={(e) => handleSubmit(e)}>
          Change Email
        </Button>
      </Box>
    </Box>
  );
};

export default EmailChange;
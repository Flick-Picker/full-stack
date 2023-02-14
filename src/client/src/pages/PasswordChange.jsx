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
import { getAuth, updatePassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation, useRouteError } from 'react-router';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import { Check, Clear } from '@mui/icons-material';
import { selectEmail, selectPassword } from '../features/token/tokenSlice';

const PasswordChange = () => {
  //const oldemail = useSelector(selectEmail);
  //const userpassword = useSelector(selectPassword);

  const auth = getAuth();
  const user = auth.currentUser;

  const navigate = useNavigate();

  // Page Specific State
  const [password, setPassword] = React.useState('');
  const [passAgain, setPassAgain] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handlePassAgainChange = (e) => {
    e.preventDefault();
    setPassAgain(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    changePassword();
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigate('/profile');
  };

  const changePassword = () => {
    if(setPassword === setPassAgain) {
      updatePassword(user, "newpassword")
      .then(() => {
        // Password updated successfully
      })
      .catch((error) => {
      });
    }
    else {
      alert('The emails provided are different');
      setPassword('');
      setPassAgain('');
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
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-email"
            sx={{ width: '25ch' }}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
                <InputAdornment position="end">
                <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
                </InputAdornment>
            }
            onChange={(e) => handlePasswordChange(e)}
            label="Password"
            value={password}
          />
        </FormControl>
        <FormControl variant="standard" required={true}>
          <InputLabel htmlFor="outlined-adornment-email-again">
            Re-Enter Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-email=again"
            sx={{ width: '25ch' }}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
                <InputAdornment position="end">
                <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
                </InputAdornment>
            }
            onChange={(e) => handlePassAgainChange(e)}
            label="Re-Enter Password"
            value={passAgain}
          />
        </FormControl>
        <Button
          variant="outlined"
          disabled={!password || !passAgain}
          onClick={(e) => handleSubmit(e)}>
          Change Password
        </Button>
      </Box>
    </Box>
  );
};

export default PasswordChange;
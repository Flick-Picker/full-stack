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
import { getAuth, updateProfile, updateEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation, useRouteError } from 'react-router';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import { Check, Clear } from '@mui/icons-material';
import { selectEmail, selectPassword, selectUid } from '../features/token/tokenSlice';

const UsernameChange = () => {
  const API = `${process.env.REACT_APP_BACKEND_URI || 'http://localhost:8080'}`;
  const auth = getAuth();
  const user = auth.currentUser;

  const navigate = useNavigate();
  const uid = useSelector(selectUid);
  // Page Specific State
  const [username, setUsername] = React.useState('');

  const handleUsernameChange = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    changeUsername();
    navigate('/profile');
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigate('/profile');
  };

  const changeUsername = () => {
    updateProfile(user, {
        displayName: username,
      })
        .then(() => {
          axios.post(`${API}/api/user/username`, {
            uid,
            username,
          })
        })
        .catch((error) => {
          // Handle errors
        });
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
          <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
          <OutlinedInput
            id="outlined-adornment-username"
            sx={{ width: '25ch' }}
            endAdornment={
              <InputAdornment position="end">
                <AccountCircle edge="end" />
              </InputAdornment>
            }
            onChange={(e) => handleUsernameChange(e)}
            label="Username"
            value={username}
          />
        </FormControl>
        <Button
          variant="outlined"
          onClick={(e) => handleSubmit(e)}>
          Change Username
        </Button>
      </Box>
    </Box>
  );
};

export default UsernameChange;
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import axios from 'axios';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '..';
import OAuth from '../components/OAuth';

const SignUpPage = () => {
  const signUpURI = `${
    process.env.REACT_APP_BACKEND_URI || 'http://localhost:8080'
  }/api/user`;
  const prefURI = `${
    process.env.REACT_APP_BACKEND_URI || 'http://localhost:8080'
  }/api/user/pref`;

  // Page Specific State
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passAgain, setPassAgain] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [errorAlert, setErrorAlert] = React.useState(undefined);
  // React-Router Navigation
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handlePassAgainChange = (e) => {
    e.preventDefault();
    setPassAgain(e.target.value);
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    callSignup();
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const headers = {
    'x-api-key': process.env.REACT_APP_BACKEND_KEY,
  };

  const callSignup = () => {
    if (password === passAgain) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const body = {
            uid: user.uid,
            email: user.email,
          };
          return axios.post(`${signUpURI}/new`, body, { headers });
        })
        .then((res) => {
          const user = res.data;
          const body = {
            uid: user.uid,
          };
          return axios.post(`${prefURI}/new`, body, { headers });
        })
        .then(() => {
          navigate('/login');
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              setErrorAlert(
                <Alert
                  severity="error"
                  onClose={() => setErrorAlert(undefined)}>
                  <AlertTitle>Error</AlertTitle>
                  Invalid Email
                </Alert>
              );
              break;
            case 'auth/weak-password':
              setErrorAlert(
                <Alert
                  severity="error"
                  onClose={() => setErrorAlert(undefined)}>
                  <AlertTitle>Error</AlertTitle>
                  Weak password, should be atleast 6 characters
                </Alert>
              );
              break;
            case 'auth/email-already-in-use':
              setErrorAlert(
                <Alert
                  severity="error"
                  onClose={() => setErrorAlert(undefined)}>
                  <AlertTitle>Error</AlertTitle>
                  Email has already been used
                </Alert>
              );
              break;
            default:
              setErrorAlert(
                <Alert
                  severity="error"
                  onClose={() => setErrorAlert(undefined)}>
                  <AlertTitle>Error</AlertTitle>
                  Something unexpected happened. Try again later.
                </Alert>
              );
          }
          // console.log(error);
        });
    } else {
      setErrorAlert(
        <Alert severity="error" onClose={() => setErrorAlert(undefined)}>
          <AlertTitle>Error</AlertTitle>
          Passwords are different
        </Alert>
      );
      setPassword('');
      setPassAgain('');
    }
  };

  return (
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
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          sx={{ width: '25ch' }}
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDown}
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
        <InputLabel htmlFor="outlined-adornment-pass-again">
          Re-Enter Password
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-pass=again"
          sx={{ width: '25ch' }}
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle retype password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDown}
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
        disabled={!email || !password || !passAgain}
        onClick={(e) => handleSubmit(e)}>
        Sign Up
      </Button>
      <OAuth signup={true} />
      {errorAlert !== undefined ? errorAlert : <></>}
    </Box>
  );
};

export default SignUpPage;

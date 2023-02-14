import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';
import {
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
  const [uid, setUid] = React.useState('');
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

  const handleMouseDownPassword = (e) => {
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

  const callSignup = () => {
    if (password === passAgain) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const body = {
            uid: user.uid,
            email: user.email,
          };
          return axios.post(`${signUpURI}/new`, body);
        })
        .then((res) => {
          console.log(res.data);
          const user = res.data;
          setUid(user.uid);
          // Signed in
          // dispatch(init(userCredential.user));
          // navigate('/home')

          // use this way to make a user login after sign up
          // otherwise redirect directly to logged in
          const body = {
            uid: user.uid,
          };
          return axios.post(`${prefURI}/new`, body);
        })
        .then((res) => {
          navigate('/login');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } else {
      alert('The passwords provided are different');
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
        disabled={!email || !password || !passAgain}
        onClick={(e) => handleSubmit(e)}>
        Sign Up
      </Button>
    </Box>
  );
};

export default SignUpPage;

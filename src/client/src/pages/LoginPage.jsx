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
import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import auth from '..';
import { init } from '../features/token/tokenSlice';
import OAuth from '../components/OAuth';

const LoginPage = () => {
  // Page Specific State
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [errorAlert, setErrorAlert] = React.useState(undefined);

  // Redux Global State
  const dispatch = useDispatch();

  // Cookie Management
  const [cookies, setCookie] = useCookies([
    'access_token',
    'uid',
    // 'refresh_token',
    // 'expiration_time',
  ]);

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

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    callLogin();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      callLogin();
    }
  };

  const callLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const obj = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          accessToken: userCredential.user.stsTokenManager.accessToken,
          // refreshToken: userCredential.user.stsTokenManager.refreshToken,
          // expirationTime: userCredential.user.stsTokenManager.expirationTime,
        };
        dispatch(init(obj));

        const expires = new Date();
        expires.setTime(obj.expirationTime);
        setCookie('access_token', obj.accessToken, {
          path: '/',
          expires,
        });
        setCookie('uid', obj.uid, {
          path: '/',
          expires,
        });

        navigate('/home');
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
          case 'auth/wrong-password':
            setErrorAlert(
              <Alert severity="error" onClose={() => setErrorAlert(undefined)}>
                <AlertTitle>Error</AlertTitle>
                Invalid Email or Incorrect Password
              </Alert>
            );
            break;
          default:
            setErrorAlert(
              <Alert severity="error" onClose={() => setErrorAlert(undefined)}>
                <AlertTitle>Error</AlertTitle>
                Something unexpected happened. Try again later.
              </Alert>
            );
        }
        // console.log(error);
      });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap="2vh"
      minHeight="100vh"
      onKeyDown={(e) => handleKeyDown(e)}>
      <Button href="/">Back</Button>
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
        />
      </FormControl>
      <Button
        variant="outlined"
        disabled={!email || !password}
        onClick={(e) => handleSubmit(e)}>
        Log In
      </Button>
      <OAuth signup={false} />
      {errorAlert !== undefined ? errorAlert : <></>}
    </Box>
  );
};

export default LoginPage;

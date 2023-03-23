import { FacebookOutlined, Google } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import React from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import auth from '..';
import { init } from '../features/token/tokenSlice';
import axios from 'axios';

const OAuth = ({ signup }) => {
  const signUpURI = `${
    process.env.REACT_APP_BACKEND_URI || 'http://localhost:8080'
  }/api/user`;
  const prefURI = `${
    process.env.REACT_APP_BACKEND_URI || 'http://localhost:8080'
  }/api/user/pref`;
  const headers = {
    'x-api-key': process.env.REACT_APP_BACKEND_KEY,
  };

  // Redux Global State
  const dispatch = useDispatch();

  // Cookie Management
  const [cookies, setCookie] = useCookies(['access_token', 'uid']);

  // React-Router Navigation
  const navigate = useNavigate();

  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  const handleClickLogInGoogle = (e) => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      login_hint: 'user@example.com',
    });
    signInWithPopup(auth, provider)
      .then((result) => {
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        const user = result.user;

        const obj = {
          uid: user.uid,
          email: user.email,
          accessToken: user.accessToken,
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

        if (signup) {
          const body = {
            uid: user.uid,
            email: user.email,
          };
          axios.post(`${signUpURI}/new`, body, { headers }).then((res) => {
            const user = res.data;
            const body = {
              uid: user.uid,
            };
            return axios.post(`${prefURI}/new`, body, { headers });
          });
        }
        navigate('/home');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClickLogInMeta = (e) => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;

        const obj = {
          uid: user.uid,
          email: user.email,
          accessToken: user.accessToken,
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
        console.log(error);
      });
  };

  return (
    <Box>
      <IconButton
        aria-label="google login"
        onClick={handleClickLogInGoogle}
        onMouseDown={handleMouseDown}>
        <Google />
      </IconButton>
      <IconButton
        disabled
        aria-label="meta login"
        onClick={handleClickLogInMeta}
        onMouseDown={handleMouseDown}>
        <FacebookOutlined />
      </IconButton>
    </Box>
  );
};

export default OAuth;

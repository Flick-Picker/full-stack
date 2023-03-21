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

const OAuth = () => {
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

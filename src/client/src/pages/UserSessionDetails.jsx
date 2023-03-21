import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { selectUid } from '../features/token/tokenSlice';
import { useSelector } from 'react-redux';

const UserSessionDetails = () => {
  const API = `${process.env.REACT_APP_BACKEND_URI || 'http://localhost:8080'}`;

  const [user, setUser] = useState();
  const [session, setSession] = useState();

  const uid = useSelector(selectUid);
  const { state } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const headers = {
      'x-api-key': process.env.REACT_APP_BACKEND_KEY,
    };

    axios
      .get(`${API}/api/user/get?uid=${uid}`, { headers })
      .then((res) => {
        setUser(res.data);
        state.user = res.data;
        return res.data;
      })
      .catch((e) => console.log(e));
  }, [API, uid, state]);

  const handleCreateSessionClick = (e) => {
    const headers = {
      'x-api-key': process.env.REACT_APP_BACKEND_KEY,
    };

    e.preventDefault();
    axios
      .post(
        `${API}/api/voting/new/user`,
        {
          uid,
        },
        { headers }
      )
      .then((res) => {
        setSession(res.data);
        state.session = res.data;
        return axios.get(`${API}/api/user/get?uid=${uid}`, {
          headers,
        });
      })
      .then((res) => {
        setUser(res.data);
        state.user = res.data;
      })
      .then(() => navigate('/user/vote', { state: state }))
      .catch((e) => console.log(e));
  };

  const handleCurrentSessionClick = (e) => {
    const headers = {
      'x-api-key': process.env.REACT_APP_BACKEND_KEY,
    };

    e.preventDefault();
    axios
      .get(`${API}/api/voting/get?uuid=${user.currentVotingSession}`, { headers })
      .then((res) => {
        setSession(res.data);
        state.session = res.data;
        return res.data;
      })
      .then(() => navigate('/user/vote', { state: state }))
      .catch((e) => console.log(e));
  };

  const handleEndSessionClick = (e) => {
    e.preventDefault();
  };

  const handleBestMatchClick = (e) => {
    const headers = {
      'x-api-key': process.env.REACT_APP_BACKEND_KEY,
    };

    e.preventDefault();
    axios
      .get(`${API}/api/voting/get?uuid=${user.currentVotingSession}`, { headers })
      .then((res) => {
        setSession(res.data);
        state.session = res.data;
        return res.data;
      })
      .then((res) => navigate('/user/history', { state: state }))
      .catch((e) => console.log(e));

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
        minHeight="75vh"
      >
        <Typography variant="h3" component="h3">
          Voting Session for {user ? user.username : ''}
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="5%"
        >
          <Button
            variant="outlined"
            size="large"
            onClick={handleCreateSessionClick}
          >
            Start New Session
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={handleCurrentSessionClick}
          >
            Current Session
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={handleEndSessionClick}
          >
            End Session
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={handleBestMatchClick}
          >
            View History
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UserSessionDetails;

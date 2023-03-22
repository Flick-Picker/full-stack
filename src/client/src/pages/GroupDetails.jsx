import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const headers = {
  'x-api-key': process.env.REACT_APP_BACKEND_KEY,
};
const API = `${process.env.REACT_APP_BACKEND_URI || 'http://localhost:8080'}`;

const GroupDetails = () => {

  const [group, setGroup] = useState();
  const [session, setSession] = useState();

  const { state } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {

    axios
      .get(`${API}/api/group/get?groupId=${state.groupId}`, { headers })
      .then((res) => {
        setGroup(res.data);
        state.group = res.data;
      })
      .catch((e) => console.log(e));
  }, [state]);

  const handleCreateSessionClick = (e) => {
    const headers = {
      'x-api-key': process.env.REACT_APP_BACKEND_KEY,
    };

    e.preventDefault();
    axios
      .post(
        `${API}/api/voting/new/group`,
        {
          groupId: state.groupId,
        },
        { headers }
      )
      .then((res) => {

        state.session = res.data;
        setSession(res.data);

        return axios.get(`${API}/api/group/get?groupId=${state.groupId}`, {
          headers,
        });
      })
      .then((res) => {
        setGroup(res.data);
        state.group = res.data;
      })
      .then(() => navigate('/group/vote', { state: state }))
      .catch((e) => console.log(e));
  };

  const handleCurrentSessionClick = (e) => {
    const headers = {
      'x-api-key': process.env.REACT_APP_BACKEND_KEY,
    };

    e.preventDefault();
    axios
      .get(`${API}/api/voting/get?uuid=${state.group.currentVotingSession}`, { headers })
      .then((res) => {
        setSession(res.data);
        state.session = res.data;
      })
      .then(() => navigate('/group/vote', { state: state }))
      .catch((e) => console.log(e));
  };

  const handleEndSessionClick = (e) => {
    e.preventDefault();
    //navigate('/group/vote', { state: state });
  };

  const handleBestMatchClick = (e) => {
    e.preventDefault();
    navigate('/group/match', { state: state });
  };

  const handleHistoryClick = (e) => {
    e.preventDefault();
    axios
      .get(`${API}/api/voting/get?uuid=${group.currentVotingSession}`, { headers })
      .then((res) => {
        setSession(res.data);
        state.session = res.data;
        return res.data;
      })
      .then((res) => navigate('/group/history', { state: state }))
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
          {group && group.groupName ? group.groupName : ''}
        </Typography>
        <Typography variant="h4" component="h4">
          Voting Session
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
            Start Session
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
            onClick={handleBestMatchClick}
          >
            View Best Match
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={handleHistoryClick}
          >
            View History
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default GroupDetails;

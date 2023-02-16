import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const GroupDetails = () => {
  const API = `${process.env.REACT_APP_BACKEND_URI || 'http://localhost:8080'}`;

  const [group, setGroup] = React.useState();
  const [session, setSession] = React.useState();

  const { state } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/api/group/get?groupId=${state.groupId}`)
      .then((res) => {
        setGroup(res.data);
        state.group = res.data;
      })
      .catch((e) => console.log(e));
  }, [API, state]);

  const handleCreateSessionClick = (e) => {
    e.preventDefault();
    axios
      .post(`${API}/api/voting/new/group`, {
        groupId: state.groupId,
      })
      .then((res) => {
        console.log(res);
        state.session = res.data;
        setSession(res.data)
      })
      .then(() => navigate('/group/vote',  { state: state }))
      .catch((e) => console.log(e));
  };

  const handleCurrentSessionClick = (e) => {
    e.preventDefault();
    axios.get(`${API}/api/voting/get?uuid=${state.group.currentVotingSession}`)
    .then((res) => {
      console.log(res.data);
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

  return (
    <Box>
      <Header />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap="5vh"
        minHeight="75vh">
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
          gap="5%">
          <Button
            variant="outlined"
            size="large"
            onClick={handleCreateSessionClick}>
            Start Session
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={handleCurrentSessionClick}>
            Current Session
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={handleEndSessionClick}>
            End Session
          </Button>
          <Button variant="outlined" size="large" onClick={handleBestMatchClick}>
            View Best Match
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default GroupDetails;

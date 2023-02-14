import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { selectUid } from '../features/token/tokenSlice';

const GroupDetails = () => {
  const homePageURI = `${
    process.env.REACT_APP_BACKEND_URI || 'http://localhost:8080'
  }/api`;

  const [group, setGroup] = useState();
  const uid = useSelector(selectUid);
  const { state } = useLocation();

  // React-Router Navigation
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${homePageURI}/group/get?groupId=${state.groupId}`)
      .then((res) => setGroup(res.data)) // Change this to groupsJoined when fixed
      .catch((e) => console.log(e));
  }, [homePageURI, state]);

  const handleCreateSessionClick = (e) => {
    e.preventDefault();
    axios
      .post(`${homePageURI}/voting/new/group`, {
        groupId: state.groupId,
      })
      .then((res) => {
        navigate('/group/vote');
      }) 
      .catch((e) => console.log(e));
  };

  const handleCurrentSessionClick = (e) => {
    e.preventDefault();
    navigate('/group/create');
  };

  const handleEndSessionClick = (groupId) => {
    navigate('/group/vote', { state: { groupId } });
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
          {group && group.groupName ? group.groupName: ''}
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
            onClick={handleEndSessionClick}
          >
            End Session
          </Button>
          <Button variant="outlined" size="large">
            View Best Match
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default GroupDetails;

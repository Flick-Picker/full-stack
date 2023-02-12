import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { selectUid } from '../features/token/tokenSlice';

const HomePage = () => {
  const homePageURI = `${
    process.env.REACT_APP_FRONTEND_URI || 'http://localhost:8080'
  }/api`;

  const [userGroups, setUserGroups] = useState();
  const uid = useSelector(selectUid);

  // React-Router Navigation
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${homePageURI}/user/get?uid=${uid}`)
      .then((res) => setUserGroups(res.data.groupsOwned)) // Change this to groupsJoined when fixed
      .catch((e) => console.log(e));
  }, [homePageURI, uid]);

  const handleJoinGroupClick = (e) => {
    e.preventDefault();
    navigate('/group/join');
  };

  const handleCreateGroupClick = (e) => {
    e.preventDefault();
    navigate('/group/create');
  };

  const handleGoToGroupClick = (groupId) => {
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
        minHeight="75vh">
        {/* TODO: Every button needs a handler */}
        <Typography variant="h3" component="h3">
          Who's joining you?
        </Typography>
        <Button variant="outlined" size="large">
          Just me
        </Button>
        <Box>
          {userGroups ? (
            userGroups.map((groupId, i) => {
              return (
                <Button
                  key={i}
                  variant="outlined"
                  onClick={() => handleGoToGroupClick(groupId)}>
                  {groupId}
                </Button>
              );
            })
          ) : (
            <Typography variant="h6" component="h6">
              You currently have no groups. Create or join a group to get
              started.
            </Typography>
          )}
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="5%">
          <Button
            variant="outlined"
            size="large"
            onClick={handleCreateGroupClick}>
            Create Group
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={handleJoinGroupClick}>
            Join Group
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;

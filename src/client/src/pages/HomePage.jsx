import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const HomePage = () => {

  // React-Router Navigation
  const navigate = useNavigate();

  const handleJoinGroupClick = (e) => {
    e.preventDefault();
    navigate('/group/join');
  };

  const handleCreateGroupClick = (e) => {
    e.preventDefault();
    navigate('/group/create');
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
        <Typography variant="h6" component="h6">
          You currently have no groups. Create or join a group to get started.
        </Typography>
        {/* TODO: This above typography needs to check if there are existing groups */}
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

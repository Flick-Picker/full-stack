import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { selectUid } from '../features/token/tokenSlice';

const HomePage = () => {
  const API = `${process.env.REACT_APP_BACKEND_URI || 'http://localhost:8080'}`;

  const [userGroups, setUserGroups] = React.useState();

  const navigate = useNavigate();
  const uid = useSelector(selectUid);

  useEffect(() => {
    const headers = {
      'x-api-key': process.env.REACT_APP_BACKEND_KEY,
    };
    axios
      .get(`${API}/api/user/collectgroups?uid=${uid}`, { headers: headers })
      .then((res) => {
        setUserGroups(res.data);
      })
      .catch((e) => console.log(e));
  }, [API, uid]);

  const handleJoinGroupClick = (e) => {
    e.preventDefault();
    navigate('/group/join');
  };

  const handleCreateGroupClick = (e) => {
    e.preventDefault();
    navigate('/group/create');
  };

  const handleJustMeClick = () => {
    navigate('/user/session', { state: { } });
  };

  const handleGoToGroupClick = (groupId) => {
    navigate('/group', { state: { groupId } });
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
        {/* TODO: Every button needs a handler */}
        <Typography variant="h3" component="h3">
          Who's joining you?
        </Typography>
        <Button variant="outlined" size="large" onClick={() => handleJustMeClick()}>
          Just me
        </Button>
        <Box>
          {userGroups && userGroups.length !== 0 ? (
            userGroups.map((group, i) => {
              return (
                <Button
                  key={i}
                  variant="outlined"
                  onClick={() => handleGoToGroupClick(group.groupId)}
                >
                  {group.groupName}
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
          gap="5%"
        >
          <Button
            variant="outlined"
            size="large"
            onClick={handleCreateGroupClick}
          >
            Create Group
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={handleJoinGroupClick}
          >
            Join Group
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;

import { Check, Clear } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  OutlinedInput,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FriendsList from '../components/FriendsList';
import GroupsList from '../components/GroupsList';
import Header from '../components/Header';
import { selectUid } from '../features/token/tokenSlice';

const Social = () => {
  const [friendId, setFriendId] = React.useState('');
  const [friendIdForGroup, setFriendIdForGroup] = React.useState('');
  const [groupId, setgroupId] = React.useState('');
  const uid = useSelector(selectUid);

  const homePageURI = `${
    process.env.REACT_APP_BACKEND_URI || 'http://localhost:8080'
  }/api`;

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

  const handleEmailChange = (e) => {
    e.preventDefault();
    setFriendId(e.target.value);
  };

  const sendFriendRequest = () => {
    axios
      .post(`${homePageURI}/invites/friends/send`, {
        senderUid: uid,
        requestUid: friendId,
      })
      // .then((res) => {})
      .catch((e) => console.log(e));
  };

  const sendGroupRequest = () => {
    axios
      .post(`${homePageURI}/invites/group/send`, {
        senderUid: uid,
        requestUid: friendIdForGroup,
        groupId: groupId,
      })
      // .then((res) => {})
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
        minHeight="75vh">
        <Typography variant="h4" component="h4">
          Social
        </Typography>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          sx={{ p: 2 }}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="row"
            gap="0%">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column">
              <Typography variant="h6" component="h6">
                Groups
              </Typography>

              <Box
                display="flex"
                gap="1vh"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                padding="20px"
                border="solid"
                borderRadius="10px">
                <GroupsList />
              </Box>
            </Box>

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column">
              <Typography variant="h6" component="h6">
                Friends
              </Typography>

              <Box
                display="flex"
                gap="1vh"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                padding="20px"
                border="solid"
                borderRadius="10px">
                <FriendsList />
              </Box>
            </Box>

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column">
              <Typography variant="h6" component="h6">
                Friend Requests
              </Typography>

              <List
                sx={{
                  width: '100%',
                  maxWidth: 200,
                  bgcolor: 'background.paper',
                  border: 'solid',
                  borderRadius: '10px',
                }}>
                {[0, 1, 2, 3].map((value) => {
                  const labelId = `invite-list-label-${value}`;

                  return (
                    <ListItem key={value} role={undefined} dense>
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="accept">
                          <Check />
                        </IconButton>
                        <IconButton edge="end" aria-label="decline">
                          <Clear />
                        </IconButton>
                      </ListItemSecondaryAction>
                      <ListItemText
                        id={labelId}
                        primary={`Invite ${value + 1}`}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          </Box>

          <Button variant="outlined" size="large" onClick={sendGroupRequest}>
            Invite to Group
          </Button>
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="row"
          gap="0%">
          <FormControl variant="standard">
            <InputLabel htmlFor="outlined-adornment-group-name">
              Enter Username or Email...
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-group-name"
              sx={{ width: '25ch' }}
              onChange={(e) => handleEmailChange(e)}
              label="Email"
              value={friendId}
            />
          </FormControl>

          <Button variant="outlined" size="large" onClick={sendFriendRequest}>
            Send Friend Request
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Social;

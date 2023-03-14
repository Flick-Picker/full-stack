import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FriendsList from '../components/FriendsList';
import Header from '../components/Header';
import { selectUid } from '../features/token/tokenSlice';

const CreateGroup = () => {
  const API = `${process.env.REACT_APP_BACKEND_URI || 'http://localhost:8080'}`;

  const [groupName, setGroupName] = React.useState('');
  const uid = useSelector(selectUid);

  const navigate = useNavigate();

  const headers = {
    'x-api-key': process.env.REACT_APP_BACKEND_KEY,
  };

  const handleGroupNameChange = (e) => {
    e.preventDefault();
    setGroupName(e.target.value);
  };

  const handleCreateGroup = (e) => {
    e.preventDefault();
    // Send invites to friends here too
    if (uid) {
      const body = {
        ownerUid: uid,
        groupName,
      };
      axios
        .post(`${API}/api/group/new`, body, { headers })
        .then(() => navigate('/home'))
        .catch((e) => console.log(e));
    } else {
      console.log("uid isn't available in CreateGroup");
    }
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
        marginTop="5%"
        marginBottom="5%"
        minHeight="75vh">
        <Typography variant="h4" component="h4">
          Create Group
        </Typography>
        <FormControl variant="standard" required={true}>
          <InputLabel htmlFor="outlined-adornment-group-name">
            Group Name
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-group-name"
            sx={{ width: '25ch' }}
            onChange={(e) => handleGroupNameChange(e)}
            label="Email"
          />
        </FormControl>
        <Box
          display="flex"
          gap="1vh"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          padding="20px"
          border="solid"
          borderRadius="10px">
          <Typography
            variant="h6"
            component="h6"
            sx={{ textDecoration: 'underline' }}>
            Invite Friends
          </Typography>
          <FriendsList />
        </Box>
        <Button variant="outlined" onClick={handleCreateGroup}>
          Create Group
        </Button>
      </Box>
    </Box>
  );
};

export default CreateGroup;

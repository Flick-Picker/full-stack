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
  const createGroupURI = `${
    process.env.REACT_APP_FRONTEND_URI || 'http://localhost:8080'
  }/api/group`;

  const [groupName, setGroupName] = React.useState('');
  const uid = useSelector(selectUid);

  const navigate = useNavigate();

  const handleGroupNameChange = (e) => {
    e.preventDefault();
    setGroupName(e.target.value);
  };

  const handleCreateGroup = (e) => {
    e.preventDefault();
    // Send invites to friends here too
    const body = {
      ownerUid: uid,
      groupName,
    };
    axios
      .post(`${createGroupURI}/new`, body)
      .then(() => navigate('/home'))
      .catch((e) => console.log(e));
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate('/home');
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
        <Button variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default CreateGroup;

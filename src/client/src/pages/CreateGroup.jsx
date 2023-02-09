import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';
import React from 'react';
import Header from '../components/Header';
import FriendsList from '../components/FriendsList';
import { useNavigate } from 'react-router-dom';

const CreateGroup = () => {
  const [groupName, setGroupName] = React.useState('');

  const navigate = useNavigate();

  const handleGroupNameChange = (e) => {
    e.preventDefault();
    setGroupName(e.target.value);
  };

  const handleCreateGroup = (e) => {
    e.preventDefault();
    console.log(groupName);
    // Call create group API here from backend and send invites to friends
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

import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  InputLabel,
  OutlinedInput,
  FormControl,
} from "@mui/material";
import React from "react";
import Header from "../components/Header";
import FriendsList from "../components/FriendsList";
import GroupsList from "../components/GroupsList";
import { Check, Clear } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Social = () => {
  // React-Router Navigation
  const navigate = useNavigate();

  const handleJoinGroupClick = (e) => {
    e.preventDefault();
    navigate("/group/join");
  };

  const handleCreateGroupClick = (e) => {
    e.preventDefault();
    navigate("/group/create");
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
        <Typography variant="h4" component="h4">
          Social
        </Typography>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="row"
          gap="0%"
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
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
              borderRadius="10px"
            >
              <FriendsList />
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
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
              borderRadius="10px"
            >
              <GroupsList />
            </Box>
          </Box>
        </Box>

        <Button variant="outlined" size="large">
          Invite
        </Button>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="row"
          gap="0%"
        >
          <FormControl variant="standard">
            <InputLabel htmlFor="outlined-adornment-group-name">
              Enter user
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-group-name"
              sx={{ width: "25ch" }}
              label="Email"
            />
          </FormControl>

          <Typography variant="h6" component="h6">
            Send Friend Request
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Social;

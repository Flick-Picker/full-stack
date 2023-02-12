import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';

const VotingPage = () => {
  const { state } = useLocation();

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
        <Typography variant="h6" component="h6">
          Recommended Flicks For: {state.groupId}
        </Typography>
        <Box>
          <Typography>Image Here</Typography>
          <Typography>Description</Typography>
          <Typography>User Review Score</Typography>
          <Typography>Audience Rating</Typography>
          <Typography>Run Time</Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Seen it before" />
            <Button variant="outlined">Submit</Button>
          </FormGroup>
        </Box>
      </Box>
    </Box>
  );
};

export default VotingPage;

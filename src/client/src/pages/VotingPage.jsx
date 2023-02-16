import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';

const VotingPage = () => {
  const API = `${process.env.REACT_APP_BACKEND_URI || 'http://localhost:8080'}`;
  const { state } = useLocation();

  const [currIndex, setIndex] = React.useState();
  const [currFlick, setFlick] = React.useState();

  console.log(state);

  const navigate = useNavigate();

  const handleRatingClick = (e) => {
    e.preventDefault();
    axios
      .get(`${API}/api/voting/get?uuid=${state.group.currentVotingSession}`)
      .then((res) => {
        console.log(res.data);
      })
      .then(() => navigate('/group/vote', { state: state }))
      .catch((e) => console.log(e));
  };

  const handleLeaveClick = (e) => {
    e.preventDefault();
    navigate('/group', { state: state });
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
        <Typography variant="h6" component="h6">
          Recommended Flicks For: {state.group.groupName}
        </Typography>
        <Box>
          <Typography variant="h6" component="h6">
            Movie Name: 
          </Typography>
          <Typography>Image Here</Typography>
          <Typography>Description</Typography>
          <Typography>User Review Score</Typography>
          <Typography>Audience Rating</Typography>
          <Typography>Run Time</Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Seen it before" />
          </FormGroup>
          <Button variant="outlined" onClick={handleRatingClick}>
            Like
          </Button>
          <Button variant="outlined" onClick={handleRatingClick}>
            Neutral
          </Button>
          <Button variant="outlined" onClick={handleRatingClick}>
            Dislike
          </Button>
        </Box>
        <Button variant="outlined" onClick={handleLeaveClick}>Leave Session</Button>
      </Box>
    </Box>
  );
};

export default VotingPage;

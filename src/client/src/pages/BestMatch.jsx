import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUid } from '../features/token/tokenSlice';

const headers = {
  'x-api-key': process.env.REACT_APP_BACKEND_KEY,
};
const API = `${process.env.REACT_APP_BACKEND_URI || 'http://localhost:8080'}`;

const BestMatch = () => {
  
  const { state } = useLocation();
  const uid = useSelector(selectUid);
  const [flick, setFlick] = React.useState({});

  useEffect(() => {
    axios
      .get(`${API}/api/voting/match?uuid=${state.group.currentVotingSession}`, {
        headers,
      })
      .then((res) => {
        setFlick(res.data);
      })
      .catch((e) => console.log(e));
  }, [state]);

  const navigate = useNavigate();

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
          Top Flick for {state.group.groupName}:
        </Typography>
        <Box>
          <Box
            component="img"
            sx={{
              height: 500,
              //width: 350,
              maxHeight: { xs: 300, md: 400 },
              //maxWidth: { xs: 350, md: 250 },
            }}
            alt={state.group.groupName}
            src={flick.imageURL}
          />
          <Typography variant="h6" component="h6">
            {flick.name}
          </Typography>
        </Box>
        <Button variant="outlined" onClick={handleLeaveClick}>
          Exit
        </Button>
      </Box>
    </Box>
  );
};

export default BestMatch;

import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { selectUid } from '../features/token/tokenSlice';

const GroupDetails = () => {
  const API = `${process.env.REACT_APP_BACKEND_URI || 'http://localhost:8080'}`;

  const [group, setGroup] = React.useState();
  const [open, setOpen] = React.useState();
  
  const uid = useSelector(selectUid);

  const { state } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const headers = {
      'x-api-key': process.env.REACT_APP_BACKEND_KEY,
    };

    axios
      .get(`${API}/api/group/get?groupId=${state.groupId}`, { headers })
      .then((res) => {
        setGroup(res.data);
        state.group = res.data;
      })
      .catch((e) => console.log(e));
  }, [API, state]);

  const handleClose = () => {
    setOpen(false);
  }

  const createSessionAccept = (e) => {
    handleClose();
    const headers = {
      'x-api-key': process.env.REACT_APP_BACKEND_KEY,
    };

    e.preventDefault();
    axios
      .post(
        `${API}/api/voting/new/group`,
        {
          groupId: state.groupId,
        },
        { headers }
      )
      .then((res) => {
        state.session = res.data;

        return axios.get(`${API}/api/group/get?groupId=${state.groupId}`, {
          headers,
        });
      })
      .then((res) => {
        setGroup(res.data);
        state.group = res.data;
      })
      .then(() => navigate('/group/vote', { state: state }))
      .catch((e) => console.log(e));
  };

  const handleCurrentSessionClick = (e) => {
    const headers = {
      'x-api-key': process.env.REACT_APP_BACKEND_KEY,
    };

    e.preventDefault();
    axios
      .get(`${API}/api/voting/get?uuid=${state.group.currentVotingSession}`, { headers })
      .then((res) => {
        state.session = res.data;
      })
      .then(() => navigate('/group/vote', { state: state }))
      .catch((e) => console.log(e));
  };

  const handleBestMatchClick = (e) => {
    e.preventDefault();
    navigate('/group/match', { state: state });
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
        <Typography variant="h3" component="h3">
          {group && group.groupName ? group.groupName : ''}
        </Typography>
        <Typography variant="h4" component="h4">
          Voting Session
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="5%"
        >
          <Button
            disabled={state.group !== undefined ? uid !== state.group.ownerUid : false}
            variant="outlined"
            size="large"
            onClick={() => setOpen(true)}
          >
            Start Session
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={handleCurrentSessionClick}
          >
            Current Session
          </Button>
          {/* <Button
            disabled={state.group !== undefined ? uid !== state.group.ownerUid : false}
            variant="outlined"
            size="large"
            onClick={handleEndSessionClick}
          >
            End Session
          </Button> */}
          <Button
            variant="outlined"
            size="large"
            onClick={handleBestMatchClick}
          >
            View Best Match
          </Button>
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-create-session">
          <DialogTitle>{"Overwrite session if it exists?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>Creating a session will delete the existing one, if one already exists. This will restart the votes and allow for new user preferences to be checked.</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={createSessionAccept} autoFocus>Yes</Button>
          </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GroupDetails;

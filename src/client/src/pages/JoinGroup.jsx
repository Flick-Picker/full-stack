import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  Snackbar,
  Alert
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Check, Clear } from '@mui/icons-material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUid } from '../features/token/tokenSlice';

const headers = {
  'x-api-key': process.env.REACT_APP_BACKEND_KEY,
};
const API = `${process.env.REACT_APP_BACKEND_URI || 'http://localhost:8080'}`;

const JoinGroup = () => {
  const [groupInvites, setGroupInvites] = useState();
  const [alert, setAlert] = useState(false); // error, warning, info, success

  const uid = useSelector(selectUid);

  useEffect(() => {
    axios
      .get(`${API}/api/invites/group/getforuser?uid=${uid}`, { headers })
      .then((res) => setGroupInvites(res.data))
      .catch((e) => console.log(e));
  }, [uid]);

  const handleAcceptGroup = (inv, i) => {
    const body = {
      inviteId: inv.inviteId,
      groupId: inv.groupId,
      senderUid: inv.senderUser,
      requestUid: inv.requestedUser,
    };

    axios
      .post(`${API}/api/invites/groups/accept`, body, { headers })
      .then(() => {
        const newArray = groupInvites.splice(i, 1);
        setGroupInvites(newArray);
      })
      .catch((e) => console.log(e));
      setAlert(true);
      groupInvites.splice(i, 1);
      setGroupInvites(groupInvites);
  };

  const handleDeclineGroup = (inv, i) => {
    groupInvites.splice(i, 1);
    setGroupInvites(groupInvites);
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
        minHeight="75vh"
      >
        <Typography variant="h4" component="h4">
          Join Group
        </Typography>
        {groupInvites && groupInvites.length !== 0 ? (
          <List
            sx={{
              width: '100%',
              maxWidth: 200,
              bgcolor: 'background.paper',
              border: 'solid',
              borderRadius: '10px',
            }}
          >
            {groupInvites.map((groupInvite, i) => {
              return (
                <ListItem key={i} dense>
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="accept"
                      onClick={() => handleAcceptGroup(groupInvite, i)}
                    >
                      <Check />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="decline"
                      onClick={() => handleDeclineGroup(groupInvite, i)}
                    >
                      <Clear />
                    </IconButton>
                  </ListItemSecondaryAction>
                  <ListItemText
                    id={`group-invite-${i}`}
                    primary={groupInvite.groupName}
                  />
                </ListItem>
              );
            })}
          </List>
        ) : (
          <Typography>You have no invites!</Typography>
        )}
      </Box>
      <Snackbar
        open={alert}
        autoHideDuration={6000}
        onClose={() => setAlert(false)}>
        <Alert>Accepted Group Invite</Alert>
      </Snackbar>
    </Box>
  );
};

export default JoinGroup;

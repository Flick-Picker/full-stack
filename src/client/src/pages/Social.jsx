import { Check, Clear } from '@mui/icons-material';
import {
  Alert,
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
  Snackbar,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FriendsList from '../components/FriendsList';
import GroupsList from '../components/GroupsList';
import Header from '../components/Header';
import { selectEmail, selectUid } from '../features/token/tokenSlice';

const headers = {
  'x-api-key': process.env.REACT_APP_BACKEND_KEY,
};
const API = `${process.env.REACT_APP_BACKEND_URI || 'http://localhost:8080'}`;

const Social = () => {

  const [selectedGroup, setSelectedGroup] = React.useState('');
  const [friendField, setFriendField] = React.useState('');
  const [friendInvites, setFriendInvites] = React.useState();
  const [friendIdsForGroup, setFriendIdsForGroup] = React.useState([]);
  const [alert, setAlert] = React.useState(undefined); // error, warning, info, success
  const [alertText, setAlertText] = React.useState('');

  const uid = useSelector(selectUid);
  const email = useSelector(selectEmail);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/api/invites/friends/getforuser?uid=${uid}`, { headers })
      .then((res) => setFriendInvites(res.data))
      .catch((e) => console.log(e));
  }, [uid]);

  const handleFriendInputChange = (e) => {
    e.preventDefault();
    setFriendField(e.target.value);
  };

  const handleAcceptFriend = (inv, i) => {
    const body = {
      inviteId: inv.inviteId,
      senderUid: inv.senderUser,
      requestUid: inv.requestedUser,
    };
    axios
      .post(`${API}/api/invites/friends/accept`, body, { headers })
      .then(() => {
        const newArray = friendInvites.splice(i, 1);
        setFriendInvites(newArray);
      })
      .catch((e) => console.log(e));
  };

  const handleDeclineFriend = (inv) => {};

  const sendFriendRequest = () => {
    axios
      .get(`${API}/api/user/query?identifier=${friendField}`, { headers })
      .then((res) => {
        const requestUser = res.data;
        return axios
          .post(`${API}/api/invites/friends/send`, {
            senderUid: uid,
            senderEmail: email,
            requestUid: requestUser.uid,
          })
          .then(() => {
            setAlert('success');
            setAlertText('Friend request sent');
          });
      })
      .then(() => setFriendField(''))
      .catch((e) => {
        setAlert('error');
        setAlertText('Friend request could not be sent');
      });
  };

  const sendGroupRequest = () => {
    if (!selectedGroup) {
      setAlert('error');
      setAlertText('Need to select a group');
      return;
    }
    if (!friendIdsForGroup && friendIdsForGroup.length === 0) {
      setAlert('error');
      setAlertText('Need to select atleast one friend');
      return;
    }
    
    friendIdsForGroup.forEach((friendToInvite) => {
      axios
        .post(
          `${API}/api/invites/groups/send`,
          {
            senderUid: uid,
            requestUid: friendToInvite.uid,
            groupId: selectedGroup.groupId,
            groupName: selectedGroup.groupName,
          },
          { headers }
        )
        .catch((e) => {
          console.log(e);
          setAlert('error');
          setAlertText('Friends could not be invited');
        });
    });
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
        minHeight="75vh">
        <Typography variant="h4" component="h4">
          Social
        </Typography>
        <GroupsList
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
        />
        <Box display="flex" alignItems="flex-start" flexDirection="row">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column">
            <Typography variant="h5" component="h5">
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
              <FriendsList setFriendIdsForGroup={setFriendIdsForGroup} />
            </Box>
          </Box>

          {friendInvites && friendInvites.length !== 0 ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column">
              <Typography variant="h5" component="h5">
                Friend Requests
              </Typography>
              <List
                sx={{
                  width: '225px',
                  border: 'solid',
                  borderRadius: '10px',
                }}>
                {friendInvites.map((friendInvite, i) => {
                  return (
                    <ListItem key={i} dense>
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="accept"
                          onClick={() => {
                            handleAcceptFriend(friendInvite, i);
                          }}>
                          <Check />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="decline"
                          onClick={() => {
                            handleDeclineFriend(friendInvite, i);
                          }}>
                          <Clear />
                        </IconButton>
                      </ListItemSecondaryAction>
                      <ListItemText
                        id={`friend-invite-${i}`}
                        primary={friendInvite.senderEmail}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          ) : (
            <></>
          )}
        </Box>
        <Button
          variant="outlined"
          size="large"
          onClick={sendGroupRequest}
          // disabled={!selectedGroup && !(friendIdsForGroup && friendIdsForGroup.length === 0)}
        >
          Invite to Group
        </Button>

        <Box display="flex">
          <FormControl variant="standard">
            <InputLabel id="send-friend-request-input-label">
              Enter Username or Email...
            </InputLabel>
            <OutlinedInput
              labelId="send-friend-request-input-label"
              id="end-friend-request-input"
              sx={{ width: '25ch' }}
              onChange={(e) => handleFriendInputChange(e)}
              value={friendField}
            />
          </FormControl>
          <Button variant="outlined" size="large" onClick={sendFriendRequest}>
            Send
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={alert !== undefined}
        autoHideDuration={6000}
        onClose={() => setAlert(undefined)}>
        <Alert severity={alert}>{alertText}</Alert>
      </Snackbar>
    </Box>
  );
};

export default Social;

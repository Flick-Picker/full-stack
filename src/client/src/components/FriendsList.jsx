import {
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUid } from '../features/token/tokenSlice';

const API = `${process.env.REACT_APP_BACKEND_URI || 'http://localhost:8080'}`;

const headers = {
  'x-api-key': process.env.REACT_APP_BACKEND_KEY,
};   

const FriendsList = ({ setFriendIdsForGroup }) => {
  const [checked, setChecked] = React.useState([]);
  const [friendsList, setFriendsList] = React.useState([]);

  const uid = useSelector(selectUid);

  useEffect(() => {
    if (uid) { 
      axios
        .get(`${API}/api/user/collectfriends?uid=${uid}`, { headers })
        .then((res) => {
          setFriendsList(res.data);
        })
        .catch((e) => console.log(e));
    } else {
      console.log("uid isn't available in FriendsList");
    }
  }, [uid]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    setFriendIdsForGroup(newChecked);
  };

  return (
    <List
      disablePadding
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {friendsList.length !== 0 ? (
        friendsList.map((friend, i) => {
          const labelId = `friend-checkbox-label-${i}`;

          return (
            <ListItem key={i}>
              <ListItemButton onClick={handleToggle(friend)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(friend) !== -1}
                    tabIndex={-1}
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={friend.email} />
              </ListItemButton>
            </ListItem>
          );
        })
      ) : (
        <Typography>Add Some Friends</Typography>
      )}
    </List>
  );
};

export default FriendsList;

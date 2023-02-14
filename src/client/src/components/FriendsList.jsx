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

const FriendsList = () => {
  const API = `${process.env.REACT_APP_BACKEND_URI || 'http://localhost:8080'}`;

  const [friendsList, setFriendsList] = React.useState([]);
  const [checked, setChecked] = React.useState([]);

  const uid = useSelector(selectUid);

  useEffect(() => {
    if (uid) {
      axios
        .get(`${API}/api/user/get?uid=${uid}`)
        .then((res) => {
          setFriendsList(res.data.friends);
        })
        .catch((e) => console.log(e));
    } else {
      console.log("uid isn't available in GroupsList");
    }
  });

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List
      disablePadding
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {friendsList.length !== 0 ? (
        friendsList.map((value) => {
          const labelId = `checkbox-list-label-${value}`;
          
          return (
            <ListItem key={value}>
              <ListItemButton role={undefined} onClick={handleToggle(value)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`Friend ${value + 1}`} />
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

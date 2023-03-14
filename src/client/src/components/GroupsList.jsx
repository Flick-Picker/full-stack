import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUid } from '../features/token/tokenSlice';

const GroupsList = ({ setSelectedGroup }) => {
  const API = `${process.env.REACT_APP_BACKEND_URI || 'http://localhost:8080'}`;

  const [userGroups, setUserGroups] = React.useState();

  const uid = useSelector(selectUid);

  useEffect(() => {
    const headers = {
      'x-api-key': process.env.REACT_APP_BACKEND_KEY,
    };   
    axios
      .get(`${API}/api/user/collectgroups?uid=${uid}`, { headers })
      .then((res) => {
        setUserGroups(res.data);
      })
      .catch((e) => console.log(e));
  }, [API, uid]);

  const handleChange = (e) => {
    setSelectedGroup(userGroups[e.target.value]);
  };

  return userGroups ? (
    <FormControl>
      <InputLabel id='group-select-label'>Group</InputLabel>
      <Select
        labelId='group-select-label'
        id="group-select"
        defaultValue={''}
        onChange={handleChange}
        sx={{width: '175px'}}
        label="Group">
          <MenuItem value=''><em>None Selected</em></MenuItem>
          {userGroups.map((group, i) => {
            return (
              <MenuItem value={i}>{group.groupName}</MenuItem>
            )
          })}
      </Select>
    </FormControl>
  ) : (
    <Typography variant="h6" component="h6">
      You currently have no groups. Create or join a group to get started.
    </Typography>
  );
};

export default GroupsList;

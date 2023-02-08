import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@mui/material';
import React from 'react';
import Header from '../components/Header';
import { Check, Clear } from '@mui/icons-material';

const JoinGroup = () => {
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
        minHeight="75vh">
        <Typography variant="h4" component="h4">
          Join Group
        </Typography>
        <List
          sx={{
            width: '100%',
            maxWidth: 200,
            bgcolor: 'background.paper',
            border: 'solid',
            borderRadius: '10px',
          }}>
          {[0, 1, 2, 3].map((value) => {
            const labelId = `invite-list-label-${value}`;

            return (
              <ListItem key={value} role={undefined} dense>
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="accept">
                    <Check />
                  </IconButton>
                  <IconButton edge="end" aria-label="decline">
                    <Clear />
                  </IconButton>
                </ListItemSecondaryAction>
                <ListItemText id={labelId} primary={`Invite ${value + 1}`} />
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );
};

export default JoinGroup;

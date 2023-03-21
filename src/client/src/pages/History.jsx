import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Header from '../components/Header';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUid } from '../features/token/tokenSlice';

const History = () => {
  const API = `${process.env.REACT_APP_BACKEND_URI || 'http://localhost:8080'}`;
  const { state } = useLocation();


  const [ session, setSession ] = useState({});
  const [ flick, setFlick ] = useState(state.session.recommendations[0]);

  const uid = useSelector(selectUid);

  useEffect(() => {
    setSession(state.session);
  });

  const navigate = useNavigate();

  const handleLeaveClick = (e) => {
    e.preventDefault();
    navigate('/user/session', { state: state });
  };

  const handleRowClick = (e, row) => {
    e.stopPropagation();
    setFlick(row);
    console.log(flick);
  };

  const columns = [
    { field: 'name', headerName: 'Flick Name', width: 350 },
    {
      field: 'algorithmRating',
      headerName: 'Personalized Rating',
      width: 150,
      valueFormatter: ({ value }) => value.toFixed(2),
    },
    {
      field: 'voteRating',
      headerName: 'Your Vote',
      width: 150,
      valueGetter: (params) => {
        if (params.value === 1) {
          return 'Liked'
        } else if (params.value === 0) {
          return 'Neutral'
        }
        else {
          return 'Disliked'
        };
      },
    },
  ];

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
          Your Flick History:
        </Typography>

        <Box
          component="img"
          sx={{
            height: 500,
            //width: 350,
            maxHeight: { xs: 300, md: 400 },
            //maxWidth: { xs: 350, md: 250 },
          }}
          alt='Image Flick'
          src={flick.imageURL}
        />

        <Box sx={{ height: 400, width: '80%' }}>
          <DataGrid
            rows={state.session.recommendations}
            columns={columns}
            getRowId={(row) => row.name }
            pageSize={5}
            onRowClick={(params, e) => handleRowClick(e, params.row)}
          />
        </Box>

        <Button variant="outlined" onClick={handleLeaveClick}>
          Exit
        </Button>
      </Box>
    </Box>
  );
};

export default History;

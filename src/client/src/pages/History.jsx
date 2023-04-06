import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Header from '../components/Header';

function findBestMatch(recommendations) {
  const recs = recommendations;
  let bestMatch = recs[0];
  recs.forEach((rec) => {
    if (rec.voteRating > bestMatch.voteRating) {
      bestMatch = rec;
    }
  });
  return bestMatch;
}

const History = () => {
  const { state, pathname } = useLocation();
  const [session, setSession] = useState({});
  const [flick, setFlick] = useState(state.session.recommendations[0]);

  const isForGroup = pathname === '/group/history';
  const navigate = useNavigate();

  useEffect(() => {
    setSession(state.session);
    const bestMatch = findBestMatch(state.session.recommendations); 
    setFlick(bestMatch); // set selected flick to be the Best Match by default
  }, [state.session]);

  const handleLeaveClick = (e) => {
    e.preventDefault();
    if (isForGroup) {
      navigate('/group', { state: state });
    } else {
      navigate('/user/session', { state: state });
    }
  };

  const handleRowClick = (e, row) => {
    e.stopPropagation();
    setFlick(row);
  };

  // data grid column details
  const columns = [
    { field: 'name', headerName: 'Flick Name', width: 350 },
    {
      field: 'algorithmRating',
      headerName: isForGroup ? 'Group Rating' : 'Personalized Rating',
      width: 150,
      valueFormatter: ({ value }) => value.toFixed(2),
    },
    {
      field: 'voteRating',
      headerName: isForGroup ? 'Group Consensus' : 'Your Vote',
      width: 150,
      valueGetter: (params) => {
        if (params.value >= 1) {
          return 'Liked';
        } else if (params.value < 1 && params.value >= 0) {
          return 'Neutral';
        } else {
          return 'Disliked';
        }
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
        minHeight="75vh">
        <Typography variant="h4" component="h4" marginTop={'3%'}>
          Flick History
        </Typography>
        <Box
          component="img"
          sx={{
            height: 500,
            //width: 350,
            maxHeight: { xs: 300, md: 400 },
            //maxWidth: { xs: 350, md: 250 },
          }}
          alt="Image Flick"
          src={flick.imageURL}
        />

        <Box sx={{ height: 400, width: '80%' }}>
          <DataGrid
            rows={state.session.recommendations}
            columns={columns}
            getRowId={(row) => row.name}
            pageSizeOptions={[25]}
            rowSelectionModel={flick.name}
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

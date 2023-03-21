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

const VotingPage = () => {
  const { state, pathname } = useLocation();

  const uid = useSelector(selectUid);
  const [currIndex, setCurrIndex] = React.useState(0);
  const [currFlick, setCurrFlick] = React.useState({});
  const [updateFlick, setUpdateFlick] = React.useState(0);

  const isForGroup = pathname === '/group/vote';


  useEffect(() => {
    const recs = state.session.recommendations;
    for (let i = 0; i < recs.length; i += 1) {
      const rec = recs[i];
      if (!rec.userVoteSet.includes(uid)) {
        setCurrIndex(i);
        setCurrFlick(rec);
        break;
      }
    }
  }, [uid, state, updateFlick]);

  const navigate = useNavigate();

  const handleRatingClick = (value) => {

    axios
      .post(
        `${API}/api/voting/submitvote`,
        {
          sessionId: state.session.sessionId,
          uid,
          mediaName: currFlick.name,
          vote: value.toString(),
        },
        { headers }
      )
      .then((res) => {
        state.session = res.data;
      })
      .then(() => {
        const recs = state.session.recommendations;
        setCurrFlick(recs[currIndex + 1]);
        setCurrIndex(currIndex + 1);
        setUpdateFlick(updateFlick + 1);
      })
      .catch((e) => console.log(e));
  };

  const handleLeaveClick = (e) => {
    e.preventDefault();
    if (isForGroup) {
      navigate('/group', { state: state });
    } else {
      navigate('/user/session', { state: state });
    }
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
          Recommended Flick
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
            alt='movie'
            src={ currFlick.imageURL }
          />
          <Typography variant="h6" component="h6">
            {currFlick.name}
          </Typography>

          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Seen it before" />
          </FormGroup>
          <Button variant="outlined" onClick={() => handleRatingClick(1)}>
            Like
          </Button>
          <Button variant="outlined" onClick={() => handleRatingClick(0)}>
            Neutral
          </Button>
          <Button variant="outlined" onClick={() => handleRatingClick(-1)}>
            Dislike
          </Button>
        </Box>
        <Button variant="outlined" onClick={handleLeaveClick}>
          Leave Session
        </Button>
      </Box>
    </Box>
  );
};

export default VotingPage;

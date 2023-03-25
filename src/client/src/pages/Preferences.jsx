import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { selectUid } from '../features/token/tokenSlice';

const headers = {
  'x-api-key': process.env.REACT_APP_BACKEND_KEY,
};
const API = `${process.env.REACT_APP_BACKEND_URI || 'http://localhost:8080'}`;

const Preferences = () => {
  // This is going to be an API call
  const genres = [
    'drama',
    'action',
    'adventure',
    'sci-fi',
    'fantasy',
    'mystery',
    'comedy',
    'crime',
    'western',
    'animation',
    'family',
    'war',
    'politics',
    'reality',
    'news',
    'kids',
    'soap',
    'documentary',
    'talk',
    'science fiction',
    'horror',
    'romance',
    'thriller',
    'history',
    'tv movie',
    'music',
    'suspense',
    'supernatural',
    'slice of life',
    'award winning',
    'sports',
    'ecchi',
    'avant garde',
    'boys love',
    'gourmet',
  ];

  const [likedGenres, setLikedGenres] = React.useState([]);
  const [dislikedGenres, setDislikedGenres] = React.useState([]);
  const [animePref, setAnimePref] = React.useState(1);
  const [moviePref, setMoviePref] = React.useState(1);
  const [tvPref, setTVPref] = React.useState(1);
  const [rating, setRating] = React.useState(0);
  const [runtime, setRuntime] = React.useState(0);
  const [recentRelease, setRecentRelease] = React.useState(1);
  const [yearRange, setYearRange] = React.useState([1900, 2023]);
  const [popularity, setPopularity] = React.useState(1);

  const uid = useSelector(selectUid);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/api/user/pref/get?uid=${uid}`, { headers })
      .then((res) => {
        console.log(res);
        if (res.data.likedGenres !== undefined) {
          setLikedGenres(res.data.likedGenres);
        }
        if (res.data.dislikedGenres !== undefined) {
          setDislikedGenres(res.data.dislikedGenres);
        }
        if (res.data.animePreference !== undefined) {
          setAnimePref(res.data.animePreference);
        }
        if (res.data.moviePreference !== undefined) {
          setMoviePref(res.data.moviePreference);
        }
        if (res.data.tvShowPreference !== undefined) {
          setTVPref(res.data.tvShowPreference);
        }
        if (res.data.preferredRatings !== undefined) {
          setRating(res.data.preferredRatings / 2);
        }
        if (res.data.runtimePreference !== undefined) {
          setRuntime(res.data.runtimePreference);
        }
        if (res.data.recentReleasePreference !== undefined) {
          setRecentRelease(res.data.recentReleasePreference);
        }
        if (res.data.yearRangePreference !== undefined) {
          setYearRange(res.data.yearRangePreference);
        }
        if (res.data.popularityPreference !== undefined) {
          setPopularity(res.data.popularityPreference);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [uid]);

  const handleLikedGenresChange = (e) => {
    const {
      target: { value },
    } = e;
    setLikedGenres(typeof value === 'string' ? value.split(',') : value);
  };

  const handleDislikedGenresChange = (e) => {
    const {
      target: { value },
    } = e;
    setDislikedGenres(typeof value === 'string' ? value.split(',') : value);
  };

  const handleRunTimeChange = (e) => {
    e.preventDefault();
    setRuntime(e.target.value);
  };

  const handleSave = (e) => {
    const body = {
      uid: uid,
      likedGenres: likedGenres,
      dislikedGenres: dislikedGenres,
      animePreference: animePref,
      moviePreference: moviePref,
      tvShowPreference: tvPref,
      preferredRatings: 2 * rating,
      runtimePreference: runtime,
      recentReleasePreference: recentRelease,
      yearRangePreference: yearRange,
      popularityPreference: popularity,
    };

    axios
      .post(`${API}/api/user/pref/update`, body, { headers })
      .then(navigate('/home'))
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Box>
      <Header />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap="3vh"
        minHeight="75vh">
        {/* TODO: Every button needs a handler */}
        <Typography variant="h4" component="h4" marginTop={'3%'}>
          Preferences
        </Typography>

        <Box
          display="flex"
          flexDirection="row"
          alignItems="flex-start"
          gap="0%">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column">
            <Typography variant="h6" component="h6">
              Genres
            </Typography>

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column">
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="liked-genres-label">Liked</InputLabel>
                <Select
                  labelId="liked-genres-label"
                  id="liked-genres"
                  multiple
                  value={likedGenres}
                  onChange={handleLikedGenresChange}>
                  {genres
                    .filter((g) => !dislikedGenres.includes(g))
                    .map((genre) => {
                      return (
                        <MenuItem key={genre} value={genre}>
                          {genre}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>

              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="disliked-genres-label">Disliked</InputLabel>
                <Select
                  labelId="disliked-genres-label"
                  id="disliked-genres"
                  multiple
                  value={dislikedGenres}
                  onChange={handleDislikedGenresChange}>
                  {genres
                    .filter((g) => !likedGenres.includes(g))
                    .map((genre) => {
                      return (
                        <MenuItem key={genre} value={genre}>
                          {genre}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column">
            <Typography variant="h6" component="h6">
              Type
            </Typography>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column">
              <FormControl sx={{ m: 1, width: 150 }}>
                <InputLabel id="anime-pref-select-label">Anime</InputLabel>
                <Select
                  labelId="anime-pref-select-label"
                  id="anime-pref-select"
                  value={animePref}
                  onChange={(e) => setAnimePref(e.target.value)}>
                  <MenuItem value={2}>Liked</MenuItem>
                  <MenuItem defaultChecked value={1}>
                    Neutral
                  </MenuItem>
                  <MenuItem value={0}>Disliked</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, width: 150 }}>
                <InputLabel id="movie-pref-select-label">Movies</InputLabel>
                <Select
                  labelId="movie-pref-select-label"
                  id="movie-pref-select"
                  value={moviePref}
                  onChange={(e) => setMoviePref(e.target.value)}>
                  <MenuItem value={2}>Liked</MenuItem>
                  <MenuItem defaultChecked value={1}>
                    Neutral
                  </MenuItem>
                  <MenuItem value={0}>Disliked</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, width: 150 }}>
                <InputLabel id="tv-pref-select-label">TV Series</InputLabel>
                <Select
                  labelId="tv-pref-select-label"
                  id="tv-pref-select"
                  value={tvPref}
                  onChange={(e) => setTVPref(e.target.value)}>
                  <MenuItem value={2}>Liked</MenuItem>
                  <MenuItem defaultChecked value={1}>
                    Neutral
                  </MenuItem>
                  <MenuItem value={0}>Disliked</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column">
            <Typography variant="h6" component="h6">
              Minimum Rating
            </Typography>
            <Rating
              name="half-rating"
              defaultValue={0}
              value={rating}
              precision={0.5}
              onChange={(e, newRating) => {
                e.preventDefault();
                setRating(newRating);
              }}
            />

            <Typography variant="h6" component="h6" marginTop={'2%'}>
              Run Time
            </Typography>
            <FormControl variant="standard" required={true}>
              <TextField
                type="number"
                sx={{ width: '100px' }}
                onChange={handleRunTimeChange}
              />
            </FormControl>
          </Box>
        </Box>

        <Box
          display="flex"
          flexDirection="row"
          alignItems="flex-start"
          gap="0%">
          <FormControl sx={{ m: 1, width: 150 }}>
            <Typography variant="h6" component="h6" marginTop={'2%'}>
              Recent Release
            </Typography>
            <Select
              labelId="recent-release-pref-select-label"
              id="recent-release-pref-select"
              value={recentRelease}
              onChange={(e) => setRecentRelease(e.target.value)}>
              <MenuItem value={2}>Important</MenuItem>
              <MenuItem defaultChecked value={1}>
                Neutral
              </MenuItem>
              <MenuItem value={0}>Not Important</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, width: 150 }}>
            <Typography variant="h6" component="h6" marginTop={'2%'}>
              Popularity
            </Typography>
            <Select
              labelId="recent-release-pref-select-label"
              id="recent-release-pref-select"
              value={recentRelease}
              onChange={(e) => setPopularity(e.target.value)}>
              <MenuItem value={2}>Important</MenuItem>
              <MenuItem defaultChecked value={1}>
                Neutral
              </MenuItem>
              <MenuItem value={0}>Not Important</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h6" component="h6" marginTop={'2%'}>
            Release Year Range
          </Typography>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="flex-start"
            gap="5%">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disableFuture
                views={['year']}
                sx={{ width: '200px' }}
                label={'Minimum'}
                value={dayjs(yearRange[0])}
                onChange={(val) => setYearRange([val, yearRange[1]])}
              />
              <DatePicker
                disableFuture
                views={['year']}
                sx={{ width: '200px' }}
                label={'Maximum'}
                value={dayjs(yearRange[1])}
                onChange={(val) => setYearRange([yearRange[0], val])}
              />
            </LocalizationProvider>
          </Box>
        </Box>

        <Button variant="outlined" size="large" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default Preferences;

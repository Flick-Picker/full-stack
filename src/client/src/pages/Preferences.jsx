import {
  Box,
  Button,
  Typography,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Rating,
} from '@mui/material';
import React, { useEffect } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUid } from '../features/token/tokenSlice';
import { useNavigate } from 'react-router-dom';

const Preferences = () => {
  const API = `${process.env.REACT_APP_BACKEND_URI || 'http://localhost:8080'}`;

  // This is gonna be an API call
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

  const uid = useSelector(selectUid);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/api/user/pref/get?uid=${uid}`)
      .then((res) => {
        setLikedGenres(res.data.likedGenres);
        setDislikedGenres(res.data.dislikedGenres);
        setAnimePref(res.data.animePreference);
        setMoviePref(res.data.moviePreference);
        setTVPref(res.data.tvShowPreference);
        setRating(res.data.preferredRatings / 2);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [API, uid]);

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

  const handleSave = (e) => {
    // Call API Here
    const body = {
      uid: uid,
      likedGenres: likedGenres,
      dislikedGenres: dislikedGenres,
      animePreference: animePref,
      moviePreference: moviePref,
      tvShowPreference: tvPref,
      preferredRatings: 2 * rating,
    };
    axios
      .post(`${API}/api/user/pref/update`, body)
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
        gap="5vh"
        minHeight="75vh">
        {/* TODO: Every button needs a handler */}
        <Typography variant="h4" component="h4">
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
                  onChange={(e) => {
                    setAnimePref(e.target.value);
                  }}>
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
                  onChange={(e) => {
                    setMoviePref(e.target.value);
                  }}>
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
                  onChange={(e) => {
                    setTVPref(e.target.value);
                  }}>
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

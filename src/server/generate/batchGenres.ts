import fs from 'fs';
import * as movieapi from '../services/movieService';

export const retrieveBatch = async () => {
  const tvBatch = await movieapi.getGenres('tv');
  fs.writeFile('../api-json/tv_genres.json', JSON.stringify(tvBatch), (err) => {
    if (err) console.log(err);
  });
  const movieBatch = await movieapi.getGenres('movie');
  fs.writeFile('../api-json/movie_genres.json', JSON.stringify(movieBatch), (err) => {
    if (err) console.log(err);
  });
};

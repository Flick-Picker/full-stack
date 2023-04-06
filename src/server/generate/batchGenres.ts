import * as fs from 'fs';
import * as movieapi from '../services/movieService';

/**
 * Calls the external API for tv shows and movies and generates the genre list for these media types.
 */
export const retrieveBatch = async () => {
  const tvBatch = await movieapi.getGenres('tv');
  fs.writeFile('../api-json/tv_genres.json', JSON.stringify(tvBatch), (err : any) => {
    if (err) console.log(err);
  });
  const movieBatch = await movieapi.getGenres('movie');
  fs.writeFile('../api-json/movie_genres.json', JSON.stringify(movieBatch), (err: any) => {
    if (err) console.log(err);
  });
};

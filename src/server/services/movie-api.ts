import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();
const TMDB_KEY = process.env.TMDB_KEY || '';
const TMDB_API_URL = 'https://api.themoviedb.org/3';

//module.exports = () => {
// eslint-disable-next-line import/prefer-default-export
export const getGenres = async (mediatype: string) => {
  try {
    const requrl = `${TMDB_API_URL}/genre/${mediatype}/list`;
    const genres = await axios
      .get(requrl, {
        params: {
          api_key: TMDB_KEY,
          language: 'en-US',
        },
      })
      .then((resp) => resp.data)
      .catch((err) => err);
    return genres;
  } catch (err) {
    return err;
  }
};
//};

import * as dotenv from 'dotenv';
import axios from 'axios';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });
const TMDB_KEY = process.env.TMDB_KEY || '';
const TMDB_API_URL = 'https://api.themoviedb.org/3';

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

export const discoverMedia = async (mediatype: string, page: number) => {
  try {
    const requrl = `${TMDB_API_URL}/discover/${mediatype}`;
    const media = await axios.get(requrl, {
      params: {
        api_key: TMDB_KEY,
        language: 'en-US',
        sort_by: 'popularity.desc',
        with_original_language: 'en',
        page: page.toString(),
      },
    }).then((resp) => resp.data);
    return media;
  } catch (error) {
    console.log(error);
    return error;
  }
};

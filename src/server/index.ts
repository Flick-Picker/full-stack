import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;
const TMDB_KEY = process.env.TMDB_KEY || '';
const TMDB_API_URL = 'https://api.themoviedb.org/3';

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Flick Picker API');
});

app.get('/genres/:mediatype', (req: Request, res: Response) => {
  const requrl = `${TMDB_API_URL}/genre/${req.params.mediatype}/list`;
  axios
    .get(requrl, {
      params: {
        api_key: TMDB_KEY,
        language: 'en-US',
      },
    })
    .then((resp) => resp.data)
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

// mediatype is movie or tv
app.get('/recommendations/:mediatype', async (req: Request, res: Response) => {
  const requrl = `${TMDB_API_URL}/genre/${req.params.mediatype}/list`;
  const { preferences } = req.body;

  const genres: Genre = {};
  preferences.forEach((pref: Preference) => {
    if (!(pref.fav_genre in genres)) genres[pref.fav_genre] = 1;
    else genres[pref.fav_genre] += 1;
  });

  const items = Object.keys(genres).map((key) => [
    parseInt(key, 10),
    genres[parseInt(key, 10)],
  ]);
  items.sort((first, second) => second[1] - first[1]);
  console.log(items.slice(0, 5));

  res.send('Recommendations');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}/`);
});

const discoverMedia = async (mediatype: string, genres: string) => {
  try {
    const requrl = `${TMDB_API_URL}/discover/${mediatype}`;
    const media = await axios.get(requrl, {
      params: {
        api_key: TMDB_KEY,
        language: 'en-US',
        sort_by: 'popularity.desc',
        with_genres: genres,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

interface Genre {
  [genre: number]: number;
}

interface Preference {
  fav_genre: number;
}

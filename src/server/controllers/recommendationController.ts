import { Request, Response } from 'express';
import * as movieapi from '../services/movie-api';

// mediatype is movie or tv
export async function getRecommendations(req: Request, res: Response) {
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
  console.log(items);

  let recs = await movieapi.discoverMedia(
    req.params.mediatype,
    items[0][0].toString(),
    1,
  );
  recs = recs.results.splice(0, 5);
  let recs2 = await movieapi.discoverMedia(
    req.params.mediatype,
    items[1][0].toString(),
    1,
  );
  recs2 = recs2.results.splice(0, 3);
  let recs3 = await movieapi.discoverMedia(
    req.params.mediatype,
    items[2][0].toString(),
    1,
  );
  recs3 = recs3.results.splice(0, 2);
  res.send(recs.concat(recs2).concat(recs3));
}

interface Genre {
  [genre: number]: number;
}

interface Preference {
  fav_genre: number;
}

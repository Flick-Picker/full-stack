import { Request, Response } from 'express';
import * as movieapi from '../services/movie-api';

export async function resGenres(req: Request, res: Response) {
  try {
    console.log('controller');
    const { mediatype } = req.params;
    const genres = await movieapi.getGenres(mediatype);
    res.send(genres);
  } catch (err) {
    res.status(500).send(err);
  }
}

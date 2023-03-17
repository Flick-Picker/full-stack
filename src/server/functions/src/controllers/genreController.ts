import { Request, Response } from 'express';
import * as movieapi from '../services/movieService';
import { verifyKey } from '../helpers/keyHelper';

export async function resGenres(req: Request, res: Response) {
  try {
    if (!verifyKey(req)) {
      throw new Error('Invalid Flick Picker API Key');
    }
    const { mediatype } = req.params;
    const genres = await movieapi.getGenres(mediatype);
    res.send(genres);
  } catch (err) {
    res.status(500).send(err);
  }
}

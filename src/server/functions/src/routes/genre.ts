import express, { Request, Response } from 'express';
import * as controller from '../controllers/genreController';

const router = express.Router();

router.get('/', (req : Request, res: Response) => {
  res.send('Genre endpoint');
});
router.get('/:mediatype', controller.resGenres);

module.exports = router;

import express from 'express';
import * as controller from '../controllers/genreController';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Genre endpoint');
});
router.get('/:mediatype', controller.resGenres);

module.exports = router;

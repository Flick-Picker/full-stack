import express, { Request, Response } from 'express';
import * as controller from '../controllers/recommendationController';

const router = express.Router();

router.get('/', (req : Request, res: Response) => {
  res.send('Rec endpoint');
});
router.get('/get', controller.getRecommendations);

module.exports = router;

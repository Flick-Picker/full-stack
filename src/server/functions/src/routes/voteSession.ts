import * as express from 'express';
import * as controller from '../controllers/voteSessionController';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Session endpoint');
});

router.get('/get', controller.getSession);
router.post('/finish', controller.finishSession);
router.post('/recommendations/group', controller.loadRecommendationsForGroup);
router.post('/recommendations/user', controller.loadRecommendationsForUser);
router.post('/new/group', controller.addSessionForGroup); // also loads recs
router.post('/new/user', controller.addSessionForUser);
router.post('/submitvote', controller.submitUserVote);
router.get('/match', controller.computeMatch);

module.exports = router;

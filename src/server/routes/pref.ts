import express from 'express';
import * as controller from '../controllers/prefController';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('User endpoint');
});
router.get('/get', controller.getUserPref);
router.post('/new', controller.newUserPref);
router.post('/update', controller.postUserPref);
router.post('/get/group', controller.getGroupPrefs);

module.exports = router;

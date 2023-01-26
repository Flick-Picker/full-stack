import express from 'express';
import * as controller from '../controllers/profileController';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Profile endpoint');
});
router.get('/get', controller.getProfile);
router.post('/new', controller.newProfile);
router.post('/update', controller.postProfile);

module.exports = router;

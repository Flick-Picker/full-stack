import express from 'express';
import * as controller from '../controllers/userController';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('User endpoint');
});
router.get('/get', controller.getUser);
router.post('/new', controller.newUser);
router.post('/update', controller.postUser);

module.exports = router;

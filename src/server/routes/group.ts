import express from 'express';
import * as controller from '../controllers/groupController';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Group endpoint');
});
router.get('/get', controller.getGroup);
router.post('/new', controller.newGroup);
router.post('/update', controller.postGroup);
router.post('/adduser', controller.addUserToGroup);

module.exports = router;

import express, { Request, Response } from 'express';
import * as controller from '../controllers/userController';

const router = express.Router();

router.get('/', (req : Request, res: Response) => {
  res.send('User endpoint');
});
router.get('/get', controller.getUser);
router.get('/query', controller.queryUser);
router.post('/new', controller.newUser);
router.post('/update', controller.postUser);
router.post('/username', controller.updateUsername);
router.post('/email', controller.updateEmail);
router.post('/addfriend', controller.addFriend);
router.get('/collectgroups', controller.collectGroups);
router.get('/collectfriends', controller.collectFriends);

module.exports = router;

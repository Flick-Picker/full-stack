import express from 'express';
import * as controller from '../controllers/inviteController';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('User endpoint');
});
router.post('/friends/send', controller.sendFriendInvite);
router.post('/friends/accept', controller.acceptFriendInvite);
router.post('/groups/send', controller.sendGroupInvite);
router.post('/groups/accept', controller.acceptGroupInvite);

module.exports = router;

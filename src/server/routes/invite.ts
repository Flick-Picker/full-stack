import express from 'express';
import * as controller from '../controllers/inviteController';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Invite endpoint');
});

router.post('/friends/getforuser', controller.getFriendInvitesForUser);
router.post('/group/getforuser', controller.getGroupInvitesForUser);
router.post('/friends/send', controller.sendFriendInvite);
router.post('/friends/accept', controller.acceptFriendInvite);
router.post('/groups/send', controller.sendGroupInvite);
router.post('/groups/accept', controller.acceptGroupInvite);
router.post('/groups/get', controller.getGroupInvitesForGroup);

module.exports = router;

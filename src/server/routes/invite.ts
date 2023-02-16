import express, { Request, Response } from 'express';
import * as controller from '../controllers/inviteController';

const router = express.Router();

router.get('/', (req : Request, res: Response) => {
  res.send('Invite endpoint');
});
router.get('/get', controller.getInvite);
router.get('/friends/getforuser', controller.getFriendInvitesForUser);
router.get('/group/getforuser', controller.getGroupInvitesForUser);
router.post('/friends/send', controller.sendFriendInvite);
router.post('/friends/accept', controller.acceptFriendInvite);
router.post('/groups/send', controller.sendGroupInvite);
router.post('/groups/accept', controller.acceptGroupInvite);
router.get('/groups/get', controller.getGroupInvitesForGroup);

module.exports = router;

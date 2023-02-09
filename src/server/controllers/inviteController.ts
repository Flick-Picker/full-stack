import { Request, Response } from 'express';
import * as service from '../services/inviteService';

export async function sendFriendInvite(req: Request, res: Response) {
  try {
    const { senderUid, requestUid } = req.query;
    if (!senderUid || !requestUid) {
      res.status(404).json({ error: 'Params not found' });
      return;
    }
    if (typeof senderUid !== 'string' || typeof requestUid !== 'string') {
      res.status(500).json({ error: 'Invalid params' });
      return;
    }
    const invite = await service.sendFriendInvite(senderUid, requestUid);
    res.send(invite);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function acceptFriendInvite(req: Request, res: Response) {
  try {
    const { senderUid, requestUid } = req.body;
    const invite = await service.acceptFriendInvite(senderUid, requestUid);
    res.send(invite);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function sendGroupInvite(req: Request, res: Response) {
  try {
    const { groupId, senderUid, requestUid } = req.body;
    const invite = await service.sendGroupInvite(groupId, senderUid, requestUid);
    res.send(invite);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function acceptGroupInvite(req: Request, res: Response) {
  try {
    const { groupId, senderUid, requestUid } = req.body;
    const invite = await service.acceptGroupInvite(groupId, senderUid, requestUid);
    res.send(invite);
  } catch (err) {
    res.status(500).send(err);
  }
}

import { Request, Response } from 'express';
import * as service from '../services/inviteService';
import { verifyKey } from '../helpers/keyHelper';

export async function getInvite(req: Request, res: Response) {
  try {
    if (!verifyKey(req)) {
      res.status(500).json({ error: 'Invalid Flick Picker API Key' });
      return;
    }
    const { inviteId } = req.query;
    if (!inviteId) {
      res.status(404).json({ error: 'Params not found' });
      return;
    }
    if (typeof inviteId !== 'string') {
      res.status(500).json({ error: 'Invalid params' });
      return;
    }
    const invite = await service.getInvite(inviteId);
    res.send(invite);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function sendFriendInvite(req: Request, res: Response) {
  try {
    if (!verifyKey(req)) {
      res.status(500).json({ error: 'Invalid Flick Picker API Key' });
      return;
    }
    const { senderUid, senderEmail, requestUid } = req.body;
    if (!senderUid || !senderEmail || !requestUid) {
      res.status(404).json({ error: 'Params not found' });
      return;
    }
    if (typeof senderUid !== 'string' || typeof senderEmail !== 'string' || typeof requestUid !== 'string') {
      res.status(500).json({ error: 'Invalid params' });
      return;
    }
    const invite = await service.sendFriendInvite(senderUid, senderEmail, requestUid);
    res.send(invite);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function getFriendInvitesForUser(req: Request, res: Response) {
  try {
    if (!verifyKey(req)) {
      res.status(500).json({ error: 'Invalid Flick Picker API Key' });
      return;
    }
    const { uid } = req.query;
    if (!uid) {
      res.status(404).json({ error: 'Params not found' });
      return;
    }
    if (typeof uid !== 'string') {
      res.status(500).json({ error: 'Invalid params' });
      return;
    }
    const invite = await service.getFriendInvitesForUser(uid);
    res.send(invite);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function acceptFriendInvite(req: Request, res: Response) {
  try {
    if (!verifyKey(req)) {
      res.status(500).json({ error: 'Invalid Flick Picker API Key' });
      return;
    }
    const { inviteId, senderUid, requestUid } = req.body;
    const invite = await service.acceptFriendInvite(inviteId, senderUid, requestUid);
    res.send(invite);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function getGroupInvitesForUser(req: Request, res: Response) {
  try {
    if (!verifyKey(req)) {
      res.status(500).json({ error: 'Invalid Flick Picker API Key' });
      return;
    }
    const { uid } = req.query;
    if (!uid) {
      res.status(404).json({ error: 'Params not found' });
      return;
    }
    if (typeof uid !== 'string') {
      res.status(500).json({ error: 'Invalid params' });
      return;
    }
    const invite = await service.getGroupInvitesForUser(uid);
    res.send(invite);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function getGroupInvitesForGroup(req: Request, res: Response) {
  try {
    if (!verifyKey(req)) {
      res.status(500).json({ error: 'Invalid Flick Picker API Key' });
      return;
    }
    const { groupId } = req.query;
    if (!groupId) {
      res.status(404).json({ error: 'Params not found' });
      return;
    }
    if (typeof groupId !== 'string') {
      res.status(500).json({ error: 'Invalid params' });
      return;
    }
    const invite = await service.getAllInvitesForGroup(groupId);
    res.send(invite);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function sendGroupInvite(req: Request, res: Response) {
  try {
    if (!verifyKey(req)) {
      res.status(500).json({ error: 'Invalid Flick Picker API Key' });
      return;
    }
    const {
      groupId, groupName, senderUid, requestUid,
    } = req.body;
    const invite = await service.sendGroupInvite(groupId, groupName, senderUid, requestUid);
    res.send(invite);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function acceptGroupInvite(req: Request, res: Response) {
  try {
    if (!verifyKey(req)) {
      res.status(500).json({ error: 'Invalid Flick Picker API Key' });
      return;
    }
    const {
      inviteId, groupId, senderUid, requestUid,
    } = req.body;
    const invite = await service.acceptGroupInvite(inviteId, groupId, senderUid, requestUid);
    res.send(invite);
  } catch (err) {
    res.status(500).send(err);
  }
}

import { Request, Response } from 'express';
import * as service from '../services/inviteService';

export async function sendFriendInvite(req: Request, res: Response) {
  try {
    const { senderEmail, requestEmail } = req.body;
    const invite = await service.sendFriendInvite(senderEmail, requestEmail);
    res.send(invite);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function acceptFriendInvite(req: Request, res: Response) {
  try {
    const { senderEmail, requestEmail } = req.body;
    const invite = await service.acceptFriendInvite(senderEmail, requestEmail);
    res.send(invite);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function sendGroupInvite(req: Request, res: Response) {
  try {
    const { groupId, senderEmail, requestEmail } = req.body;
    const invite = await service.sendGroupInvite(groupId, senderEmail, requestEmail);
    res.send(invite);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function acceptGroupInvite(req: Request, res: Response) {
  try {
    const { groupId, senderEmail, requestEmail } = req.body;
    const invite = await service.acceptGroupInvite(groupId, senderEmail, requestEmail);
    res.send(invite);
  } catch (err) {
    res.status(500).send(err);
  }
}

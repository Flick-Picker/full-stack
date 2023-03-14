import { Request, Response } from 'express';
import * as service from '../services/groupService';

export async function getGroup(req: Request, res: Response) {
  try {
    const { groupId } = req.query;
    if (!groupId) {
      res.status(404).json({ error: 'Params not found' });
      return;
    }
    if (typeof groupId !== 'string') {
      res.status(500).json({ error: 'Invalid params' });
      return;
    }
    const group = await service.getGroup(groupId);
    res.send(group);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function newGroup(req: Request, res: Response) {
  try {
    const { ownerUid, groupName } = req.body;
    const group = await service.addGroup(groupName, ownerUid);
    res.send(group);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function postGroup(req: Request, res: Response) {
  try {
    const groupData = req.body;
    const user = await service.updateGroup(groupData);
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function addUserToGroup(req: Request, res: Response) {
  try {
    const { uid, groupId } = req.body;
    const group = await service.addUserToGroup(groupId, uid);
    res.send(group);
  } catch (err) {
    res.status(500).send(err);
  }
}

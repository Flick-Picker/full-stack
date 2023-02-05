import { Request, Response } from 'express';
import * as service from '../services/groupService';

export async function getGroup(req: Request, res: Response) {
  try {
    const { groupId } = req.body;
    const group = await service.getGroup(groupId);
    res.send(group);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function newGroup(req: Request, res: Response) {
  try {
    const { ownerEmail, groupName } = req.body;
    const group = await service.addGroup(groupName, ownerEmail);
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

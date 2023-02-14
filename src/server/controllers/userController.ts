import { Request, Response } from 'express';
import * as service from '../services/userService';

export async function getUser(req: Request, res: Response) {
  try {
    const { uid } = req.query;
    if (!uid) {
      res.status(404).json({ error: 'Params not found' });
      return;
    }
    if (typeof uid !== 'string') {
      res.status(500).json({ error: 'Invalid params' });
      return;
    }
    const user = await service.getUser(uid);
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function collectGroups(req: Request, res: Response) {
  try {
    const { uid } = req.query;
    if (!uid) {
      res.status(404).json({ error: 'Params not found' });
      return;
    }
    if (typeof uid !== 'string') {
      res.status(500).json({ error: 'Invalid params' });
      return;
    }
    const user = await service.collectGroups(uid);
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function newUser(req: Request, res: Response) {
  try {
    const { uid, email } = req.body;
    const user = await service.addUser(uid, email);
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function postUser(req: Request, res: Response) {
  try {
    const userData = req.body;
    const user = await service.updateUser(userData);
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function addFriend(req: Request, res: Response) {
  try {
    const { uid, friendUid } = req.body;
    const user = await service.addFriend(uid, friendUid);
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
}

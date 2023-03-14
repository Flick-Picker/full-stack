import { Request, Response } from 'express';
import * as service from '../services/prefService';

export async function getUserPref(req: Request, res: Response) {
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
    const pref = await service.getPref(uid);
    res.send(pref);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function newUserPref(req: Request, res: Response) {
  try {
    const { uid } = req.body;
    const pref = await service.addPref(uid);
    res.send(pref);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function postUserPref(req: Request, res: Response) {
  try {
    const prefData = req.body;
    const pref = await service.updatePref(prefData);
    res.send(pref);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function getGroupPrefs(req: Request, res: Response) {
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
    const pref = await service.getGroupPrefs(groupId);
    res.send(pref);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

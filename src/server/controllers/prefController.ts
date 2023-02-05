import { Request, Response } from 'express';
import * as service from '../services/prefService';

export async function getUserPref(req: Request, res: Response) {
  try {
    const { email } = req.body;
    const pref = await service.getPref(email);
    res.send(pref);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function newUserPref(req: Request, res: Response) {
  try {
    const { email } = req.body;
    const pref = await service.addPref(email);
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

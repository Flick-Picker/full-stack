import { Request, Response } from 'express';
import * as service from '../services/profileService';

export async function getProfile(req: Request, res: Response) {
  try {
    const { email } = req.body;
    const profile = await service.getProfile(email);
    res.send(profile);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function newProfile(req: Request, res: Response) {
  try {
    const { email } = req.body;
    const profile = await service.addProfile(email);
    res.send(profile);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function postProfile(req: Request, res: Response) {
  try {
    const profileData = req.body;
    const profile = await service.updateProfile(profileData);
    res.send(profile);
  } catch (err) {
    res.status(500).send(err);
  }
}

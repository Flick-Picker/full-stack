import { Request, Response } from 'express';
import * as service from '../services/userService';

export async function getUser(req: Request, res: Response) {
  try {
    const { email } = req.body;
    const user = await service.getUser(email);
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function newUser(req: Request, res: Response) {
  try {
    const { email } = req.body;
    const user = await service.addUser(email);
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

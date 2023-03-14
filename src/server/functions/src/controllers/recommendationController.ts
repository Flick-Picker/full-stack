import { Request, Response } from 'express';
import * as service from '../services/recommendationService';

export async function getRecommendations(req: Request, res: Response) {
  try {
    const { id, isGroup } = req.query;
    if (!id) {
      res.status(404).json({ error: 'Params not found' });
      return;
    }
    if (typeof id !== 'string' || typeof isGroup !== 'string') {
      res.status(500).json({ error: 'Invalid params' });
      return;
    }
    let isGroupbool = false;
    if (isGroup === 'true') isGroupbool = true;
    const recs = await service.getRecommendation(id, isGroupbool);
    res.send(recs);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

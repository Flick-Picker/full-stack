import { Request, Response } from 'express';

import * as service from '../services/voteSessionService';

export async function getSession(req: Request, res: Response) {
  try {
    const { uuid } = req.query;
    if (!uuid) {
      res.status(404).json({ error: 'Params not found' });
      return;
    }
    if (typeof uuid !== 'string') {
      res.status(500).json({ error: 'Invalid params' });
      return;
    }
    const session = await service.getSession(uuid);
    res.send(session);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function addSessionForGroup(req: Request, res: Response) {
  try {
    const { groupId } = req.body;
    const session = await service.addSessionForGroup(groupId);
    res.send(session);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function addSessionForUser(req: Request, res: Response) {
  try {
    const { uid } = req.body;
    const session = await service.addSessionForUser(uid);
    res.send(session);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function finishSession(req: Request, res: Response) {
  try {
    const { sessionId } = req.body;
    const session = await service.finishSession(sessionId);
    res.send(session);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function loadRecommendationsForGroup(req: Request, res: Response) {
  try {
    const { sessionId, groupId } = req.body;
    const session = await service.loadRecommendations(sessionId, groupId, true);
    res.send(session);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function loadRecommendationsForUser(req: Request, res: Response) {
  try {
    const { sessionId, uid } = req.body;
    const session = await service.loadRecommendations(sessionId, uid, false);
    res.send(session);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function submitUserVote(req: Request, res: Response) {
  try {
    const {
      sessionId,
      uid,
      mediaName,
      vote,
    } = req.body;
    const session = await service.submitUserVote(sessionId, uid, mediaName, vote);
    res.send(session);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function computeMatch(req: Request, res: Response) {
  try {
    const { uuid } = req.query;
    if (!uuid) {
      res.status(404).json({ error: 'Params not found' });
      return;
    }
    if (typeof uuid !== 'string') {
      res.status(500).json({ error: 'Invalid params' });
      return;
    }
    const match = await service.computeMatch(uuid);
    res.send(match);
  } catch (err) {
    res.status(500).send(err);
  }
}

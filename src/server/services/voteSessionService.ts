import {
  getFirestore, getDoc, setDoc, doc, updateDoc, where, query, collection,
} from 'firebase/firestore/lite';
import { v4 as uuidv4 } from 'uuid';
import * as groupService from './groupService';
import { VotingSession } from '../models/votingSessionModel';
import { HistoryMedia, UserVote, VoteMediaRec } from '../models/voteMediaModel';
import { getRecommendation } from './recommendationService';

const firebase = require('./firebase');

const col = 'votingSession';
const db = getFirestore(firebase);

export const getSession = async (uid: string) => {
  const docRef = doc(db, col, uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }
  return {};
};

export const addSessionForGroup = async (groupId: string) => {
  const id = uuidv4();
  const docRef = doc(db, col, id);
  let docSnap = await getDoc(docRef);

  const initialSession : VotingSession = {
    sessionId: id,
    isGroup: true,
    groupId,
    userUid: '',
    isDone: false,
    history: [] as HistoryMedia[],
    recommendations: [] as VoteMediaRec[],
  };

  if (!docSnap.exists()) {
    await setDoc(docRef, initialSession);
    await groupService.addNewSessionToGroup(groupId, id);
  }
  docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const addSessionForUser = async (userUid: string) => {
  const id = uuidv4();
  const docRef = doc(db, col, id);
  let docSnap = await getDoc(docRef);

  const initialSession : VotingSession = {
    sessionId: id,
    isGroup: false,
    groupId: '',
    userUid,
    isDone: false,
    history: [] as HistoryMedia[],
    recommendations: [],
  };

  if (!docSnap.exists()) {
    await setDoc(docRef, initialSession);
  }
  docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const finishSession = async (sessionId: string) => {
  const docRef = doc(db, col, sessionId);
  let docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, {
      isDone: true,
    });
  }
  docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const submitUserVote = async (
  sessionId: string,
  userUid: string,
  mediaName: string,
  vote: number,
) => {
  const docRef = doc(db, col, sessionId);
  let docSnap = await getDoc(docRef);

  const recs : VoteMediaRec[] = docSnap.get('recommendations');
  const date = new Date();

  const userVote : UserVote = {
    uid: userUid,
    vote,
    timeVoted: date.toUTCString(),
  };

  for (let i = 0; i < recs.length; i += 1) {
    const media : VoteMediaRec = recs[i];
    if (media.name === mediaName) {
      if (!media.hasVoteStarted) recs[i].hasVoteStarted = true;
      recs[i].userVoteSet.push(userUid);
      recs[i].userVotes.push(userVote);
      recs[i].voteRating += vote;
      // if (media.userVoteSet.length === group)
      console.log(recs[i]);
    }
  }

  console.log(recs);
  if (docSnap.exists()) {
    await updateDoc(docRef, {
      recommendations: recs,
    });
  }
  docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const addMediaToHistory = async (sessionId: string, mediaName: string) => {
  const docRef = doc(db, col, sessionId);
  let docSnap = await getDoc(docRef);

  const history = docSnap.get('history');
  const date = new Date();

  const voteMedia : HistoryMedia = {
    mediaName,
    hasVoteFinished: false,
    timeCreated: date.toUTCString(),
    userVotes: [],
    voteRating: 0,
  };
  history.push(voteMedia);

  if (docSnap.exists()) {
    await updateDoc(docRef, {
      history,
    });
  }
  docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const loadRecommendations = async (sessionId: string, id: string, isGroup: boolean) => {
  const docRef = doc(db, col, sessionId);
  let docSnap = await getDoc(docRef);
  const recs = await getRecommendation(id, isGroup);

  const formatrecs : VoteMediaRec[] = [];
  recs.forEach((rec) => {
    const r : any = rec;
    r.hasVoteStarted = false;
    r.hasVoteFinished = false;
    r.userVotes = [] as UserVote[];
    r.voteRanking = 0;
    r.userVoteSet = [];
    formatrecs.push(r as VoteMediaRec);
  });

  if (docSnap.exists()) {
    await updateDoc(docRef, {
      recommendations: formatrecs,
    });
  }
  docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const computeMatch = async (sessionId: string) => {
  const docRef = doc(db, col, sessionId);
  const docSnap = await getDoc(docRef);

  const recs = docSnap.get('recommendations');

  let max = 0;
  let maxRec : VoteMediaRec = {} as VoteMediaRec;
  recs.forEach((rec : VoteMediaRec) => {
    if (rec.hasVoteStarted && rec.voteRating > max) {
      max = rec.voteRating;
      maxRec = rec;
    }
  });

  return maxRec;
};

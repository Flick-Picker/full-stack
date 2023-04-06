import {
  getFirestore,
  getDoc,
  setDoc,
  doc,
  updateDoc,
} from 'firebase/firestore/lite';
import { v4 as uuidv4 } from 'uuid';
import * as groupService from './groupService';
import * as userService from './userService';
import { VotingSession } from '../models/votingSessionModel';
import { HistoryMedia, UserVote, VoteMediaRec } from '../models/voteMediaModel';
import { getRecommendation } from './recommendationService';
import RecommendationObject from '../classes/recommendationObject';

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

const formatRecommendations = async (id: string, isGroup: boolean) => {
  let recs = [] as RecommendationObject[];
  try {
    recs = await getRecommendation(id, isGroup); // collect recommendations
  } catch (err) {
    console.log(err);
  }

  const formatrecs: VoteMediaRec[] = [];
  recs.forEach((rec: RecommendationObject) => {
    const r : VoteMediaRec = {
      name: rec.name,
      algorithmRating: rec.algorithmRating,
      imageURL: rec.imageURL,
      hasVoteStarted: false,
      hasVoteFinished: false,
      userVotes: [] as UserVote[],
      voteRating: 0,
      userVoteSet: [],
    };

    formatrecs.push(r as VoteMediaRec);
  });

  return formatrecs;
};

// load recommendations into the specific Voting Session DB record
export const loadRecommendations = async (
  sessionId: string,
  id: string,
  isGroup: boolean,
) => {
  const docRef = doc(db, col, sessionId);
  let docSnap = await getDoc(docRef);
  const recs: VoteMediaRec[] = await formatRecommendations(id, isGroup);
  if (docSnap.exists()) {
    try {
      await updateDoc(docRef, {
        recommendations: recs,
      });
    } catch (err) {
      console.log(err);
    }
  }
  docSnap = await getDoc(docRef);
  return docSnap.data() as VotingSession;
};

export const addSessionForGroup = async (groupId: string) => {
  const id = uuidv4();
  const docRef = doc(db, col, id);
  const docSnap = await getDoc(docRef);

  const initialSession: VotingSession = {
    sessionId: id,
    isGroup: true,
    groupId,
    userUid: '',
    isDone: false,
    history: [] as HistoryMedia[],
    recommendations: [] as VoteMediaRec[],
  };

  // add new DB record and a session reference to the specified group DB record
  if (!docSnap.exists()) {
    await setDoc(docRef, initialSession);
    await groupService.addNewSessionToGroup(groupId, id);
  }

  const recsnap: VotingSession = await loadRecommendations(id, groupId, true);
  return recsnap;
};

export const addSessionForUser = async (userUid: string) => {
  const id = uuidv4();
  const docRef = doc(db, col, id);
  let docSnap = await getDoc(docRef);

  const initialSession: VotingSession = {
    sessionId: id,
    isGroup: false,
    groupId: '',
    userUid,
    isDone: false,
    history: [] as HistoryMedia[],
    recommendations: [],
  };

  // add new DB record and a session reference to the specified group DB record
  if (!docSnap.exists()) {
    await setDoc(docRef, initialSession);
  }
  docSnap = await getDoc(docRef);
  const recsnap: VotingSession = await loadRecommendations(id, userUid, false);
  await userService.addNewVotingSession(userUid, id);
  return recsnap;
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

// track user's votes by pushing them into the session DB record
export const submitUserVote = async (
  sessionId: string,
  userUid: string,
  mediaName: string,
  vote: string,
) => {
  const docRef = doc(db, col, sessionId);
  let docSnap = await getDoc(docRef);

  const recs: VoteMediaRec[] = docSnap.get('recommendations');
  const date = new Date();
  const votenum = parseInt(vote, 10);

  const userVote: UserVote = {
    uid: userUid,
    vote: votenum,
    timeVoted: date.toUTCString(),
  };

  for (let i = 0; i < recs.length; i += 1) {
    const media: VoteMediaRec = recs[i];
    if (media.name === mediaName) {
      if (!media.hasVoteStarted) recs[i].hasVoteStarted = true;
      recs[i].userVoteSet.push(userUid);
      recs[i].userVotes.push(userVote);
      recs[i].voteRating += votenum;
    }
  }

  if (docSnap.exists()) {
    try {
      await updateDoc(docRef, {
        recommendations: recs,
      });
    } catch (err) { console.log(err); }
  }
  docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const addMediaToHistory = async (
  sessionId: string,
  mediaName: string,
) => {
  const docRef = doc(db, col, sessionId);
  let docSnap = await getDoc(docRef);

  const history = docSnap.get('history');
  const date = new Date();

  const voteMedia: HistoryMedia = {
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

// logic for producing the Best Match
export const computeMatch = async (sessionId: string) => {
  const docRef = doc(db, col, sessionId);
  const docSnap = await getDoc(docRef);

  const recs = docSnap.get('recommendations');

  let max = -1;
  let maxRec: VoteMediaRec = {} as VoteMediaRec;
  // find max
  recs.forEach((rec: VoteMediaRec) => {
    if (rec.hasVoteStarted && rec.voteRating > max) {
      max = rec.voteRating;
      maxRec = rec;
    }
  });

  return maxRec;
};

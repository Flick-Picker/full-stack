import {
  getFirestore, getDoc, setDoc, doc, updateDoc, arrayUnion,
} from 'firebase/firestore/lite';
import { v4 as uuidv4 } from 'uuid';
import { Group } from '../models/groupModel';
import * as userService from './userService';

const firebase = require('./firebase');

const col = 'group';
const db = getFirestore(firebase);
// const userCol = collection(db, 'user');

export const getGroup = async (groupId: string) => {
  const docRef = doc(db, col, groupId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }
  return {};
};

export const getGroupRef = async (groupId: string) => {
  const docRef = doc(db, col, groupId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docRef;
  }
  return {};
};

export const addGroup = async (groupName: string, ownerUid: string) => {
  const id = uuidv4();
  const docRef = doc(db, col, id);
  let docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    await setDoc(docRef, {
      ownerUid,
      groupId: id,
      groupName,
      users: [ownerUid],
      completedVotingSessions: [],
      currentVotingSession: '',
    });
    await userService.addToGroup(ownerUid, id, true);
  }
  docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const updateGroup = async (group: Group) => {
  const docRef = doc(db, col, group.groupName);
  let docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await setDoc(docRef, group);
  }
  docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const addUserToGroup = async (groupId: string, userUid: string) => {
  const docRef = doc(db, col, groupId);
  let docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, {
      users: arrayUnion(userUid),
    });
    await userService.addToGroup(userUid, groupId, false);
  }
  docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const addNewSessionToGroup = async (groupId: string, sessionId: string) => {
  const docRef = doc(db, col, groupId);
  let docSnap = await getDoc(docRef);

  // allows for clearing of old vote session with new one
  const currSession = docSnap.get('currentVotingSession');
  if (docSnap.exists()) {
    // move old voting session to completed
    if (currSession) {
      await updateDoc(docRef, {
        currentVotingSession: sessionId,
        completedVotingSessions: arrayUnion(currSession),
      });
    } else {
      await updateDoc(docRef, {
        currentVotingSession: sessionId,
      });
    }
  }
  docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const addFinishedSessionToGroup = async (groupId: string, sessionId: string) => {
  const docRef = doc(db, col, groupId);
  let docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, {
      currentVotingSession: '',
      completedVotingSessions: arrayUnion(sessionId),
    });
  }
  docSnap = await getDoc(docRef);
  return docSnap.data();
};

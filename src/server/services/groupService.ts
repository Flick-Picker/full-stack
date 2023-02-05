import {
  getFirestore, getDoc, setDoc, doc, updateDoc, arrayUnion,
} from 'firebase/firestore/lite';
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

export const addGroup = async (groupName: string, owner: string) => {
  const id = Math.floor(Math.random() * 1000);
  const groupId = groupName.concat('#').concat(id.toString());
  const docRef = doc(db, col, groupId);
  let docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    await setDoc(docRef, {
      owner,
      groupName,
      users: [owner],
      votingSessions: [],
    });
    await userService.addToGroup(owner, groupId, true);
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

export const addUserToGroup = async (groupId: string, userEmail: string) => {
  const docRef = doc(db, col, groupId);
  let docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, {
      users: arrayUnion(userEmail),
    });
    await userService.addToGroup(userEmail, groupId, false);
  }
  docSnap = await getDoc(docRef);
  return docSnap.data();
};

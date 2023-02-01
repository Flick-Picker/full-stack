import {
  getFirestore, getDoc, setDoc, doc, updateDoc, arrayUnion,
} from 'firebase/firestore/lite';
import { Group } from '../models/groupModel';
import * as userService from './userService';

const firebase = require('./firebase');

const col = 'group';
const db = getFirestore(firebase);
// const userCol = collection(db, 'user');

export const getGroup = async (email: string) => {
  const docRef = doc(db, col, email);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }
  return {};
};

export const addGroup = async (group: Group) => {
  const groupId = group.owner.concat('@').concat(group.groupName);
  const docRef = doc(db, col, groupId);
  let docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    await setDoc(docRef, {
      owner: group.owner,
      groupName: group.groupName,
      users: [group.owner],
      votingSessions: [],
    });
    await userService.addToGroup(group.owner, groupId, true);
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

export const addUserToGroup = async (owner: string, groupName: string, userEmail: string) => {
  const groupId = owner.concat('@').concat(groupName);
  const docRef = doc(db, col, groupId);
  let docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, {
      users: arrayUnion(userEmail),
    });
    await userService.addToGroup(owner, groupId, false);
  }
  docSnap = await getDoc(docRef);
  return docSnap.data();
};

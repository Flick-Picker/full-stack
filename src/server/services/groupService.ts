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

export const getGroupRef = async (groupId: string) => {
  const docRef = doc(db, col, groupId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docRef;
  }
  return {};
};

export const addGroup = async (groupName: string, ownerUid: string) => {
  const id = Math.floor(Math.random() * 1000);
  const groupId = groupName.concat('#').concat(id.toString());
  const docRef = doc(db, col, groupId);
  let docSnap = await getDoc(docRef);

  const userRef = doc(db, 'user', ownerUid);

  if (!docSnap.exists()) {
    await setDoc(docRef, {
      ownerUid,
      groupName,
      users: [ownerUid],
      usersRef: [userRef],
      votingSessions: [],
    });
    await userService.addToGroup(ownerUid, groupId, true);
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

  const userRef = doc(db, 'user', userUid);

  if (docSnap.exists()) {
    await updateDoc(docRef, {
      users: arrayUnion(userUid),
      usersRef: arrayUnion(userRef),
    });
    await userService.addToGroup(userUid, groupId, false);
  }
  docSnap = await getDoc(docRef);
  return docSnap.data();
};

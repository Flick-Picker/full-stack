import {
  getFirestore, getDoc, setDoc, doc,
} from 'firebase/firestore/lite';
import { Preference } from '../models/prefModel';
import * as userService from './userService';
import * as groupService from './groupService';
import PreferenceObject from '../classes/preferenceObject';

const firebase = require('./firebase');

const col = 'preference';
const db = getFirestore(firebase);

export const getPref = async (uid: string) => {
  const docRef = doc(db, col, uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as PreferenceObject;
  }
  return {} as PreferenceObject;
};

export const getPrefRef = async (groupId: string) => {
  const docRef = doc(db, col, groupId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docRef;
  }
  return {};
};

export const getGroupPrefs = async (groupId: string) => {
  const groupPrefs = [];
  const group = await groupService.getGroup(groupId);
  const { users } = group;
  // eslint-disable-next-line no-restricted-syntax
  for (const user of users) {
    // eslint-disable-next-line no-await-in-loop
    const pref = await getPref(user);
    groupPrefs.push(pref);
  }
  return groupPrefs as Preference[];
};

export const addPref = async (uid: string) => {
  const docRef = doc(db, col, uid);
  let docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    await setDoc(docRef, {
      uid,
      likedGenres: [],
      dislikedGenres: [],
      lengthRange: [],
      preferredRatings: [],
      animePreference: 1,
      tvShowPreference: 1,
      moviePreference: 1,
    });
  }
  docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const updatePref = async (prefData: Preference) => {
  const docRef = doc(db, col, prefData.uid);
  let docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await setDoc(docRef, prefData);
  }
  docSnap = await getDoc(docRef);
  return docSnap.data();
};

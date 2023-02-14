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
    return docSnap.data();
  }
  return {};
};

export const addPref = async (uid: string) => {
  const docRef = doc(db, col, uid);
  let docSnap = await getDoc(docRef);

  const userRef = await userService.getUserRef(uid);

  if (!docSnap.exists()) {
    await setDoc(docRef, {
      uid,
      userRef,
      likedGenres: [],
      dislikedGenres: [],
      lengthRange: [],
      preferredRatings: [],
      dislikedMedia: [], // anime, movie, tv
    });
  }
  docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const updatePref = async (prefData: Preference) => {
  const docRef = doc(db, col, prefData.email);
  let docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await setDoc(docRef, prefData);
  }
  docSnap = await getDoc(docRef);
  return docSnap.data();
};

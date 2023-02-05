import {
  getFirestore, getDoc, setDoc, doc,
} from 'firebase/firestore/lite';
import { Preference } from '../models/prefModel';

const firebase = require('./firebase');

const col = 'preference';
const db = getFirestore(firebase);

export const getPref = async (email: string) => {
  const docRef = doc(db, col, email);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }
  return {};
};

export const addPref = async (email: string) => {
  const docRef = doc(db, col, email);
  let docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    await setDoc(docRef, {
      email,
      likedGenres: [],
      dislikedGenres: [],
      lengthRange: [],
      preferredRatings: [],
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

import {
  getFirestore, getDoc, setDoc, doc,
} from 'firebase/firestore/lite';
import { Profile } from '../models/profileModel';

const firebase = require('./firebase');

const col = 'profile';
const db = getFirestore(firebase);
// const profileCol = collection(db, 'profile');

export const getProfile = async (email: string) => {
  const docRef = doc(db, col, email);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }
  return {};
};

export const addProfile = async (email: string) => {
  const docRef = doc(db, col, email);
  let docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    await setDoc(docRef, {
      email,
      username: '',
      name: '',
      friends: [],
      groups: [],
    });
  }
  docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const updateProfile = async (profileData: Profile) => {
  const docRef = doc(db, col, profileData.email);
  let docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await setDoc(docRef, profileData);
  }
  docSnap = await getDoc(docRef);
  return docSnap.data();
};

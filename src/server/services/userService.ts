import {
  getFirestore, getDoc, setDoc, doc,
} from 'firebase/firestore/lite';
import { User } from '../models/userModel';

const firebase = require('./firebase');

const col = 'user';
const db = getFirestore(firebase);
// const userCol = collection(db, 'user');

export const getUser = async (email: string) => {
  const docRef = doc(db, col, email);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }
  return {};
};

export const addUser = async (email: string) => {
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

export const updateUser = async (userData: User) => {
  const docRef = doc(db, col, userData.email);
  let docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await setDoc(docRef, userData);
  }
  docSnap = await getDoc(docRef);
  return docSnap.data();
};

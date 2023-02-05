import {
  getFirestore, getDoc, setDoc, doc, updateDoc, arrayUnion,
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
      groupsOwned: [],
      groupsJoined: [],
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

// adding friend (two-way)
export const addFriend = async (userEmail: string, friendUserEmail: string) => {
  const docRef = doc(db, col, userEmail);
  let docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, {
      friends: arrayUnion(friendUserEmail),
    });
  }
  docSnap = await getDoc(docRef);

  const frDocRef = doc(db, col, friendUserEmail);
  const frDocSnap = await getDoc(docRef);

  if (frDocSnap.exists()) {
    await updateDoc(frDocRef, {
      friends: arrayUnion(userEmail),
    });
  }

  return docSnap.data();
};

// adding to group
export const addToGroup = async (userEmail: string, groupId: string, isOwned: boolean) => {
  const docRef = doc(db, col, userEmail);
  let docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    if (isOwned) {
      await updateDoc(docRef, {
        groupsOwned: arrayUnion(groupId),
      });
    } else {
      await updateDoc(docRef, {
        groupsJoined: arrayUnion(groupId),
      });
    }
  }
  docSnap = await getDoc(docRef);
  return docSnap.data();
};

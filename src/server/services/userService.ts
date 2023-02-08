import {
  getFirestore, getDoc, setDoc, doc, updateDoc, arrayUnion, DocumentReference,
} from 'firebase/firestore/lite';
import { User } from '../models/userModel';

const firebase = require('./firebase');

const col = 'user';
const db = getFirestore(firebase);
// const userCol = collection(db, 'user');

export const getUser = async (uid: string) => {
  const docRef = doc(db, col, uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }
  return {};
};

export const getUserRef = async (uid: string) => {
  const docRef : DocumentReference = doc(db, col, uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docRef;
  }
  return {};
};

export const addUser = async (uid: string, email: string) => {
  const docRef = doc(db, col, uid);
  let docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    await setDoc(docRef, {
      uid,
      email,
      username: '',
      name: '',
      friends: [],
      friendsRef: [],
      groupsOwned: [],
      groupsJoined: [],
      groupsOwnedRef: [],
      groupsJoinedRef: [],
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
export const addFriend = async (userUid: string, friendUid: string) => {
  const docRef = doc(db, col, userUid);
  let docSnap = await getDoc(docRef);

  const frDocRef = doc(db, col, friendUid);
  const frDocSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, {
      friends: arrayUnion(friendUid),
      friendsRef: arrayUnion(frDocRef),
    });
  }

  if (frDocSnap.exists()) {
    await updateDoc(frDocRef, {
      friends: arrayUnion(userUid),
      friendsRef: arrayUnion(docRef),
    });
  }
  docSnap = await getDoc(docRef);

  return docSnap.data();
};

// adding to group
export const addToGroup = async (userUid: string, groupId: string, isOwned: boolean) => {
  const docRef = doc(db, col, userUid);
  let docSnap = await getDoc(docRef);

  const groupRef = doc(db, 'group', groupId);

  if (docSnap.exists()) {
    if (isOwned) {
      await updateDoc(docRef, {
        groupsOwned: arrayUnion(groupId),
        groupsOwnedRef: arrayUnion(groupRef),
      });
    } else {
      await updateDoc(docRef, {
        groupsJoined: arrayUnion(groupId),
        groupsJoinedRef: arrayUnion(groupRef),
      });
    }
  }
  docSnap = await getDoc(docRef);
  return docSnap.data();
};

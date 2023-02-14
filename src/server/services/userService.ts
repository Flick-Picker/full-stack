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
export const addFriend = async (userUid: string, friendUid: string) => {
  const docRef = doc(db, col, userUid);
  let docSnap = await getDoc(docRef);

  const frDocRef = doc(db, col, friendUid);
  const frDocSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, {
      friends: arrayUnion(friendUid),
    });
  }

  if (frDocSnap.exists()) {
    await updateDoc(frDocRef, {
      friends: arrayUnion(userUid),
    });
  }
  docSnap = await getDoc(docRef);

  return docSnap.data();
};

// adding to group
export const addToGroup = async (userUid: string, groupId: string, isOwned: boolean) => {
  const docRef = doc(db, col, userUid);
  let docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    if (isOwned) {
      await updateDoc(docRef, {
        groupsOwned: arrayUnion(groupId),
        groupsJoined: arrayUnion(groupId),
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

export const collectGroups = async (uid: string) => {
  const docRef = doc(db, col, uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const groupsJoined = docSnap.get('groupsJoined');
    const groupsJoinedData = [];

    for (let i = 0; i < groupsJoined.length; i += 1) {
      const groupRef = doc(db, 'group', groupsJoined[i]);
      // eslint-disable-next-line no-await-in-loop
      const groupSnap = await getDoc(groupRef);
      groupsJoinedData.push(groupSnap.data());
    }
    return groupsJoinedData;
  }
  return {};
};

export const collectFriends = async (uid: string) => {
  const docRef = doc(db, col, uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const friends = docSnap.get('friends');
    const friendsData = [];
    for (let i = 0; i < friends.length; i += 1) {
      const friendRef = doc(db, col, uid);
      // eslint-disable-next-line no-await-in-loop
      const friendSnap = await getDoc(friendRef);
      friendsData.push(friendSnap.data());
    }
    return friendsData;
  }
  return {};
};

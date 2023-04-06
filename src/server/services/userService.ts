import {
  getFirestore,
  getDoc,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
  DocumentReference,
  query,
  where,
  collection,
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

const validateEmail = (email: string) => String(email)
  .toLowerCase()
  .match(
    /^\S+@\S+\.\S+$/,
  );

export const queryUser = async (identifier: string) => {
  let q;
  if (validateEmail(identifier)) {
    q = query(
      collection(db, col),
      where('email', '==', identifier),
    );
  } else {
    q = query(
      collection(db, col),
      where('username', '==', identifier),
    );
  }

  const querySnapshot = await getDocs(q);
  if (querySnapshot.size === 0) {
    return {};
  }
  return querySnapshot.docs[0].data();
};

export const getUserRef = async (uid: string) => {
  const docRef: DocumentReference = doc(db, col, uid);
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
      currentVotingSession: '',
    });
  }
  docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const updateUser = async (userData: User) => {
  const docRef = doc(db, col, userData.uid);
  let docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await setDoc(docRef, userData);
  }
  docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const updateUsername = async (userUid: string, username: string) => {
  const docRef = doc(db, col, userUid);
  let docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, {
      username,
    });
  }
  docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const updateEmail = async (userUid: string, email: string) => {
  const docRef = doc(db, col, userUid);
  let docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, {
      email,
    });
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

// adding a user to a specified group
export const addToGroup = async (
  userUid: string,
  groupId: string,
  isOwned: boolean,
) => {
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

// when an new voting session is created, keep track of the ID of the session
export const addNewVotingSession = async (userUid: string, votingId: string) => {
  const docRef = doc(db, col, userUid);
  let docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, {
      currentVotingSession: votingId,
    });
  }
  docSnap = await getDoc(docRef);
  return docSnap.data();
};

// collect all groups a user is in
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

// collect all friends for a user
export const collectFriends = async (uid: string) => {
  const docRef = doc(db, col, uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const friends = docSnap.get('friends');
    const friendsData = [];
    for (let i = 0; i < friends.length; i += 1) {
      const friendRef = doc(db, col, friends[i]);
      // eslint-disable-next-line no-await-in-loop
      const friendSnap = await getDoc(friendRef);
      friendsData.push(friendSnap.data());
    }
    return friendsData;
  }
  return {};
};

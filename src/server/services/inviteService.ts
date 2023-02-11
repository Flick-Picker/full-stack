import {
  getFirestore, getDoc, setDoc, doc, updateDoc, collection, query, where, getDocs,
} from 'firebase/firestore/lite';
import * as userService from './userService';
import * as groupService from './groupService';
import { FriendInvite } from '../models/friendInviteModel';
import { GroupInvite } from '../models/groupInviteModel';

const firebase = require('./firebase');

const fCol = 'friendInvite';
const gCol = 'groupInvite';
const db = getFirestore(firebase);

export const getInvite = async (senderUid: string, requestUid: string) => {
  const inviteId = senderUid.concat('@').concat(requestUid);
  const docRef = doc(db, fCol, inviteId);
  let docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }
  docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const getFriendInvitesForUser = async (uid: string) => {
  const q = query(collection(db, fCol), where('requestedId', '==', uid), where('isAccepted', '==', false));

  const invites: FriendInvite[] = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((inv) => {
    invites.push(inv.data() as FriendInvite);
  });
  return invites as FriendInvite[];
};

export const getGroupInvitesForUser = async (uid: string) => {
  const q = query(collection(db, gCol), where('requestedId', '==', uid), where('isAccepted', '==', false));

  const invites: GroupInvite[] = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((inv) => {
    invites.push(inv.data() as GroupInvite);
  });
  return invites as GroupInvite[];
};

export const getAllInvitesForGroup = async (groupId: string) => {
  const q = query(collection(db, gCol), where('groupId', '==', groupId), where('isAccepted', '==', false));

  const invites: GroupInvite[] = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((inv) => {
    invites.push(inv.data() as GroupInvite);
  });
  return invites as GroupInvite[];
};

export const sendFriendInvite = async (senderUid: string, requestUid: string) => {
  const inviteId = senderUid.concat('@').concat(requestUid);
  const docRef = doc(db, fCol, inviteId);
  let docSnap = await getDoc(docRef);

  const sendUserRef = doc(db, 'user', senderUid);
  const reqUserRef = doc(db, 'user', requestUid);

  if (!docSnap.exists()) {
    await setDoc(docRef, {
      senderUser: senderUid,
      requestedUser: requestUid,
      senderUserRef: sendUserRef,
      requestedUserRef: reqUserRef,
      isAccepted: false,
    });
  }
  docSnap = await getDoc(docRef);
  return docSnap.data();
};

// also adds users as friends
export const acceptFriendInvite = async (senderEmail: string, requestEmail: string) => {
  const inviteId = senderEmail.concat('^').concat(requestEmail);
  const docRef = doc(db, fCol, inviteId);
  let docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, {
      isAccepted: true,
    });
    await userService.addFriend(senderEmail, requestEmail);
  }
  docSnap = await getDoc(docRef);

  return docSnap.data();
};

export const sendGroupInvite = async (
  groupId: string,
  senderUid: string,
  requestUid: string,
) => {
  const inviteId = groupId.concat('@').concat(requestUid);
  const docRef = doc(db, gCol, inviteId);
  let docSnap = await getDoc(docRef);

  const sendUserRef = doc(db, 'user', senderUid);
  const reqUserRef = doc(db, 'user', requestUid);

  if (!docSnap.exists()) {
    await setDoc(docRef, {
      senderUser: senderUid,
      requestedUser: requestUid,
      senderUserRef: sendUserRef,
      requestedUserRef: reqUserRef,
      isAccepted: false,
    });
  }
  docSnap = await getDoc(docRef);
  return docSnap.data();
};

// also adds users as friends
export const acceptGroupInvite = async (
  groupId: string,
  senderUid: string,
  requestUid: string,
) => {
  const inviteId = groupId.concat('@').concat(requestUid);
  const docRef = doc(db, gCol, inviteId);
  let docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, {
      isAccepted: true,
    });
    await groupService.addUserToGroup(senderUid, requestUid);
  }
  docSnap = await getDoc(docRef);
  return docSnap.data();
};

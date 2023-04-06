import { initializeApp } from 'firebase/app';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

// firebase database configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_apiKey || '',
  authDomain: process.env.FIREBASE_authDomain || '',
  projectId: process.env.FIREBASE_projectId || '',
  storageBucket: process.env.FIREBASE_storageBucket || '',
  messagingSenderId: process.env.FIREBASE_messagingSenderId || '',
  appId: process.env.FIREBASE_appId || '',
  measurementId: process.env.FIREBASE_measurementId || '',
};

const firebase = initializeApp(firebaseConfig);

module.exports = firebase;

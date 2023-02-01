import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import router from './router';
import store from './store';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_apiKey || '',
  authDomain: process.env.REACT_APP_FIREBASE_authDomain || '',
  projectId: process.env.REACT_APP_FIREBASE_projectId || '',
  storageBucket: process.env.REACT_APP_FIREBASE_storageBucket || '',
  messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId || '',
  appId: process.env.REACT_APP_FIREBASE_appId || '',
  measurementId: process.env.REACT_APP_FIREBASE_measurementId || '',
};

const firebaseConnection = initializeApp(firebaseConfig);
const auth = getAuth(firebaseConnection);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export default auth;

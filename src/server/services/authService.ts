// not implemented yet...may not be needed on the BE

import { getAuth, signInWithCustomToken, signOut } from 'firebase/auth';

const auth = getAuth();

// signInWithCustomToken(auth, token)
//   .then((userCredential) => {
//     const user = userCredential.user;
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });


// signOut(auth).then(() => {
//   // Sign-out successful.
// }).catch((error) => {
//   // An error happened.
// });
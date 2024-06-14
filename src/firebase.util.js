import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";  

import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyD5FqgkNK3svS0MI4wIJPjTwjbjJozPZ6o",
  authDomain: "test-81e02.firebaseapp.com",
  projectId: "test-81e02",
  storageBucket: "test-81e02.appspot.com",
  messagingSenderId: "524731383805",
  appId: "1:524731383805:web:620b3a183305473099e394",
  measurementId: "G-WNTQMV9ZRC"
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
  
provider.setCustomParameters({   
  prompt : "select_account "
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
.then((result) => {
  console.log(result.user);
  if(result) {
    localStorage.setItem("user", JSON.stringify(result.user))
  }
 })
.catch((error) => {
  if (error.code === 'auth/cancelled-popup-request' || error.code === 'auth/popup-blocked') {
    console.error('Popup was cancelled or blocked.');
  }
  console.error(error);
 });


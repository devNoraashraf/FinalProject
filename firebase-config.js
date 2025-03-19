// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
GoogleAuthProvider,
signInWithPopup ,
}from "firebase/auth";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDWIkY9UxaasYzJ0_GFs_Lf_PzKNmkbWqs",
  authDomain: "finalproject-367b7.firebaseapp.com",
  projectId: "finalproject-367b7",
  storageBucket: "finalproject-367b7.firebasestorage.app",
  messagingSenderId: "569944402024",
  appId: "1:569944402024:web:9b60a5e8ef872cc72133dd",
  measurementId: "G-GV48FSW86W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => {
    return signInWithPopup(auth, provider);
  };
  export const db=getFirestore(app);


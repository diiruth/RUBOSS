// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBI4yX0sSGbkeDwE_AK12Inn55RiBGAH6Y",
  authDomain: "rubos-projeto.firebaseapp.com",
  projectId: "rubos-projeto",
  storageBucket: "rubos-projeto.firebasestorage.app",
  messagingSenderId: "319902274368",
  appId: "1:319902274368:web:927bbf9ba13b9e8c4de0a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification };

//export default app;
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import dotenv from "dotenv";
dotenv.config();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.FIRE_APIKEY,
  authDomain: process.env.FIRE_AUTHDOMAIN,
  projectId: process.env.FIRE_PROJECTID,
  storageBucket: process.env.FIRE_STORAGEBUCKET,
  messagingSenderId: process.env.FIRE_MESSAGINGSENDERID,
  appId: process.env.FIRE_APPID,
  measurementId: process.env.FIRE_MEASUREMENTID,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

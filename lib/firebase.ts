import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvjtEi8DrEWCmkA76aovFOCdJObMGT2zs",
  authDomain: "cocoandco-3a0bf.firebaseapp.com",
  projectId: "cocoandco-3a0bf",
  storageBucket: "cocoandco-3a0bf.firebasestorage.app",
  messagingSenderId: "86294739389",
  appId: "1:86294739389:web:db037ab3c307bcce0abad4",
  measurementId: "G-VCKVV63VCT"
};

// Initialize Firebase only if it hasn't been initialized already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };

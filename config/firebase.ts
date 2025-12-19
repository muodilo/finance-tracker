import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7w7PSDFRHu75vRdlxPThX4upRtg0CYiw",
  authDomain: "finance-tracker-80982.firebaseapp.com",
  projectId: "finance-tracker-80982",
  storageBucket: "finance-tracker-80982.firebasestorage.app",
  messagingSenderId: "119082331160",
  appId: "1:119082331160:web:0d6a25d8b619ddaabfa76d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
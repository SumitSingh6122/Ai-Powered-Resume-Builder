
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "ai-resume-builder-a7237.firebaseapp.com",
  projectId: "ai-resume-builder-a7237",
  storageBucket: "ai-resume-builder-a7237.appspot.com",
  messagingSenderId: "377763438850",
  appId: "1:377763438850:web:759ae25ec595a2a3b0a21b",
  measurementId: "G-H44XKJ83YY"
};


export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth=getAuth(app);
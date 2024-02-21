import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYuRirn644cfL8kFRJIuuyG0MjL1RAL9k",
  authDomain: "tinder--auth.firebaseapp.com",
  projectId: "tinder--auth",
  storageBucket: "tinder--auth.appspot.com",
  messagingSenderId: "636281495496",
  appId: "1:636281495496:web:7b17b32b84a4c64f392afd",
};

const app = initializeApp(firebaseConfig, {});

const auth = getAuth();
const db = getFirestore();

export { auth, db };

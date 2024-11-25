import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDYRyLa6nnKVz5BeOazeWbB1JMUAmajaws",
  authDomain: "user-management-c9c47.firebaseapp.com",
  projectId: "user-management-c9c47",
  storageBucket: "user-management-c9c47.appspot.com",
  messagingSenderId: "497835072357",
  appId: "1:497835072357:web:5301aebc32d5897f2fdf8c",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

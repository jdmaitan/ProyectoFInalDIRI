import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCAmJacg-ZTYhvum6IHmJAm_EUvqOkwe3M",
  authDomain: "tasklistsdiri-c5e43.firebaseapp.com",
  databaseURL: "https://tasklistsdiri-c5e43-default-rtdb.firebaseio.com",
  projectId: "tasklistsdiri-c5e43",
  storageBucket: "tasklistsdiri-c5e43.firebasestorage.app",
  messagingSenderId: "694601947742",
  appId: "1:694601947742:web:8d36f38b9d8608e12ef2cf"
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApps() [0];
export const database = getDatabase(app);
export const auth = getAuth(app);
export const taskListsRef = ref(database, 'taskLists');
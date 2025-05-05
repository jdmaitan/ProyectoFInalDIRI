import { initializeApp } from "firebase/app";
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

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const taskListsRef = ref(database, 'taskLists'); // Define una referencia a la colección 'taskLists'
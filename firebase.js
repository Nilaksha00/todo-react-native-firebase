import { initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC7PnnVRej-kqpLX1KAknka1NeN2BGqpYU",
  authDomain: "ctse-lab-1fdaa.firebaseapp.com",
  databaseURL: "https://ctse-lab-1fdaa-default-rtdb.firebaseio.com",
  projectId: "ctse-lab-1fdaa",
  storageBucket: "ctse-lab-1fdaa.appspot.com",
  messagingSenderId: "788917635947",
  appId: "1:788917635947:web:2d4c75c34e98d9f8fc9a2e",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

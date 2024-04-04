import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDi4cOvBf4MyJpp7NH2x0XBj3SEbu1bTU0",
    authDomain: "mppolice-88b79.firebaseapp.com",
    projectId: "mppolice-88b79",
    storageBucket: "mppolice-88b79.appspot.com",
    messagingSenderId: "800970594035",
    appId: "1:800970594035:web:7057eba18a0aacf3840986"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
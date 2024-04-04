import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getDatabase, ref as databaseRef, push } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDi4cOvBf4MyJpp7NH2x0XBj3SEbu1bTU0",
    authDomain: "mppolice-88b79.firebaseapp.com",
    projectId: "mppolice-88b79",
    storageBucket: "mppolice-88b79.appspot.com",
    messagingSenderId: "800970594035",
    appId: "1:800970594035:web:7057eba18a0aacf3840986"
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const database = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export const uploadImage = (imageFile) => {
    const storageRef = ref(storage, `images/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    return new Promise((resolve, reject) => {
        uploadTask.on(
            'state_changed',
            null,
            (error) => {
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                });
            }
        );
    });
};

export const saveImageUrlToDatabase = (imageUrl) => {
    const imagesRef = databaseRef(database, 'images');
    push(imagesRef, imageUrl);
};

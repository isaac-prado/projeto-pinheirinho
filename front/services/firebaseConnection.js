import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBGpHyVWvnv4Elww1OqCphc9GuvBBnjGF4",
    authDomain: "tickets-754b8.firebaseapp.com",
    projectId: "tickets-754b8",
    storageBucket: "tickets-754b8.appspot.com",
    messagingSenderId: "104027241562",
    appId: "1:104027241562:web:a35619524d34694d08ec63",
    measurementId: "G-1Y6G5Z42YC"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };
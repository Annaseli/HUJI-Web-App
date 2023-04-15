import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app';

// Initialize Firebase client SDK
const firebaseConfig = {
    apiKey: "AIzaSyDxiHfvaaIbjQj0nJrJBH7obaMOuXYnnOk",
    authDomain: "huji-innovate-app-7419c.firebaseapp.com",
    projectId: "huji-innovate-app-7419c",
    storageBucket: "huji-innovate-app-7419c.appspot.com",
    messagingSenderId: "211654656345",
    appId: "1:211654656345:web:fe77baf03582dcbb77cc48",
    measurementId: "G-FPWVVZW2L4"
};

const app = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(app)

// init auth
const projectAuth = getAuth()

export { db, projectAuth }



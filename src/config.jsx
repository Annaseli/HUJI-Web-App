import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
//import { initializeApp } from 'firebase/app';
//
//import { initializeApp } from 'firebase-admin/app';
import { initializeApp } from 'firebase-admin';

//
//
// // Initialize Firebase client SDK
// const firebaseConfig = {
//     apiKey: "AIzaSyDxiHfvaaIbjQj0nJrJBH7obaMOuXYnnOk",
//     authDomain: "huji-innovate-app-7419c.firebaseapp.com",
//     projectId: "huji-innovate-app-7419c",
//     storageBucket: "huji-innovate-app-7419c.appspot.com",
//     messagingSenderId: "211654656345",
//     appId: "1:211654656345:web:fe77baf03582dcbb77cc48",
//     measurementId: "G-FPWVVZW2L4"
// };
//
// const app = initializeApp(firebaseConfig);

// Get Firestore instance


// init auth
//const projectAuth = getAuth()

// timestamp
//const timestamp = firebase.firestore.Timestamp

//export { db, projectAuth }



// const firebaseAdmin = require('firebase-admin');
//
// let app = () => firebaseAdmin.initializeApp(firebaseConfig);
// let db = () => firebaseAdmin.firestore(app);

//import { getApp } from 'firebase-admin/ap'
//getApp();
//import { getAuth } from 'firebase-admin/auth'
//getAuth();
//import { getFirestore } from 'firebase-admin/firestore'
//getFirestore();

//const { initializeApp } = require('firebase-admin/app');
//const { getAuth } = require('firebase-admin/auth');

const app = initializeApp();
const db = getFirestore(app);

export { db }

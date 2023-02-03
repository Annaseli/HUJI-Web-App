import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import 'firebase/auth' 

const firebaseConfig = {
    apiKey: "AIzaSyDxiHfvaaIbjQj0nJrJBH7obaMOuXYnnOk",
    authDomain: "huji-innovate-app-7419c.firebaseapp.com",
    projectId: "huji-innovate-app-7419c",
    storageBucket: "huji-innovate-app-7419c.appspot.com",
    messagingSenderId: "211654656345",
    appId: "1:211654656345:web:fe77baf03582dcbb77cc48",
    measurementId: "G-FPWVVZW2L4"
  };

  // init firebase
  initializeApp(firebaseConfig)

  // init firestore
  const db = getFirestore()

  // init auth
  const projectAuth = firebase.auth()

  // timestamp
  const timestamp = firebase.firestore.timestamp

  export { db, projectAuth, timestamp }
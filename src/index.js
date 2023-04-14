import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {StrictMode} from "react";
// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
// const functions = require('firebase-functions');
//
// // The Firebase Admin SDK to access Firestore.
// const admin = require('firebase-admin');
// admin.initializeApp();
// const db = admin.firestore()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

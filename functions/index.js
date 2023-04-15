//const functions = require("firebase-functions");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
const {getAuth} = require("firebase-admin/auth");
admin.initializeApp();

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  getAuth()
      .updateUser("Rg6pLWjNXTVnkKMoOtv8u26W6fB2", {
        disabled: true
      })
      .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully updated user', userRecord.toJSON());
      })
      .catch((error) => {
        console.log('Error updating user:', error);
      });
  response.send("Hello!");
});



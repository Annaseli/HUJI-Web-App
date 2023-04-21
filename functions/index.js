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
const { getAuth } = require("firebase-admin/auth");
admin.initializeApp();

exports.enableDisableUser = functions.https.onRequest((request, response) => {
  functions.logger.info("enableDisableUser", {structuredData: true});
  getAuth()
      .updateUser(request.body.uid, {
        disabled: request.body.disable
      })
      .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully updated user', userRecord.toJSON());
      })
      .catch((error) => {
        console.log('Error updating user:', error);
      });
  response.send('Successfully updated user');
});

//TODO: back - when I use it make sure that after the delete this user is not logged in any more
exports.deleteUser = functions.https.onRequest((request, response) => {
    functions.logger.info("deleteUser", {structuredData: true});
    getAuth()
        .deleteUser(request.body.uid)
        .then(() => {
            console.log('Successfully deleted user');
        })
        .catch((error) => {
            console.log('Error deleting user:', error);
        });
    response.send('Successfully deleted user');
});



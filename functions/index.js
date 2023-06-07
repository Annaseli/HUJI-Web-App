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
const cors = require('cors')({ origin: true }); // Add this line

admin.initializeApp();

// exports.enableDisableUser = functions.https.onRequest( (request, response) => {
//     cors ( request, response, async () => {
//         functions.logger.info("enableDisableUser", {structuredData: true});
//         console.log('request.body.uid', request.body.uid);
//         console.log('request.body.disable', request.body.disable);
//
//         try {
//             const userRecord = await getAuth().updateUser(request.body.uid, {
//                 disabled: request.body.disable
//             });
//
//             console.log('functions: Successfully updated user', userRecord.toJSON());
//
//             const jsonResponse = {
//                 message: 'Successfully updated user',
//                 data: userRecord.toJSON()
//             };
//
//             response.json(jsonResponse); // Return the JSON object as the response
//         } catch (error) {
//             console.error('functions: Error updating user:', error); // Log the error
//             const errorResponse = {
//                 error: error.message
//             };
//
//             response.status(500).json(errorResponse); // Return an error JSON object
//         }
//     });
// });

exports.enableDisable = functions.https.onCall( (data, context) => {
    cors ( data, context, async () => {
        functions.logger.info("enableDisable", {structuredData: true});

        try {
            const userRecord = await getAuth().updateUser(data.uid, {
                disabled: data.disable
            });
            console.log('functions: Successfully updated user', userRecord.toJSON());

            return {
                message: 'Successfully updated user',
                data: userRecord.toJSON()
            }
        } catch (error) {
            console.error('functions: Error updating user:', error); // Log the error
            return {
                error: error.message
            } // Return an error JSON object
        }
    });
});


//TODO: back - when I use it make sure that after the delete this user is not logged in any more
// exports.deleteUser = functions.https.onRequest((request, response) => {
//     cors(request, response, () => {
//         functions.logger.info("deleteUser", {structuredData: true});
//         console.log('request.body.uid', request.body.uid);
//         getAuth()
//             .deleteUser(request.body.uid)
//             .then(() => {
//                 console.log('functions: Successfully deleted user');
//
//                 const jsonResponse = {
//                     message: 'Successfully deleted user',
//                 };
//                 response.json(jsonResponse); // Return the JSON object as the response
//             })
//             .catch((error) => {
//                 console.error('functions: Error updating user:', error); // Log the error
//                 const errorResponse = {
//                     error: error.message
//                 };
//                 response.status(500).json(errorResponse); // Return an error JSON object
//             });
//     })
// });
exports.deleteUser = functions.https.onRequest(async (request, response) => {
    cors(request, response, async () => {
        functions.logger.info("deleteUser", {structuredData: true});
        console.log('request.body.uid', request.body.uid);

        try {
            await getAuth().deleteUser(request.body.uid);

            console.log('functions: Successfully deleted user');

            const jsonResponse = {
                message: 'Successfully deleted user',
            };

            response.json(jsonResponse); // Return the JSON object as the response
        } catch (error) {
            console.error('functions: Error deleting user:', error); // Log the error
            const errorResponse = {
                error: error.message
            };

            response.status(500).json(errorResponse); // Return an error JSON object
        }
    });
});





// firebase imports
import { db } from "../../firebase/config";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

export default async function filterRoomsByUserType(userType) {
    console.log("filterRoomsByUserType")
    try {
        let roomsAvailable = []

        // search in Users for the current user id and get its doc for finding its userType.
        // let userType;
        // const docRefInUsers = doc(db, "Users", uid);
        // const docInUsersSnap = await getDoc(docRefInUsers)
        // if (docInUsersSnap.exists()) {
        //     const data = docInUsersSnap.data();
        //     userType = data.userType;
        // } else {
        //     console.log('No such document!');
        // }

        // get the roomsAvailable obj from the doc in the TypeOfUser collection corresponding to doc that
        // belongs to the userType found earlier.
        const docRefInTypeOfUsers = query(collection(db, "TypeOfUser"),
            where("userType", "==", userType))
        const querySnap = await getDocs(docRefInTypeOfUsers)
        const docSnap = querySnap.docs[0];
        roomsAvailable = docSnap.data().roomsAvailable
        return roomsAvailable
    } catch (error) {
        console.log(error.message)
    }

}
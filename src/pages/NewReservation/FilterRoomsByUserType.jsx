// firebase imports
import { db } from "../../firebase/config";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

export default async function filterRoomsByUserType(uid) {
    let roomsAv = {}
    console.log("FilterRooms")

    // search in Users for the current user id and get it's doc for finding it's userType.
    let userType;
    const docRefInUsers = doc(db, "Users", uid);
    const docInUsersSnap = await getDoc(docRefInUsers)
    if (docInUsersSnap.exists()) {
        const data = docInUsersSnap.data();
        userType = data.userType;
    } else {
        console.log('No such document!');
    }

    // get the roomsAvailable obj from the doc in the TypeOfUser collection corresponding to doc that
    // belongs to the userType found earlier.
    const docRefInTypeOfUsers = query(collection(db, "TypeOfUser"),
        where("userType", "==", userType))
    const querySnap = await getDocs(docRefInTypeOfUsers)
    const docSnap = querySnap.docs[0];
    roomsAv = docSnap.data().roomsAvailable
    return roomsAv

    // i'll make a custom hook out of all this logic and return roomsAv and matan will render the roomsAv i'll send to him. So i won't have to sent roomsAvailable as prop
    //setRoomsAvailable(roomsAv)
}
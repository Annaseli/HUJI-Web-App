// firebase imports
import { db } from "../../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";

export default async function filterRoomsByUserType(userType) {
    console.log("filterRoomsByUserType")
    let roomsAvailable = []
    // get the roomsAvailable array from the doc in the TypeOfUser collection corresponding to doc that belongs to the userType found earlier.
    const docRefInTypeOfUsers = query(collection(db, "TypeOfUser"),
        where("userType", "==", userType))
    const querySnap = await getDocs(docRefInTypeOfUsers)
    const docSnap = querySnap.docs[0];
    roomsAvailable = docSnap.data().roomsAvailable
    return roomsAvailable
}
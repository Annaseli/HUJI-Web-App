import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

export async function getCheckInCodeFromRoom(selectedRoomNum) {
    const collRef = collection(db, "Rooms")
    const docRef = query(collRef, where("roomNum", "==", `${selectedRoomNum}`))
    const querySnap = await getDocs(docRef)
    const queryDoc = querySnap.docs[0] 
    return queryDoc.data().checkIn;
}
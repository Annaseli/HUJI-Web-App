import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

export async function getCheckInCodeFromRoom(roomNum) {
    const collRef = collection(db, "Rooms")
    const docRef = query(collRef, where("roomNum", "==", `${roomNum}`))
    const querySnap = await getDocs(docRef)
    const queryDoc = querySnap.docs[0]
    return queryDoc.data().checkIn;
}
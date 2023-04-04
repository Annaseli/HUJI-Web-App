import { collection, query, where, getDocs, doc } from "firebase/firestore";
import { db } from "../firebase/config";

export async function getDocRefFromReservations(year, month, day, roomNum) {
    const docRefOfYearMonth = doc(collection(db, "Reservations"), `${year}${month}`)
    const docRefOfYearMonthDay = doc(collection(docRefOfYearMonth, `${year}${month}Reservations`), `${year}${month}${day}`)
    const collRef = collection(docRefOfYearMonthDay, `${year}${month}${day}Reservations`)
    const docRefOfYearMonthDayRoom = query(collRef, where("roomNum", "==", `${roomNum}`))
    const querySnap = await getDocs(docRefOfYearMonthDayRoom)
    const queryDoc = querySnap.docs[0] 
    const docRef = doc(collRef, queryDoc.id);
    const data = queryDoc.data();
    
    return { docRef, data };
}

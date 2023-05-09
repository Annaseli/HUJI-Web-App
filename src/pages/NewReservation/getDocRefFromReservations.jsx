import { collection, query, where, getDocs, doc } from "firebase/firestore";
import { db } from "../../firebase/config";

export default async function getDocRefFromReservations(year, month, day, roomNum) {
    const collRef = collection(db, "Reservations", year + month,
        year + month + "Reservations", year + month + day, year + month + day + "Reservations")
    const queryDocRef = query(collRef, where("roomNum", "==", roomNum));
    const querySnap =  await getDocs(queryDocRef)
    const queryDoc = querySnap.docs[0]
    const docRef = doc(collRef, queryDoc.id);
    const data = queryDoc.data();
    return { docRef, data };
}

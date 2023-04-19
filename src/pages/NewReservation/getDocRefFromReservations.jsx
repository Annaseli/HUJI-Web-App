import { collection, query, where, getDocs, doc } from "firebase/firestore";
import { db} from "../../firebase/config";

export async function getDocRefFromReservations(year, month, day, roomNum) {
    try {
        const collRef = collection(db, "Reservations", year + month,
                year + month + "Reservations", year + month + day, year + month + day + "Reservations")
        const queryDocRef = query(collRef, where("roomNum", "==", roomNum));
        const querySnap =  await getDocs(queryDocRef)
        const queryDoc = querySnap.docs[0]
        const docRef = doc(collRef, queryDoc.id);
        const data = queryDoc.data();
        return { docRef, data };
    } catch (error){
        console.log("Error getting documents: ", error);
    }
}

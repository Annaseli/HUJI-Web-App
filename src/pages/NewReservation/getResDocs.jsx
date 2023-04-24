import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

export async function getResDocs(year, month, day, roomsAvailable) {
    const collRef = query(collection(db, "Reservations", year + month,
        year + month + "Reservations", year + month + day, year + month + day + "Reservations"),
        where("roomNum", "in", roomsAvailable));
    const roomsDocs = [];
    const querySnapshot =  await getDocs(collRef)
    querySnapshot.forEach((doc) => {
        roomsDocs.push(doc.data());
    });

    return roomsDocs;
}

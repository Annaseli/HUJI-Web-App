import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export async function getUserReservations(uid) {
    // get user's reservations
    const docRef = doc(collection(db, "Users"), uid);
    const docSnap = await getDoc(docRef)
    const data = docSnap.data();
    return data.userReservationsKeys
    // if (docSnap.exists()) {
    //     const data = docSnap.data();
    //     return data.userReservationsKeys
    // } else {
    //     console.log("No such document!");
    //     setError("No such document!")
    // }
}
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export default async function getUserReservations(uid) {
    // get user's reservations
    const docRef = doc(collection(db, "Users"), uid);
    const docSnap = await getDoc(docRef)
    const data = docSnap.data();
    return data.userReservations
    // if (docSnap.exists()) {
    //     const data = docSnap.data();
    //     return data.userReservations
    // } else {
    //     console.log("No such document!");
    //     setError("No such document!")
    // }
}
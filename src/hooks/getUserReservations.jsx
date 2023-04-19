import {collection, doc, getDoc} from "firebase/firestore";
import {db} from "../firebase/config";

export async function getUserReservations(uid) {
    // TODO - in useGetUsersRes there is a duplicate code
    // get user's reservations
    const docRef = doc(collection(db, "Users"), uid);
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("data.userReservationsKeys", data.userReservationsKeys)
        return data.userReservationsKeys
    } else {
        console.log('No such document!');
    }
}
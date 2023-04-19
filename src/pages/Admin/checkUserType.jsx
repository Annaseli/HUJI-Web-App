import {doc, getDoc} from "firebase/firestore";
import {db} from "../../firebase/config";

export async function checkUserType(uid) {
    const docRef = doc(db, "Users", uid);
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        const data = docSnap.data();
        return data.userType;
    } else {
        console.log('No such document!');
        return false
    }
}
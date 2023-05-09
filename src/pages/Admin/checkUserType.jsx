// firebase
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

export default async function checkUserType(uid) {
    const docRef = doc(db, "Users", uid);
    const docSnap = await getDoc(docRef)
    const data = docSnap.data();
    console.log("data.userType", data.userType);
    return data.userType;
    // if (docSnap.exists()) {
    //     const data = docSnap.data();
    //     return data.userType;
    // } else {
    //     console.log('No such document!');
    //     return false
    // }
}
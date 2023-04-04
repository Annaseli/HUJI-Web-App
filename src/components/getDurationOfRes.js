import { getDoc } from "firebase/firestore";

export async function getDurationOfRes(docRefUser, resId) {     
    const docSnap = await getDoc(docRefUser)
    if (docSnap.exists) {
        const data = docSnap.data();
        return data.resMapFromCurDay[resId]["duration"]
    } else {
        console.log('No such document!');
    }
}
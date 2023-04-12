import { getDocRefFromReservations } from "./getDocRefFromReservations";

// firebase imports
import { db } from "../../firebase/config";
import { doc, updateDoc, setDoc, collection } from "firebase/firestore";

export default function createReservation(uid, capacity, duration, date, startHour, endHour, roomNum) {
    console.log("reservation form")
    const dayObject = new Date(date)
    const year = `${dayObject.getFullYear()}`
    const month = `${dayObject.getMonth() + 1}`.padStart(2, "0");
    const day = `${dayObject.getDate()}`.padStart(2, "0");

    const resId = year + month + day + startHour + roomNum

    async function addResToReservations() {
        const { docRef } = await getDocRefFromReservations(year, month, day, roomNum)
        for (let i = 0; i < parseInt(duration); i++) {
            const hourInt = parseInt(startHour)
            const updateMap = {
                [`${hourInt + i}`.padStart(2, "0")]: {resId: resId, uid: uid, checkedIn: false}
            }
            await updateDoc(docRef, updateMap)
        }
    }

    async function addResToUsers() {
        const docRef = doc(collection(db, "Users"), uid)
        const updateMap = {
            [resId]: {
                date,
                startHour,
                endHour,
                duration,
                roomNum
            }
        };
        await setDoc(docRef, {
            resMapFromCurDay: updateMap
        }, { merge: true });
    }

    addResToReservations()
    addResToUsers()

    // without the useEffect the component renders infinitely
    // useEffect(() => {
    //     if (response.success) {
    //         console.log(response.success)
    //     } else if (response.error) {
    //         console.log(response.error)
    //     } else if (response.isPending) {
    //         console.log("loading...")
    //         // can I print the loading to the user too?
    //     }
    // }, [response])

}
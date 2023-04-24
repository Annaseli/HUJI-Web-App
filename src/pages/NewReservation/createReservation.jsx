import { getDocRefFromReservations } from "./getDocRefFromReservations";

// firebase imports
import { db } from "../../firebase/config";
import { doc, updateDoc, setDoc, collection } from "firebase/firestore";

export default function createReservation(uid, capacity, duration, date, startHour, endHour, roomNum) {
    console.log("createReservation")
    const dayObject = new Date(date)
    const year = `${dayObject.getFullYear()}`
    const month = "07"// ${dayObject.getMonth() + 1}`.padStart(2, "0");
    const day = `${dayObject.getDate()}`.padStart(2, '0');
    const startHourPadded = `${startHour}`.padStart(2, '0');
    const endHourPadded = `${endHour}`.padStart(2, '0');
    const paddedRoom = `${roomNum}`.padStart(2, '0');

    const resId = year + month + day + startHourPadded + roomNum

    async function addResToReservations() {
        const { docRef } = await getDocRefFromReservations(year, month, day, roomNum)
        for (let i = 0; i < parseInt(duration); i++) {
            const updateMap = {
                [`${parseInt(startHour) + i}`.padStart(2, '0')]: {
                    resId: resId,
                    uid: uid,
                    year,
                    month,
                    day,
                    duration,
                    startHour: startHourPadded + ":00",
                    endHour: endHourPadded,
                    peopleNum: capacity,
                    checkedIn: false,
                    checkInTimeStamp: null
                }
            }
            await updateDoc(docRef, updateMap)
        }
    }

    async function addResToUsers() {
        const docRef = doc(collection(db, "Users"), uid)
        const updateMap = {
            [resId]: {
                year,
                month,
                day,
                duration,
                roomNum,
                startHour: startHourPadded + ":00",
                endHour: endHourPadded,
                peopleNum: capacity
            }
        };
        await setDoc(docRef, {
            userReservationsKeys: updateMap
        }, { merge: true });
    }

    addResToReservations()
    addResToUsers()
}
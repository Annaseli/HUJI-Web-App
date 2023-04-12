import { addDoc, setDoc, updateDoc, doc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import { range } from "lodash";

export async function createAnEmptyCollection(year, month, rooms) {
    console.log("create An Empty Collection")
    // create a doc in the Reservations collection with id {year}{month}
    const resCollectionRef = collection(db, 'Reservations');
    const docYMRef = doc(resCollectionRef, year + month);
    await setDoc(docYMRef, {})

    // create a collection inside the doc with the id {year}{month} that called {year}{month}Reservations
    const subCollectionYMRef = collection(docYMRef, year + month + 'Reservations');
    // create a doc for each day for the current month in the {year}{month}Reservations
    // collection with id {year}{month}{day}
    range(1, 32).forEach(async (day) => {
        const dayToPlace = `${day}`.padStart(2, '0')
        const docYMDRef = doc(subCollectionYMRef, year + month + dayToPlace);
        await setDoc(docYMDRef, {})
        // create a collection inside the doc with the id {year}{month}{day} that called {year}{month}{day}Reservations
        const subCollectionYMDRef = collection(docYMDRef, year + month + dayToPlace + 'Reservations')

        rooms.forEach(async (room) => {
            const docRef = await addDoc(subCollectionYMDRef, {
                roomNum: room.roomNum,
                roomCapacity: room.capacity
            })

            range(8, 19).forEach(async (hour) => {
                const hourToPlace = `${hour}`.padStart(2, '0')
                await updateDoc(docRef, {[hourToPlace]: {}})
            })
        })
    })
}
import { addDoc, setDoc, updateDoc, doc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import { range } from "lodash";

export default async function createAnEmptyCollection(year, month, rooms) {
    console.log("create An Empty Collection")
    // create a doc in the Reservations collection with id {year}{month}
    const resCollectionRef = collection(db, "Reservations");
    const docYMRef = doc(resCollectionRef, year + month);
    await setDoc(docYMRef, {})

    // create a collection inside the doc with the id {year}{month} that called {year}{month}Reservations
    const subCollectionYMRef = collection(docYMRef, year + month + "Reservations");
    // create a doc for each day for the current month in the {year}{month}Reservations collection with id {year}{month}{day}
    range(1, 32).forEach(async (day) => {
        const paddedDay = `${day}`.padStart(2, '0')
        const fullDate = year + '-' + month + '-' + `${paddedDay}`
        const dateObject = new Date(fullDate)
        const numOfDayInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();
        // if it's not friday, not saturday and the day to be created is less then the total days in month create the
        // day as an empty day from reservations to the Reservations collection
        if (dateObject.getDay() !== 5 && dateObject.getDay() !== 6 && day <= numOfDayInMonth ){
            const docYMDRef = doc(subCollectionYMRef, year + month + paddedDay);
            await setDoc(docYMDRef, {})
            // create a collection inside the doc with the id {year}{month}{day} that called {year}{month}{day}Reservations
            const subCollectionYMDRef = collection(docYMDRef, year + month + paddedDay + "Reservations")

            rooms.forEach(async (room) => {
                const roomNum = room.roomNum
                const paddedRoomNum = `${roomNum}`.padStart(2, '0');
                const docRef = await addDoc(subCollectionYMDRef, {
                    roomNum: roomNum,
                    roomCapacity: room.capacity
                })

                range(8, 19).forEach(async (hour) => {
                    const hourToPlace = `${hour}`.padStart(2, '0')
                    await updateDoc(docRef, {[hourToPlace]: {}})
                })
            })
        }
    })
}
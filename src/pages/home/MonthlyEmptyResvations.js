import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useCollection } from "../../hooks/useCollection"

// firebase imports
import { db } from "../../firebase/config";
import { doc, collection, addDoc, setDoc } from "firebase/firestore";

export default function MonthlyEmptyResvations({ year, month}) {
    //const { addDoc, response } = useFirestore('DateTimeRes')
    console.log("MonthlyEmptyResvations form")
    const { docs: rooms } = useCollection('Rooms')

    // const arrayRange = (start, stop, step) => {
    //     Array.from(
    //         { length: (stop - start) / step + 1 },
    //         (value, index) => start + index * step
    //     );
    // }

    function range(start, end) {
        var ans = [];
        for (let i = start; i <= end; i++) {
            ans.push(i);
        }
        return ans;
    }

    // let resByHours = new Map()
    // range(8, 18).forEach((hour) => {
    //     resByHours.set(hour, [])
    // })

    const [mapData, setMapData] = useState({})

    const addKeyValuePair = (key, value) => {
        setMapData(prevState => ({
          ...prevState,
          [key]: value
        }));
    };
         
    const handleSubmit = async (event) => {
        event.preventDefault()

        // create a doc in the Reservations collection with id {year}{month}
        const docYMRef = doc(db, 'Reservations', `${year}${month}`);
        await setDoc(docYMRef, {})

        // create a collection inside the doc with the id {year}{month} that called 
        // {year}{month}Reservations
        const subCollectionYMRef = collection(docYMRef, `${year}${month}Reservations`);
        await setDoc(subCollectionYMRef, {})

        range(8, 18).forEach((hour) => {
            addKeyValuePair(hour, [])
        })

        // create a doc for each day for the current month in the {year}{month}Reservations 
        // collection with id {year}{month}{day}
        const docYMDRef = doc(docYMRef, `${year}${month}Reservations`,
        `${year}${month}day`);
        await setDoc(docYMDRef, {})

        // create a collection inside the doc with the id {year}{month}{day} that called 
        // {year}{month}{day}Reservations
        const subCollectionYMDRef = collection(docYMDRef, `${year}${month}dayReservations`);
        await setDoc(subCollectionYMDRef, {})

        // Object.keys(rooms).forEach(async (room) => {
        //     // create a doc for each room for the current day in the {year}{month}{day}Reservations 
        //     // collection with id {year}{month}{day}{roomNum}
        //     const docRoomNumRef = doc(docYMDRef, `${year}${month}dayReservations`,
        //         `${year}${month}day${room.roomNum}`);
        //     await setDoc(docRoomNumRef, {})

        //     // create a collection inside the doc with the id {year}{month}{day}{roomNum} that called 
        //     // {year}{month}{day}{roomNum}Reservations that will include the room capacity and
        //     // a map in the format {hour: [array of details of a reservation]...}
        //     const subCollectionRoomNumRef = collection(docRoomNumRef, 
        //         `${year}${month}day${room.roomNum}Reservations`);

        //     // await addDoc(subCollectionRoomNumRef, {
        //     //     roomCapacity: room.capacity,
        //     //     resByHours
        //     // })

        //     await addDoc(subCollectionRoomNumRef, {mapData})
        // })
       
        // range(1, 31).forEach(async (day) => {
        //     // create a doc for each day for the current month in the {year}{month}Reservations 
        //     // collection with id {year}{month}{day}
        //     const docYMDRef = doc(subCollectionYMRef, 'Reservations/' + `${year}${month}Reservations`,
        //     `${year}${month}${day}`);
        //     await setDoc(docYMDRef, {})

        //     // create a collection inside the doc with the id {year}{month}{day} that called 
        //     // {year}{month}{day}Reservations
        //     const subCollectionYMDRef = collection(docYMDRef, `${year}${month}${day}Reservations`);
        //     await addDoc(subCollectionYMDRef, {})

        //     Object.keys(rooms).forEach(async (room) => {
        //         // create a doc for each room for the current day in the {year}{month}{day}Reservations 
        //         // collection with id {year}{month}{day}{roomNum}
        //         const docRoomNumRef = doc(subCollectionYMDRef, 
        //             'Reservations/' + `${year}${month} reservations` + `${year}${month}${day} reservations`,
        //             `${year}${month}${day}${room.roomNum}`);
        //         await setDoc(docRoomNumRef, {})

        //         // create a collection inside the doc with the id {year}{month}{day}{roomNum} that called 
        //         // {year}{month}{day}{roomNum}Reservations that will include the room capacity and
        //         // a map in the format {hour: [array of details of a reservation]...}
        //         const subCollectionRoomNumRef = collection(docRoomNumRef, 
        //             `${year}${month}${day}${room.roomNum}Reservations`);

        //         // await addDoc(subCollectionRoomNumRef, {
        //         //     roomCapacity: room.capacity,
        //         //     resByHours
        //         // })

        //         await addDoc(subCollectionRoomNumRef, {mapData})
        //     })
            
        //})
    }

    // when we have a successful response fire this function and reset it if it's true
    // useEffect(() => {
    //     if (response.success) {
    //         setDuration('')
    //         setCapacity('')
    //         setDate('')
    //         setTime('')
    //     }
    // }, [response.success])

    return(
        <>
            <h2>MonthlyEmptyResvations Form</h2>
            <form onSubmit={handleSubmit}>
            <button>Create the subcollections</button>
        </form>
        </>
        
    )
}
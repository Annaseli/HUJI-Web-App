import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useCollection } from "../../hooks/useCollection";
//import { useMonthlyEmptyResvations } from "../../hooks/useMonthlyEmptyResvations";

// firebase imports
import { db } from "../../firebase/config";
import { doc, getDoc, collection, addDoc, query, where, getDocs, updateDoc, setDoc } from "firebase/firestore";

export default function ReservationForm({ uid }) {
    const [duration, setDuration] = useState('')
    const [capacity, setCapacity] = useState('')
    const [year, setYear] = useState('')
    const [month, setMonth] = useState('')
    const [day, setDay] = useState('')
    const [hour, setHour] = useState('')
    const [selectedRoomNum, setSelectedRoomNum] = useState('')
    const { docs: rooms } = useCollection('Rooms')
    //const { login, error, isPending } = useMonthlyEmptyResvations('')
    console.log("reservation form")
    console.log("uid", uid)

    function range(start, end) {
        var ans = [];
        for (let i = start; i <= end; i++) {
            ans.push(i);
        }
        return ans;
    }

    async function fetchData(year, month, rooms) {
        console.log("MonthlyEmptyResvations form")
        // create a doc in the Reservations collection with id {year}{month}
        console.log("rooms", rooms)
        const resCollectionRef = collection(db, 'Reservations');
        const docYMRef = doc(resCollectionRef, `${year}${month}`);
        await setDoc(docYMRef, {})

        // create a collection inside the doc with the id {year}{month} that called {year}{month}Reservations
        const subCollectionYMRef = collection(docYMRef, `${year}${month}Reservations`);
        console.log("4")
        // create a doc for each day for the current month in the {year}{month}Reservations 
        // collection with id {year}{month}{day}
        range(1, 31).forEach(async (day) => {
            const docYMDRef = doc(subCollectionYMRef, `${year}${month}${day}`);
            await setDoc(docYMDRef, {})
            console.log("5")
            // create a collection inside the doc with the id {year}{month}{day} that called {year}{month}{day}Reservations
            const subCollectionYMDRef = collection(docYMDRef, `${year}${month}${day}Reservations`)

            rooms.forEach(async (room) => {
                const docRef = await addDoc(subCollectionYMDRef, {
                    roomNum: room.roomNum,
                    roomCapacity: room.capacity
                })
                
                range(8, 18).forEach(async (hour) => {
                    await updateDoc(docRef, {[hour]: {}})
                })                
            })
        }) 
    }

    const resId = `${year}${month}${day}${hour}${selectedRoomNum}`

    async function addResToReservations() {          
        
        const checkDoc = doc(collection(db, "Reservations"), `${year}${month}`)
        console.log("checkDoc", checkDoc)
        const docSnap = await getDoc(checkDoc)
        console.log("docSnap", docSnap)
        if (!docSnap.exists()) {
            console.log("creating MonthlyEmptyResvations")           
            await fetchData(year, month, rooms)
        }

        console.log("5")
        const docRefOfYearMonth = doc(collection(db, "Reservations"), `${year}${month}`)
        const docRefOfYearMonthDay = doc(collection(docRefOfYearMonth, `${year}${month}Reservations`), `${year}${month}${day}`)
        const collectionRef = collection(docRefOfYearMonthDay, `${year}${month}${day}Reservations`)
        const docRefOfYearMonthDayRoom = query(collectionRef, where("roomNum", "==", `${selectedRoomNum}`))
        const querySnapshot = await getDocs(docRefOfYearMonthDayRoom)
        const queryDoc = querySnapshot.docs[0] 
        const docRef = doc(collectionRef, queryDoc.id)
       
        for (let i = 0; i < duration; i++) {         
            const updateMap = {
                [`${parseInt(hour) + i}`]: {resId: resId, uid: uid, checkedIn: false}
            }
            await updateDoc(docRef, updateMap)
        }           
    }

    async function addResToUsers() {                            
        const docRef = doc(collection(db, "Users"), uid)

        const updateMap = {
            [resId]: {
              year: year,
              month: month,
              day: day,
              duration: duration,
              roomNum: selectedRoomNum
            }
          };
          
        await setDoc(docRef, {
            resMapFromCurDay: updateMap
        }, { merge: true });
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault()

        addResToReservations()
        addResToUsers()

        setDuration('')
        setCapacity('')
        setYear('')
        setMonth('')
        setDay('')
        setHour('')
        setSelectedRoomNum('')
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


    //TODO: get the selectedRoomNum from the form by selecting it from all the options
    return(
        <>
            <h2>Reservation Form</h2>
            <form onSubmit={handleSubmit}>
            <label>
                <span> Num of people:</span>
                <input
                    required
                    type="text"
                    onChange={(e) => setCapacity(e.target.value)}
                    value={capacity}
                />
            </label>
            <label>
                <span> Duration:</span>
                <input
                    required
                    type="text"
                    onChange={(e) => setDuration(e.target.value)}
                    value={duration}
                />
            </label>
            <label>
                <span> Year:</span>
                <input
                    required
                    type="text"
                    onChange={(e) => setYear(e.target.value)}
                    value={year}
                />
            </label>
            <label>
                <span> Month:</span>
                <input
                    required
                    type="text"
                    onChange={(e) => setMonth(e.target.value)}
                    value={month}
                />
            </label>
            <label>
                <span> Day:</span>
                <input
                    required
                    type="text"
                    onChange={(e) => setDay(e.target.value)}
                    value={day}
                />
            </label>
            <label>
                <span> Hour:</span>
                <input
                    required
                    type="text"
                    onChange={(e) => setHour(e.target.value)}
                    value={hour}
                />
            </label>
            <label>
                <span> Room:</span>
                <input
                    required
                    type="text"
                    onChange={(e) => setSelectedRoomNum(e.target.value)}
                    value={selectedRoomNum}
                />
            </label>
            <button>Reserve a room</button>
        </form>
        </>       
    )
}
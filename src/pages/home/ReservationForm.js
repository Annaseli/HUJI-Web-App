import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";

// firebase imports
import { db } from "../../firebase/config";
import { doc, getDoc, collection, onSnapshot, query, where, getDocs, updateDoc, setDoc } from "firebase/firestore";

export default function ReservationForm({ uid }) {
    const [duration, setDuration] = useState('')
    const [capacity, setCapacity] = useState('')
    const [year, setYear] = useState('')
    const [month, setMonth] = useState('')
    const [day, setDay] = useState('')
    const [hour, setHour] = useState('')
    const [selectedRoomNum, setSelectedRoomNum] = useState('')
    console.log("reservation form")

    const resId = `${year}${month}${day}${hour}${selectedRoomNum}`

    async function addResToReservations() {                         
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
        
        // await updateDoc(docRef, {
        //     resMapFromCurDay: updateMap
        //   });    
          
        await setDoc(docRef, {
            resMapFromCurDay: updateMap
        }, { merge: true });
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault()

        addResToReservations()
        addResToUsers()

        // setDuration('')
        // setCapacity('')
        // setYear('')
        // setMonth('')
        // setDay('')
        // setHour('')
        // setSelectedRoomNum('')
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
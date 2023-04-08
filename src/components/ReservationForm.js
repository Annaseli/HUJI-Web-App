import { useEffect, useState } from "react";
import { useCollection } from "../hooks/useCollection";
import { getDocRefFromReservations } from "./getDocRefFromReservations";
import { useFirestore } from "../hooks/useFirestore";
//import { useCreateAnEmptyColl } from "../hooks/useCreateAnEmptyColl";
import { createAnEmptyColl } from "./createAnEmptyColl";

// firebase imports
import { db } from "../firebase/config";
import { doc, getDoc, collection } from "firebase/firestore";

export default function ReservationForm({ uid }) {
    const [duration, setDuration] = useState('')
    const [capacity, setCapacity] = useState('') 
    const [year, setYear] = useState('')
    const [month, setMonth] = useState('')
    const [day, setDay] = useState('') 
    const [hour, setHour] = useState('')
    const [selectedRoomNum, setSelectedRoomNum] = useState('')
    const { setDocToFireStore, updateDocInFireStore, response } = useFirestore()
    //const { createAnEmptyColl, response: resFromCreateAnEmptyColl } = useCreateAnEmptyColl()
    const { docs: rooms } = useCollection('Rooms')

    console.log("reservation form")

    const resId = `${year}${month}${day}${hour}${selectedRoomNum}`

    async function addResToReservations() {                
        const checkDoc = doc(collection(db, "Reservations"), `${year}${month}`)
        const docSnap = await getDoc(checkDoc)
        if (!docSnap.exists()) {         
            rooms && await createAnEmptyColl(year, month, rooms)
        }

        const { docRef } = await getDocRefFromReservations(year, month, day, selectedRoomNum)
       
        for (let i = 0; i < duration; i++) {   
            const hourToRead = parseInt(hour)   
            const updateMap = {               
                [`${hourToRead + i}`]: {resId: resId, uid: uid, checkedIn: false}
            }
            await updateDocInFireStore(docRef, updateMap)
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
          
        await setDocToFireStore(docRef, {
            resMapFromCurDay: updateMap
        }, { merge: true });
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault()

        addResToReservations()
        addResToUsers()
    }

    // without the useEffect the component renders infinitely 
    useEffect(() => {
        if (response.success) {
            setDuration('')
            setCapacity('')
            setYear('')
            setMonth('')
            setDay('')
            setHour('')
            setSelectedRoomNum('')
        } else if (response.error) {
            setDuration('')
            setCapacity('')
            setYear('')
            setMonth('')
            setDay('')
            setHour('')
            setSelectedRoomNum('')
            console.log(response.error)
        } else if (response.isPending) {
            console.log("loading...")
            // can I print the loading to the user too?
        }   
    }, [response.success, response.error])


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
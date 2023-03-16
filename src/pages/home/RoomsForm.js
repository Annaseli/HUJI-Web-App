import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";

// firebase imports
import { db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";

export default function RoomsForm() {
    const [roomNum, setRoomNum] = useState('')
    const [capacity, setCapacity] = useState('')
    const [location, setLocation] = useState('')
    const [hasComputer, setHasComputer] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [hoursAvailable, setHoursAvailable] = useState([])
    //const { addDoc, response } = useFirestore('DateTimeRes')
    console.log("Rooms form")

    const handleSubmit = async (event) => {
        event.preventDefault()

        const ref = collection(db, 'Rooms')

        await addDoc(ref, {
            //TODO back: add a doc as I planned using uid, duration, capacity ...
            // and check for invalid data
            roomNum,
            capacity,
            location,
            hasComputer,
            checkIn,
            hoursAvailable
        })

        setRoomNum('')
        setCapacity('')
        setLocation('')
        setHasComputer('')
        setCheckIn('')
        setHoursAvailable('')
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
            <h2>Rooms Form</h2>
            <form onSubmit={handleSubmit}>
            <label>
                <span> Room Number:</span>
                <input
                    required
                    type="num"
                    onChange={(e) => setRoomNum(e.target.value)}
                    value={roomNum}
                />
            </label>
            <label>
                <span> Capacity:</span>
                <input
                    required
                    type="num"
                    onChange={(e) => setCapacity(e.target.value)}
                    value={capacity}
                />
            </label>
            <label>
                <span> Location:</span>
                <input
                    
                    type="text"
                    onChange={(e) => setLocation(e.target.value)}
                    value={location}
                />
            </label>
            <label>
                <span> HasComputer:</span>
                <input
                    
                    type="boolean"
                    onChange={(e) => setHasComputer(e.target.value)}
                    value={hasComputer}
                />
            </label>
            <label>
                <span> CheckIn:</span>
                <input
                    
                    type="num"
                    onChange={(e) => setCheckIn(e.target.value)}
                    value={hasComputer}
                />
            </label>
            <label>
                <span> HoursAvailable:</span>
                <input
                    
                    type="boolean"
                    onChange={(e) => setHoursAvailable(e.target.value)}
                    value={hoursAvailable}
                />
            </label>
            <button>Add a room</button>
        </form>
        </>
        
    )
}
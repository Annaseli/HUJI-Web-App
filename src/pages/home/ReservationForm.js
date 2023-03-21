import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";

// firebase imports
import { db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";

export default function ReservationForm({ uid, selectedRoomNum}) {
    const [duration, setDuration] = useState('')
    const [capacity, setCapacity] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    //const { addDoc, response } = useFirestore('DateTimeRes')
    console.log("reservation form")
    console.log(selectedRoomNum)


    const handleSubmit = async (event) => {
        event.preventDefault()

        const ref = collection(db, 'Reservations')

        await addDoc(ref, {
            //TODO back: add a doc as I planned using uid, duration, capacity ...
            // and check for invalid data
            duration,
            capacity,
            date,
            time,
            selectedRoomNum,
            uid
        })

        setDuration('')
        setCapacity('')
        setDate('')
        setTime('')
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
            <h2>Reservation Form</h2>
            <form onSubmit={handleSubmit}>
            <label>
                <span> Num of people:</span>
                <input
                    required
                    type="num"
                    onChange={(e) => setCapacity(e.target.value)}
                    value={capacity}
                />
            </label>
            <label>
                <span> Duration:</span>
                <input
                    required
                    type="num"
                    onChange={(e) => setDuration(e.target.value)}
                    value={duration}
                />
            </label>
            <label>
                <span> Date:</span>
                <input
                    required
                    type="date"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                />
            </label>
            <label>
                <span> Time:</span>
                <input
                    required
                    type="time"
                    onChange={(e) => setTime(e.target.value)}
                    value={time}
                />
            </label>
            <button>Reserve a room</button>
        </form>
        </>
        
    )
}
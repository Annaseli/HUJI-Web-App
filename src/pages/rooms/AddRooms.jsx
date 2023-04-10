import { useEffect, useState } from "react";
import { useFirestore} from "../../hooks/useFirestore";

// firebase imports
import { db } from "../../firebase/config";
import { collection } from "firebase/firestore";

export default function AddRooms() {
    const [roomNum, setRoomNum] = useState('')
    const [capacity, setCapacity] = useState('')
    const [location, setLocation] = useState('')
    const [hasComputer, setHasComputer] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [hoursAvailable, setHoursAvailable] = useState([])
    const { addDocToFireStore, response } = useFirestore()
    console.log("Add Rooms")

    const handleSubmit = async (event) => {
        event.preventDefault()

        const ref = collection(db, 'Rooms')

        await addDocToFireStore(ref, {
            // check for invalid data
            roomNum,
            capacity,
            location,
            hasComputer,
            checkIn,
            hoursAvailable
        })
    }

    // without the useEffect the component renders infinitely
    useEffect(() => {
        if (response.success) {
            setRoomNum('')
            setCapacity('')
            setLocation('')
            setHasComputer('')
            setCheckIn('')
            setHoursAvailable([])
            console.log(response.success)
        } else if (response.error) {
            setRoomNum('')
            setCapacity('')
            setLocation('')
            setHasComputer('')
            setCheckIn('')
            setHoursAvailable([])
            console.log(response.error)
        } else if (response.isPending) {
            console.log("loading...")
            // can I print the loading to the user too?
        }
    }, [response])

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
                        value={checkIn}
                    />
                </label>
                <label>
                    <span> HoursAvailable:</span>
                    <input

                        type="boolean"
                        onChange={(e) => setHoursAvailable([...hoursAvailablem, e.target.value])}
                        value={hoursAvailable}
                    />
                </label>
                <button>Add a room</button>
            </form>
        </>

    )
}
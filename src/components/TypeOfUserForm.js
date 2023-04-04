import { useEffect, useState } from "react";
import { useColl } from "../hooks/useColl"
import DisplayRooms from "./DisplayRooms";
import { useFirestore } from "../hooks/useFirestore";

// firebase imports
import { db } from "../firebase/config";
import { collection } from "firebase/firestore";

export default function TypeOfUserForm() {
    const [userType, setUserType] = useState('')
    const [roomsAvailable, setRoomsAvailable] = useState({})
    const { addDocToFireStore, response } = useFirestore()
    const { docs: rooms } = useColl('Rooms')
    console.log("type of user form")

    const handleSubmit = async (event) => {
        event.preventDefault()

        const ref = collection(db, 'TypeOfUser')       
        await addDocToFireStore(ref, {
            userType,
            // roomsAvailable will be a map - after the user selected the room by using DisplayRooms
            // we will need to add to a map the roomNum and roomCapacity that I saved in the DisplayRooms.
            // we can first ask for the user_type and then after each select room to add this to the
            // relevant doc into the map.
            roomsAvailable
        })
    }

    // without the useEffect the component renders infinitely 
    useEffect(() => {
        if (response.success) {
            setUserType('')
            setRoomsAvailable({})
        } else if (response.error) {
            setUserType('')
            setRoomsAvailable({})
            console.log(response.error)
        } else if (response.isPending) {
            console.log("loading...")
            // can I print the loading to the user too?
        }   
    }, [response.success, response.error])

    return(
        <>
            <h2>Type Of User Form</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span> User Type:</span>
                    <input
                        required
                        type="text"
                        onChange={(e) => setUserType(e.target.value)}
                        value={userType}
                    />
                </label>
                {/*Need that roomsAvailable will be a map and that each room selected from displauRoom
                will be added to that map as {roomNum: capacity} and only after he'll select all
                the rooms i'll add this userType*/}
                {rooms && <DisplayRooms 
                            rooms={rooms} 
                            roomsAvailable={roomsAvailable}
                            setRoomsAvailable={setRoomsAvailable}
                            />}
                <button>Add a user type</button>
            </form>
        </>       
    )
}
import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useCollection } from "../../hooks/useCollection"
import DisplayRooms from "../../components/DisplayRooms";

// firebase imports
import { db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";

export default function TypeOfUserForm({ user }) {
    const [userType, setUserType] = useState('')
    const [roomsAvailable, setRoomsAvailable] = useState({})
    //const { addDoc, response } = useFirestore('DateTimeRes')
    const { docs: rooms } = useCollection('Rooms')
    console.log("type of user form")

    const handleSubmit = async (event) => {
        event.preventDefault()

        const ref = collection(db, 'TypeOfUser')       

        await addDoc(ref, {
            // check for invalid data
            userType,
            // roomsAvailable will be a map - after the user selected the room by using DisplayRooms
            // we will need to add to a map the roomNum and roomCapacity that I saved in the DisplayRooms.
            // we can first ask for the user_type and then after each select room to add this to the
            // relevant doc into the map.
            roomsAvailable
        })

        setUserType('')
        setRoomsAvailable({})
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

    
    //TODO: front - get the RoomsAvailable as a list: let him select from all the options: 
    //show him all the rooms by DisplayRooms and let him select the relevant rooms and 
    //then press to send the list of rooms

    //I'll display to him rooms by display rooms - so i'll add to the map the roomNum 
    //and capacity that I have from the room he selected
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
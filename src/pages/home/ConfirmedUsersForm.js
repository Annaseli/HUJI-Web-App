import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useCollection } from "../../hooks/useCollection"

// firebase imports
import { db } from "../../firebase/config";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";

export default function ConfirmedUsersForm() {
    const [userType, setUserType] = useState('')
    const [email, setEmail] = useState('')
    //const { addDoc, response } = useFirestore('DateTimeRes')
    console.log("confirmed users form")

    const handleSubmit = async (event) => {
        event.preventDefault()

        const ref = collection(db, 'ConfirmedUsers')       

        // await addDoc(ref, {
        //     // check for invalid data
        //     uid,
        //     userType,
        //     // roomsAvailable will be a map - after the user selected the room by using DisplayRooms
        //     // we will need to add to a map the roomNum and roomCapacity that I saved in the DisplayRooms.
        //     // we can first ask for the user_type and then after each select room to add this to the
        //     // relevant doc into the map.
        //     resListFromCurDay
        // })

        await setDoc(doc(ref, email), {
            userType
        })

        setUserType('')
        setEmail('')
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
            <h2>Confirmed Users Form</h2>
            <form onSubmit={handleSubmit}>
            <label>
                <span> Email:</span>
                <input
                    required
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>
            <label>
                <span> User Type:</span>
                <input
                    required
                    type="text"
                    onChange={(e) => setUserType(e.target.value)}
                    value={userType}
                />
            </label>
            <button>Add a user</button>
            </form>
            </>
        
    )
}
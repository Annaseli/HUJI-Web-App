import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useCollection } from "../../hooks/useCollection"

// firebase imports
import { db } from "../../firebase/config";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";

export default function CenterContentForm() {
    const [contentType, setContentType] = useState('')
    const [content, setContent] = useState('')
    //const { addDoc, response } = useFirestore('DateTimeRes')
    console.log("Center Content Form")

    const handleSubmit = async (event) => {
        event.preventDefault()

        const ref = collection(db, 'CenterContent')       

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

        await addDoc(ref, {
            contentType,
            content
        })

        setContentType('')
        setContent('')
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
            <h2>Center Content Form</h2>
            <form onSubmit={handleSubmit}>
            <label>
                <span> Content Type:</span>
                <input
                    required
                    type="text"
                    onChange={(e) => setContentType(e.target.value)}
                    value={contentType}
                />
            </label>
            <label>
                <span> Content:</span>
                <input
                    required
                    type="text"
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                />
            </label>
            <button>Add content</button>
            </form>
            </>       
    )
}
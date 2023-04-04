import { useEffect, useState } from "react";
import { useFirestore } from "../hooks/useFirestore";

// firebase imports
import { db } from "../firebase/config";
import { doc } from "firebase/firestore";

export default function UsersForm({ uid }) {
    const [userType, setUserType] = useState('')
    const [resMapFromCurDay , setResMapFromCurDay] = useState({})
    const { setDocToFireStore, response } = useFirestore()
    console.log("users form")

    const handleSubmit = async (event) => {
        event.preventDefault()

        const ref = doc(db, "Users", uid)      
        await setDocToFireStore(ref, {
            userType,
            resMapFromCurDay
        }, { merge: false })
    }

    // without the useEffect the component renders infinitely 
    useEffect(() => {
        if (response.success) {
            setUserType('')
            setResMapFromCurDay([])
        } else if (response.error) {
            setUserType('')
            setResMapFromCurDay([])
            console.log(response.error)
        } else if (response.isPending) {
            console.log("loading...")
            // can I print the loading to the user too?
        }   
    }, [response.success, response.error])

    return(
        <>
            <h2>Users Form</h2>
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
            <button>Add a user</button>
            </form>
            </>
        
    )
}
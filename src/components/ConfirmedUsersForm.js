import { useEffect, useState } from "react";
import { useFirestore } from "../hooks/useFirestore";

// firebase imports
import { db } from "../firebase/config";
import { doc, collection } from "firebase/firestore";

export default function ConfirmedUsersForm() {
    const [userType, setUserType] = useState('')
    const [email, setEmail] = useState('')
    const { setDocToFireStore, response } = useFirestore()
    console.log("confirmed users form")

    const handleSubmit = async (event) => {
        event.preventDefault()

        const ref = doc(collection(db, 'ConfirmedUsers') , email)       
        await setDocToFireStore(ref, {
            userType
        }, { merge: false })       
    }

    // without the useEffect the component renders infinitely 
    useEffect(() => {
        if (response.success) {
            setUserType('')
            setEmail('')
        } else if (response.error) {
            setUserType('')
            setEmail('')
            console.log(response.error)
        } else if (response.isPending) {
            console.log("loading...")
            // can I print the loading to the user too?
        }   
    }, [response.success, response.error])
  
    // give only ~3 options for user type
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
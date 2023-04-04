import { useState, useEffect } from "react"
import { db, projectAuth } from "../firebase/config";
import { doc, getDoc, collection } from "firebase/firestore";
import { sendPasswordResetEmail  } from "firebase/auth";

// async function findEmail(uid) {
//     const docRef = doc(collection(db, "Users"), uid)
//     const docSnap = await getDoc(docRef)
//     const email = docSnap.data().email;
//     console.log(email)
//     return email
// }

// async function fetchData(uid) {
//     const docRef = doc(collection(db, "Users"), uid)
//     const docSnap = await getDoc(docRef)
//     const email = docSnap.data().email
//     console.log("email", email)
//     return email
// }

// Display user's reservations from current day
export default function ResetPassword({ uid }) {
    const [email, setEmail] = useState('')
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchData() {
            try {
                const docRef = doc(collection(db, "Users"), uid)
                const docSnap = await getDoc(docRef)
                setEmail(docSnap.data().email)
                console.log("email", email)
                if (!isCancelled) {
                    setError(null)
                }
            }
            catch(error) {
                if (!isCancelled) {
                    console.log(error.message)
                    setError(error.message)
                }            
            }                  
        }
        fetchData(); 
        return () => setIsCancelled(true)    
    }, [])

    try {
        email && sendPasswordResetEmail(projectAuth, email)
        // Password reset email sent.
        console.log("sent");
    } catch {
        // Error occurred. Inspect error.code and error.message for more details.
        console.log("error");
    }   
    

}
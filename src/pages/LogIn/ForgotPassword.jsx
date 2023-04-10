import { useState, useEffect } from "react"
import { db, projectAuth} from "../../firebase/config";
import { doc, getDoc, collection } from "firebase/firestore";
import { sendPasswordResetEmail  } from "firebase/auth";

// TODO - front & back: change this so the user will fill hus email for getting a reset link to his mail
// Display user's reservations from current day
export default function ForgotPassword({ uid }) {
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
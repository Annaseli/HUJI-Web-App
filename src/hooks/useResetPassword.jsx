import { useState, useEffect } from "react"
import { db, projectAuth } from "../firebase/config";
import { doc, getDoc, collection } from "firebase/firestore";
import { sendPasswordResetEmail  } from "firebase/auth";
import { getAuth } from "firebase/auth";

// TODO - front & back: change this so the user will fill hus email for getting a reset link to his mail
// Display user's reservations from current day
export default function useResetPassword(email) {
    const [error, setError] = useState(null)
    try {
        email && sendPasswordResetEmail(getAuth(), email)
        // Password reset email sent.
        console.log("sent");
    } catch(error) {
        // Error occurred. Inspect error.code and error.message for more details.
        console.log("error");
        setError(error.message)
    }

    return { error }
}
// Display user's reservations from current day

import { useCollection } from "../hooks/useCollection"
import { useState, useEffect } from "react"
import { db, projectAuth } from "../firebase/config";
import { doc, getDoc, collection, onSnapshot, query, where, getDocs } from "firebase/firestore";
import { getAuth, sendPasswordResetEmail, getUser  } from "firebase/auth";

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

export default function ResetPassword({ uid }) {

    console.log("uid", uid)
    const [email, setEmail] = useState('')

    useEffect(() => {
        async function fetchData() {
            const docRef = doc(collection(db, "Users"), uid)
            const docSnap = await getDoc(docRef)
            //const email = docSnap.data().email
            setEmail(docSnap.data().email)
            console.log("email", email)
            //return email;
        }
        //const email = fetchData();
        fetchData()
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
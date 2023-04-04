import { useEffect, useState } from "react";
import { db } from "../firebase/config";

// firebase imports
import { doc, getDoc } from "firebase/firestore";


export const useDoc = async (c, id) => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    const getUserInfo = async () => {
        setError(null)
        try {
            const ref = doc(db, c, id)
            const docSnap = await getDoc(ref)
            if (docSnap.exists) {
                setData(docSnap.data())
            } else {
                console.log('No such document!');
            }

            if (!isCancelled) {
                setError(null)
            } 

        } catch(error) {
            if (!isCancelled) {
                console.log(error.message)
                setError(error.message)
            }            
        }
    }

    useEffect(() => {
        getUserInfo()
        return () => setIsCancelled(true)
    }, [])

    return {data, error}
}

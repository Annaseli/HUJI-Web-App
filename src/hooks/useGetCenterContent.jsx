import { useState, useEffect } from "react"

// firebase
import { db } from "../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function useGetCenterContent(contentType) {
    console.log("useGetCenterContent")
    const [curContent, setCurContent] = useState([])
    const [isCancelled, setIsCancelled] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    useEffect( () => {
        async function fetchData() {
            setError(null)
            setIsPending(true)
            try {
                const docRef = query(collection(db, "CenterContent"),
                    where("contentType", "==", contentType));
                const querySnap = await getDocs(docRef)
                setCurContent(querySnap.docs.map(doc => doc.data().content))
                if (!isCancelled) {
                    setError(null)
                    setIsPending(false)
                }
            }
            catch(error) {
                if (!isCancelled) {
                    setError(error.message)
                    setIsPending(false)
                }
            }
        }
        fetchData();
        return () => setIsCancelled(true)
    }, [])

    return { curContent, error, isPending }
}
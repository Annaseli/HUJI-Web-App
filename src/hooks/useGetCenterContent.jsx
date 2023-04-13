import { useState, useEffect } from "react"
import { db } from "../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function useGetCenterContent(contentType) {
    console.log("useGetCenterContent")
    const [curContent, setCurContent] = useState([])
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)

    useEffect( () => {
        async function fetchData() {
            try {
                const docRef = query(collection(db, "CenterContent"), where("contentType", "==", contentType));
                const querySnap = await getDocs(docRef)
                const queryDoc = querySnap.docs[0]
                // const data = queryDoc.data();
                // setCurContent([data.content])
                setCurContent(querySnap.docs.map(doc => doc.data().content))
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

    return { curContent, error }
}
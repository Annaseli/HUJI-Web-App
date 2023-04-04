import { useState, useEffect } from "react"
import { db } from "../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";

// Display user's reservations from current day
export default function DisplayCenterContent({ contentType }) {
    const [content, setContent] = useState([])
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    console.log("DisplayCenterContent")

    //TODO: add a cleanup function
    useEffect(() => {
        async function fetchData() {       
            try {     
                const docRef = query(collection(db, "CenterContent"), where("contentType", "==", contentType));
                const querySnap = await getDocs(docRef)
                const queryDoc = querySnap.docs[0] 
                const data = queryDoc.data();
                setContent([...content, data.content])             
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

    console.log(content)
    return (
        <div>
        <h2>Display Center Content</h2>
            {content.map(key => (
                <div key={key}>
                    {key}
                </div>
            ))}
        </div>
    )   
}
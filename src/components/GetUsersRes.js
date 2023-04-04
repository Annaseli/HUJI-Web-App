import { useState, useEffect } from "react"
import { db } from "../firebase/config";
import { doc, getDoc, collection } from "firebase/firestore";

// Display user's reservations from current day
export default function GetUsersRes({ uid, resMapFromCurDay, setResMapFromCurDay }) {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
   
    useEffect(() => {
        async function fetchData() {
            try {
                console.log("DisplayUsersRes")
                const docRefInUsers = doc(collection(db, "Users"), uid); 
                const docInUsersSnap = await getDoc(docRefInUsers)
                if (docInUsersSnap.exists) {
                    const data = docInUsersSnap.data();
                    // const sortedRes = Object.keys(resMapFromCurDay).sort().reduce((objEntries, key) => {
                    //     objEntries[key] = resMapFromCurDay[key];                   
                    //     return objEntries;                 
                    //     }, {});
                    setResMapFromCurDay({...resMapFromCurDay, ...data.resMapFromCurDay})
                } else {
                    console.log('No such document!');
                }
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


    
}
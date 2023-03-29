// Display user's reservations from current day

import { useCollection } from "../hooks/useCollection"
import { useState, useEffect } from "react"
import { db } from "../firebase/config";
import { doc, getDoc, collection, onSnapshot, query, where, getDocs } from "firebase/firestore";

export default function DisplayUsersRes({ uid }) {

    const [resMapFromCurDay, setResMapFromCurDay] = useState({})

    
    //TODO: add a cleanup function
    useEffect(() => {
        async function fetchData() {
            console.log("DisplayUsersRes")
            const docRefInUsers = doc(collection(db, "Users"), uid);
            //console.log(docRefInUsers)  
            const docInUsersSnap = await getDoc(docRefInUsers)
            if (docInUsersSnap.exists) {
                const data = docInUsersSnap.data();
                setResMapFromCurDay({...resMapFromCurDay, ...data.resMapFromCurDay})
            } else {
                console.log('No such document!');
            }
        }
        fetchData();    
    }, [])

    console.log(resMapFromCurDay)
    return (
        <div>
        <h2>users reservations</h2>
            {Object.keys(resMapFromCurDay).map(key => (
                <div key={key}>
                    {key}
                </div>
            ))}
        </div>
    )

    
}
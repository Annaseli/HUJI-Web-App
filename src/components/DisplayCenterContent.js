// Display user's reservations from current day

import { useCollection } from "../hooks/useCollection"
import { useState, useEffect } from "react"
import { db } from "../firebase/config";
import { doc, getDoc, collection, onSnapshot, query, where, getDocs } from "firebase/firestore";

export default function DisplayCenterContent({ contentType }) {

    const [content, setContent] = useState([])

    //TODO: add a cleanup function
    useEffect(() => {
        async function fetchData() {
            console.log("DisplayCenterContent")
            const docRef = query(collection(db, "CenterContent"), where("contentType", "==", contentType));
            const querySnapshot = await getDocs(docRef)
            querySnapshot.forEach((d) => {
                const data = d.data();
                setContent([...content, data.content])
            })             
        }
        fetchData();    
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
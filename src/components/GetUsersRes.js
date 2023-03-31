// Display user's reservations from current day

import { useCollection } from "../hooks/useCollection"
import { useState, useEffect } from "react"
import { db } from "../firebase/config";
import { doc, getDoc, collection, onSnapshot, query, where, getDocs } from "firebase/firestore";

export default function GetUsersRes({ uid, resMapFromCurDay, setResMapFromCurDay }) {
   
    //TODO: add a cleanup function
    useEffect(() => {
        async function fetchData() {
            console.log("DisplayUsersRes")
            const docRefInUsers = doc(collection(db, "Users"), uid); 
            //console.log(docRefInUsers)  
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
        }
        fetchData();    
    }, [])


    
}
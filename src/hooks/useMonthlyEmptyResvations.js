import { useEffect, useState } from "react";
import { useFirestore } from "./useFirestore";
import { useCollection } from "./useCollection"

// firebase imports
import { db } from "../firebase/config";
import { doc, collection, addDoc, setDoc, updateDoc } from "firebase/firestore";

function range(start, end) {
    var ans = [];
    for (let i = start; i <= end; i++) {
        ans.push(i);
    }
    return ans;
}

export const useMonthlyEmptyResvations = ({ year, month, rooms}) => {
//export default function useMonthlyEmptyResvations({ year, month, rooms}) {
    //const { addDoc, response } = useFirestore('DateTimeRes')
    console.log("MonthlyEmptyResvations form")

    // when we have a successful response fire this function and reset it if it's true
    // useEffect(() => {
    //     if (response.success) {
    //         setDuration('')
    //         setCapacity('')
    //         setDate('')
    //         setTime('')
    //     }
    // }, [response.success])

    // useEffect(() => {
        
    // }, []) 

    async function fetchData() {
        // create a doc in the Reservations collection with id {year}{month}
        console.log("3")
        const resCollectionRef = collection(db, 'Reservations');
        const docYMRef = doc(resCollectionRef, `${year}${month}`);
        await setDoc(docYMRef, {})

        // create a collection inside the doc with the id {year}{month} that called {year}{month}Reservations
        const subCollectionYMRef = collection(docYMRef, `${year}${month}Reservations`);
        console.log("4")
        // create a doc for each day for the current month in the {year}{month}Reservations 
        // collection with id {year}{month}{day}
        range(1, 31).forEach(async (day) => {
            const docYMDRef = doc(subCollectionYMRef, `${year}${month}${day}`);
            await setDoc(docYMDRef, {})
            console.log("5")
            // create a collection inside the doc with the id {year}{month}{day} that called {year}{month}{day}Reservations
            const subCollectionYMDRef = collection(docYMDRef, `${year}${month}${day}Reservations`)

            rooms.forEach(async (room) => {
                const docRef = await addDoc(subCollectionYMDRef, {
                    roomNum: room.roomNum,
                    roomCapacity: room.capacity
                })
                
                range(8, 18).forEach(async (hour) => {
                    await updateDoc(docRef, {[hour]: {}})
                })                
            })
        }) 
    }
    fetchData();


    // return(
    //     <>
    //         <h2>MonthlyEmptyResvations Form</h2>
    //         <form onSubmit={handleSubmit}>
    //         <button>Create the subcollections</button>
    //     </form>
    //     </>
        
    // )
}
import { collection, doc, updateDoc } from "firebase/firestore";
import { range } from "lodash";
import { db } from "../firebase/config";
import { useFirestore } from "./useFirestore";
import { useEffect, useState } from 'react'

export const useCreateAnEmptyColl = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { addDocToFireStore, setDocToFireStore, updateDocInFireStore, response } = useFirestore()
    //const { dispatch } = useAuthContext()

    const createAnEmptyColl = async (year, month, rooms) => {
        setError(null)
        setIsPending(true)
        
        try {               
            console.log("create An Empty Coll")
            // create a doc in the Reservations collection with id {year}{month}
            const resCollectionRef = collection(db, 'Reservations');
            const docYMRef = doc(resCollectionRef, `${year}${month}`);
            await setDocToFireStore(docYMRef, {}, {})

            // create a collection inside the doc with the id {year}{month} that called {year}{month}Reservations
            const subCollectionYMRef = collection(docYMRef, `${year}${month}Reservations`);
            // create a doc for each day for the current month in the {year}{month}Reservations 
            // collection with id {year}{month}{day}
            range(1, 32).forEach(async (day) => {
                let dayToPlace = `${day}`
                if (day < 10) { 
                    dayToPlace = `0${day}`
                }
                const docYMDRef = doc(subCollectionYMRef, `${year}${month}${dayToPlace}`);
                await setDocToFireStore(docYMDRef, {}, {})
                // create a collection inside the doc with the id {year}{month}{day} that called {year}{month}{day}Reservations
                const subCollectionYMDRef = collection(docYMDRef, `${year}${month}${dayToPlace}Reservations`)

                rooms.forEach(async (room) => {
                    const docRef = await addDocToFireStore(subCollectionYMDRef, {
                        roomNum: room.roomNum,
                        roomCapacity: room.capacity
                    })
                    
                    range(8, 19).forEach(async (hour) => {
                        let hourToPlace = `${hour}`
                        if (hour < 10) {
                            hourToPlace = `0${hour}`
                        }
                        await updateDoc(docRef, {[hourToPlace]: {}})
                    })                
                })
            }) 
            
                // Any time we are using a hook that updates states in a component, we should use a clean up 
                // function in case that component that uses that hook unmaunts (going to other component in the middle of of the process)
                // update state
                if (!isCancelled) {
                    setIsPending(false)
                    setError(null)
                }  

        } catch(error) {
            if (!isCancelled) {
                console.log(error.message)
                setError(error.message)
                setIsPending(false)
            }            
        }
    }

    // If we use the useLogout hook in a component then the useEffect function will fire just once
    // because the dependency array is empty. Returning a cleanup function inside the useEffect.
    // setIsCancelled will be fired only when unmounted
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { createAnEmptyColl, response }
}

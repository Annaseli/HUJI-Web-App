import { useState, useEffect } from "react"
import { db } from "../firebase/config";
import { doc, getDoc, collection } from "firebase/firestore";
import {getUserReservations} from "./getUserReservations";

// Display user's reservations from current day
export const useGetUsersRes = (uid) => {
    console.log("useGetUsersRes")
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [userReservations, setUserReservations] = useState({})
    let userRes = []
    let noData = true

    useEffect(() => {
        async function fetchData() {
            try {
                // const docRefInUsers = doc(collection(db, "Users"), uid);
                // const docInUsersSnap = await getDoc(docRefInUsers)
                // if (docInUsersSnap.exists()) {
                //     const data = docInUsersSnap.data();
                //     setUserReservations({...userReservations, ...data.userReservations})
                // } else {
                //     console.log('No such document!');
                // }
                const res  = await getUserReservations(uid)
                setUserReservations(res)
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

    console.log("userReservations", userReservations)
    if (Object.keys(userReservations).length !== 0) {
        noData = false
        Object.keys(userReservations).forEach(res => {
            userRes.push({
                id: res,
                uid: uid,
                room: userReservations[res]['roomNum'],
                date: new Date(userReservations[res]['year'] + '-' + userReservations[res]['month'] + '-' + userReservations[res]['day']),
                startHour: userReservations[res]['startHour'],
                endHour: userReservations[res]['endHour'],
                peopleNum: userReservations[res]['peopleNum']
            })
        })
    }
    console.log("userRes, noData", userRes, noData)
    return { userRes, userReservations, noData, error }
}
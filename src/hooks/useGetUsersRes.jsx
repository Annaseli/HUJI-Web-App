import { useState, useEffect } from "react"
import { db } from "../firebase/config";
import { doc, getDoc, collection } from "firebase/firestore";

// Display user's reservations from current day
export const useGetUsersRes = (uid) => {
    console.log("useGetUsersRes")
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [resMapFromCurDay, setResMapFromCurDay] = useState({})
    let usersReservations = []
    let noData = true

    useEffect(() => {
        async function fetchData() {
            try {
                const docRefInUsers = doc(collection(db, "Users"), uid);
                const docInUsersSnap = await getDoc(docRefInUsers)
                if (docInUsersSnap.exists) {
                    const data = docInUsersSnap.data();
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

    if (Object.keys(resMapFromCurDay).length !== 0) {
        noData = false
        Object.keys(resMapFromCurDay).forEach(res => {
            usersReservations.push({
                id: res,
                uid: uid,
                room: resMapFromCurDay[res]['roomNum'],
                date: new Date(resMapFromCurDay[res]['year'] + '-' + resMapFromCurDay[res]['month'] + '-' + resMapFromCurDay[res]['day']),
                startHour: resMapFromCurDay[res]['startHour'],
                endHour: resMapFromCurDay[res]['endHour'],
                peopleNum: resMapFromCurDay[res]['peopleNum']
            })
        })
    }

    return { usersReservations, resMapFromCurDay, noData, error }
}
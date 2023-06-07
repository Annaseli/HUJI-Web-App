import { useState, useEffect } from "react"
import getUserReservations from "./getUserReservations";

export default function useGetUsersRes(uid) {
    console.log("useGetUsersRes")
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [userReservations, setUserReservations] = useState({})
    let userRes = []
    let noData = true

    useEffect(() => {
        async function fetchData() {
            setError(null)
            setIsPending(true)
            try {
                const res  = await getUserReservations(uid)
                setUserReservations(res)
                if (!isCancelled) {
                    setError(null)
                    setIsPending(false)
                }
            }
            catch(error) {
                if (!isCancelled) {
                    setError(error.message)
                    setIsPending(false)
                }
            }
        }
        fetchData();
        return () => setIsCancelled(true)
    }, [])

     if (userReservations && Object.keys(userReservations).length !== 0) {
        noData = false
        Object.keys(userReservations).forEach(res => {
            userRes.push({
                id: res,
                uid: uid,
                //roomNum: userReservations[res]["roomNum"],
                room: userReservations[res]["roomTitle"],
                date: new Date(userReservations[res]["year"] + '-' + userReservations[res]["month"] + '-'
                    + userReservations[res]["day"]),
                startHour: userReservations[res]["startHour"],
                endHour: userReservations[res]["endHour"],
                peopleNum: userReservations[res]["peopleNum"]
            })
        })
    }
    return { userRes, userReservations, noData, error, isPending }
}
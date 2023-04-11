import { useEffect, useState } from "react";
import { getDocRefFromReservations } from "./getDocRefFromReservations";
import { useFirestore } from "../../hooks/useFirestore";

// firebase imports
import { db } from "../../firebase/config";
import { doc, getDoc, updateDoc, setDoc, collection } from "firebase/firestore";

//TODO - front: fix the dates that pass here
export default function confirmReservation(uid, capacity, duration, date, startTime, selectedRoomNum) {
    console.log("reservation form")
    //const { setDocToFireStore, updateDocInFireStore, response } = useFirestore()


    const year = '2023'//date.y
    const monthRead = '4'//date.M + 1
    const dayRead = '11'//date.D

    let day = dayRead
    if (parseInt(dayRead) < 10){
        day = `0${dayRead}`
    }
    let month = monthRead
    if (parseInt(monthRead) < 10){
        month = `0${monthRead}`
    }
    let time = startTime
    if (parseInt(startTime) < 10){
        time = `0${startTime}`
    }

    const resId = year + month + day + time + selectedRoomNum

    async function addResToReservations() {
        const { docRef } = await getDocRefFromReservations(year, month, day, selectedRoomNum)

        for (let i = 0; i < parseInt(duration); i++) {
            const hourToRead = parseInt(startTime)
            let hourToPlace = `${hourToRead + i}`
            if (hourToRead + i < 10){
                hourToPlace = `0${hourToRead + i}`
            }
            const updateMap = {
                [hourToPlace]: {resId: resId, uid: uid, checkedIn: false}
            }
            await updateDoc(docRef, updateMap)
        }
    }

    async function addResToUsers() {
        const docRef = doc(collection(db, "Users"), uid)

        const updateMap = {
            [resId]: {
                year: year,
                month: month,
                day: day,
                duration: duration,
                roomNum: selectedRoomNum
            }
        };

        await setDoc(docRef, {
            resMapFromCurDay: updateMap
        }, { merge: true });
    }

    addResToReservations()
    addResToUsers()

    // without the useEffect the component renders infinitely
    // useEffect(() => {
    //     if (response.success) {
    //         console.log(response.success)
    //     } else if (response.error) {
    //         console.log(response.error)
    //     } else if (response.isPending) {
    //         console.log("loading...")
    //         // can I print the loading to the user too?
    //     }
    // }, [response])

}
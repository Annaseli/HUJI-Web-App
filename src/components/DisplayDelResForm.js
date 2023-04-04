import { useEffect, useState } from "react";
import { useFirestore } from "../hooks/useFirestore";
import GetUsersRes from "./GetUsersRes";
import { getDocRefFromReservations } from "./getDocRefFromReservations";
import { getDurationOfRes } from "./getDurationOfRes";
import { getCheckInCodeFromRoom } from "./getCheckInCodeFromRoom";

// firebase imports
import { db } from "../firebase/config";
import { collection, doc, deleteField } from "firebase/firestore";

function parseResId(resId) {
    const year = resId.substring(0, 4)
    const month = resId.substring(4, 6)
    const day = resId.substring(6, 8)
    const hour = parseInt(resId.substring(8, 10))
    const selectedRoomNum = resId.substring(10, 11)
    return {year, month, day, hour, selectedRoomNum}
}

export default function DisplayDelResForm({ uid, displayCheckIn=true }) {
    const [resMapFromCurDay, setResMapFromCurDay] = useState({})
    const [checkIn, setCheckIn] = useState('')
    const { setDocToFireStore, updateDocInFireStore, response } = useFirestore()
    console.log("Display Del Users Res Form")

    const handleSubmitDelete = async (event) => {
        event.preventDefault()

        const resId = event.target.id
        const {year, month, day, hour, selectedRoomNum} = parseResId(resId)

        const docRefUser = doc(collection(db, "Users"), uid)
        const duration = await getDurationOfRes(docRefUser, resId);

        // delete reservation from Users
        await updateDocInFireStore(docRefUser, {
            [`resMapFromCurDay.${resId}`]: deleteField()
        });
          
        // delete reservation from Reservations
        const { docRef: docRefRes } = await getDocRefFromReservations(year, month, day, selectedRoomNum)
        console.log("docRefRes", docRefRes)
        for(let i = 0; i < duration; i++) {
            await setDocToFireStore(docRefRes, {
                [hour + i]: {}
            }, { merge: true });
        }
    }

    const handleSubmitCheckIn = async (event) => {
        event.preventDefault()
        const resId = event.target.id
        const {year, month, day, hour, selectedRoomNum} = parseResId(resId)

        // If the check in code is similar to the room's code and the time the user sent it is 15 mins before 
        // his reservation time and max {duration + 15} time after, we'll set the checkedIn in this reservation (maybe delete if from the list later).
        // Either way leting him know
        const checkInCodeFromRoom = await getCheckInCodeFromRoom(selectedRoomNum)

        const docRefUser = doc(collection(db, "Users"), uid)
        const duration = await getDurationOfRes(docRefUser, resId);
        
        const curDate = new Date().toLocaleString('en-GB')
        const curHour = curDate.substring(12, 14);
        const curMinute = curDate.substring(15, 17);
        
        const checkedInEarly = (curHour == hour - 1 && curMinute > 44 && curMinute <= 59)
        const checkedInLate = (curHour > hour - 1 && curHour < hour + duration)
     
        // TODO: in production delete the true
        if (parseInt(checkIn) === checkInCodeFromRoom && (true || checkedInEarly || checkedInLate)) {
            const { docRef: docRefRes } = await getDocRefFromReservations(year, month, day, selectedRoomNum)
            for(let i = 0; i < duration; i++) {
                await setDocToFireStore(docRefRes, {
                    [hour + i]: {"checkedIn": false}
                }, { merge: true });
            }
        }      
    }

    // without the useEffect the component renders infinitely 
    useEffect(() => {
        if (response.success) {
            setCheckIn('')
        } else if (response.error) {
            setCheckIn('')
            console.log(response.error)
        } else if (response.isPending) {
            console.log("loading...")
            // can I print the loading to the user too?
        }   
    }, [response.success, response.error])
    
    return(
        <>
            <h2>DisplayDelResForm</h2> 
            {<GetUsersRes uid={uid} resMapFromCurDay={resMapFromCurDay} setResMapFromCurDay={setResMapFromCurDay} />}
            {resMapFromCurDay && Object.keys(resMapFromCurDay).map(key => (
                <div key={key}>
                    {key}
                    <form onSubmit={handleSubmitDelete} id={key}>                       
                        <button>Delete Reservation</button>
                    </form>
                    {displayCheckIn && <form onSubmit={handleSubmitCheckIn} id={key}>  
                        <label>
                            <span> Check In Code:</span>
                            <input
                                type="text"
                                onChange={(e) => setCheckIn(e.target.value)}
                                value={checkIn}
                            />
                        </label>                     
                        <button>Check In</button>
                    </form>}
                </div>
            ))}
        </>        
    )
}
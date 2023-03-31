import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useCollection } from "../../hooks/useCollection"
import GetUsersRes from "../../components/GetUsersRes";

// firebase imports
import { db } from "../../firebase/config";
import { collection, addDoc, deleteDoc, doc, setDoc, deleteField , updateDoc, query, where, getDocs, getDoc  } from "firebase/firestore";

export default function DisplayDelUsersResForm({ uid }) {
    //const [resId, setUid] = useState('')
    const [resMapFromCurDay, setResMapFromCurDay] = useState({})
    const [checkIn, setCheckIn] = useState('')
    console.log("Delete Form")

    async function getRefInReservation(year, month, day, selectedRoomNum) {
        const docRefOfYearMonth = doc(collection(db, "Reservations"), `${year}${month}`)
        const docRefOfYearMonthDay = doc(collection(docRefOfYearMonth, `${year}${month}Reservations`), `${year}${month}${day}`)
        const collectionRef = collection(docRefOfYearMonthDay, `${year}${month}${day}Reservations`)
        const docRefOfYearMonthDayRoom = query(collectionRef, where("roomNum", "==", `${selectedRoomNum}`))
        const querySnapshot = await getDocs(docRefOfYearMonthDayRoom)
        const queryDoc = querySnapshot.docs[0] 
        const docRefRes = doc(collectionRef, queryDoc.id)
        return docRefRes
    }

    async function getDuration(docRefUser) {
        
        const docSnap = await getDoc(docRefUser)
        if (docSnap.exists) {
            const data = docSnap.data();
            const duration = data.duration;
            return duration
        } else {
            console.log('No such document!');
        }
    }

    const handleSubmitDelete = async (event) => {
        event.preventDefault()
        const resId = event.target.id
        const year = resId.substring(0, 4)
        const month = resId.substring(4, 6)
        const day = resId.substring(6, 7)
        const hour = parseInt(resId.substring(7, 9))
        const selectedRoomNum = resId.substring(9, 10)

        const docRefUser = doc(collection(db, "Users"), uid)
        // delete reservation from Users
        let duration = 2//await getDuration(docRefUser);

        await updateDoc(docRefUser, {
            [`resMapFromCurDay.${resId}`]: deleteField()
        });
          
        // delete reservation from Reservations
        const docRefRes = getRefInReservation(year, month, day, selectedRoomNum)
        for(let i = 0; i < duration; i++) {
            await setDoc(docRefRes, {
                [hour + i]: {}
            }, { merge: true });
        }
    }

    const handleSubmitCheckIn = async (event) => {
        event.preventDefault()
        const resId = event.target.id
        const year = resId.substring(0, 4)
        const month = resId.substring(4, 6)
        const day = resId.substring(6, 7)
        const hour = parseInt(resId.substring(7, 9))
        const selectedRoomNum = resId.substring(9, 10)
        console.log("resId", resId);

        // If the check in code is similar to the room's code and the time the user sent it is 15 mins before 
        // his reservation time and max {duration + 15} time after, we'll set the checkedIn in this reservation (maybe delete if from here later).
        // Either way leting him know
        const collectionRef = collection(db, "Rooms")
        const docRef = query(collectionRef, where("roomNum", "==", `${selectedRoomNum}`))
        const querySnapshot = await getDocs(docRef)
        const queryDoc = querySnapshot.docs[0] 
       // const docRefRooms = doc(collectionRef, queryDoc.id)
        const checkInCodeFromRoom = queryDoc.data().checkIn;
        console.log("checkInCodeFromRoom", typeof checkInCodeFromRoom);

        const docRefUser = doc(collection(db, "Users"), uid)
        let duration = 2//await getDuration(docRefUser);
        console.log("duration", duration);
        

        const curDate = new Date().toLocaleString('en-GB')
        const curYear = curDate.substring(6, 10);
        console.log("curYear", year);
        const curMonth = curDate.substring(3, 5);
        console.log("curMonth", month);
        const curDay = curDate.substring(0, 2);
        console.log("curDay", day);
        const curHour = curDate.substring(12, 14);
        console.log("curHour", hour);
        const curMinute = curDate.substring(15, 17);
        console.log("curMinute", curMinute);
        
        const checkedInEarly = (curHour == hour - 1 && curMinute > 44 && curMinute <= 59)
        const checkedInLate = (curHour > hour - 1 && curHour < hour + duration)

        
        // TODO: after debug delete the true
        if (parseInt(checkIn) === checkInCodeFromRoom && (true || checkedInEarly || checkedInLate)) {
            const docRefRes = await getRefInReservation(year, month, day, selectedRoomNum)
            console.log("docRefRes", docRefRes);
            for(let i = 0; i < duration; i++) {
                await setDoc(docRefRes, {
                    [hour + i]: {"checkedIn": false}
                }, { merge: true });
            }
        }

        setCheckIn('')
    }

    // when we have a successful response fire this function and reset it if it's true
    // useEffect(() => {
    //     if (response.success) {
    //         setDuration('')
    //         setCapacity('')
    //         setDate('')
    //         setTime('')
    //     }
    // }, [response.success])

    
    return(
        <>
            <h2>DisplayDelUsersResForm</h2>
            {<GetUsersRes uid={uid} resMapFromCurDay={resMapFromCurDay} setResMapFromCurDay={setResMapFromCurDay} />}
            {resMapFromCurDay && Object.keys(resMapFromCurDay).map(key => (
                <div key={key}>
                    {key}
                    <form onSubmit={handleSubmitDelete} id={key}>                       
                        <button>Delete Reservation</button>
                    </form>
                    <form onSubmit={handleSubmitCheckIn} id={key}>  
                        <label>
                            <span> Check In Code:</span>
                            <input
                                type="text"
                                onChange={(e) => setCheckIn(e.target.value)}
                                value={checkIn}
                            />
                        </label>                     
                        <button>Check In</button>
                    </form>
                </div>
            ))}

        </>        
    )
}
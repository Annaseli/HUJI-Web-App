import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";

// firebase imports
import { db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";

export default function ReservationForm({ uid }) {
    const [duration, setDuration] = useState('')
    const [capacity, setCapacity] = useState('')
    const [year, setYear] = useState('')
    const [month, setMonth] = useState('')
    const [day, setDay] = useState('')
    const [time, setTime] = useState('')
    const [selectedRoomNum, setSelectedRoomNum] = useState('')
    console.log("reservation form")

    const handleSubmit = async (event) => {
        event.preventDefault()

        //TODO: add a cleanup function
        //TODO: how to make the component to be re-created so roomsAv would be new Obj and new set. otherwise it's the previous one.
        //TODO: need a way to use the roomsAv that was calculated in the previous components and pass it here
        useEffect(() => {
            async function fetchData() {                    
                // for the given date and time, find all the rooms that are available         
                const docRefOfYearMonth = doc(collection(db, "Reservations"), `${year}${month}`)
                const docRefOfYearMonthDay = doc(collection(docRefOfYearMonth, `${year}${month}Reservations`), `${year}${month}${day}`)
                const docRefOfYearMonthDayRoom = query(collection(docRefOfYearMonthDay, `${year}${month}${day}Reservations`), where("roomNum", "==", `${selectedRoomNum}`))
                const querySnapshot = await getDocs(docRefOfYearMonthDayRoom)
                let resByHours;
                querySnapshot.forEach((d) => {  
                    const data = d.data();
                    resByHours = data.resByHours;                                         
                })  

                const resId = `${year}${month}${day}${selectedRoomNum}${time}`

                let updateMap = {
                    resByHours: {
                        {time}: {{resId}: [uid, dateTimeCreated, checkedIn]}
                    }
                  };

                await updateDoc(documentRef, updateMap)


                Object.keys(roomsAvailableByCapacity).forEach(async (roomNum) => {
                    
                         
                    let roomIsAv = true  
                    for (let i = 0; i < duration; i++) {
                        // this hour is available             
                        if (Object.keys(resByHours[parseInt(hour) + i]).length !== 0) {
                            roomIsAv = false  
                            break 
                        } 
                    }
                    if (roomIsAv){
                        addKeyValuePair(roomNum, roomCapacity)
                    }
                })
            }
            fetchData();   
        }, [])

        await addDoc(ref, {
            // check for invalid data
            duration,
            capacity,
            date,
            time,
            selectedRoomNum,
            uid
        })

        setDuration('')
        setCapacity('')
        setDate('')
        setTime('')
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


    //TODO: get the selectedRoomNum from the form by selecting it from all the options
    return(
        <>
            <h2>Reservation Form</h2>
            <form onSubmit={handleSubmit}>
            <label>
                <span> Num of people:</span>
                <input
                    required
                    type="num"
                    onChange={(e) => setCapacity(e.target.value)}
                    value={capacity}
                />
            </label>
            <label>
                <span> Duration:</span>
                <input
                    required
                    type="num"
                    onChange={(e) => setDuration(e.target.value)}
                    value={duration}
                />
            </label>
            <label>
                <span> Year:</span>
                <input
                    required
                    type="num"
                    onChange={(e) => setYear(e.target.value)}
                    value={year}
                />
            </label>
            <label>
                <span> Month:</span>
                <input
                    required
                    type="num"
                    onChange={(e) => setMonth(e.target.value)}
                    value={month}
                />
            </label>
            <label>
                <span> Day:</span>
                <input
                    required
                    type="num"
                    onChange={(e) => setDay(e.target.value)}
                    value={day}
                />
            </label>
            <label>
                <span> Time:</span>
                <input
                    required
                    type="time"
                    onChange={(e) => setTime(e.target.value)}
                    value={time}
                />
            </label>
            <label>
                <span> Room:</span>
                <input
                    required
                    type="num"
                    onChange={(e) => setSelectedRoomNum(e.target.value)}
                    value={selectedRoomNum}
                />
            </label>
            <button>Reserve a room</button>
        </form>
        </>
        
    )
}
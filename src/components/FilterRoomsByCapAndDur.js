import { useCollection } from "../hooks/useCollection"
import { useState, useEffect } from "react"
import { db } from "../firebase/config";
import { doc, getDoc, collection, onSnapshot, query, where, getDocs, limit } from "firebase/firestore";

export default function FilterRoomsByCapAndDur({ uid, capacity, duration, year, month, roomsAvailable }) {
    const [roomsAv, setRoomsAv] = useState({})
    const [datesAv, setDatesAv] = useState([])

    const addKeyValuePair = (key, value) => {
        setRoomsAv(prevState => ({
          ...prevState,
          [key]: value
        }));
    };

    const addValToArr = (value) => {
        setDatesAv(prevState => ({
          ...prevState,
          value
        }));
    };
    
    //TODO: add a cleanup function
    useEffect(() => {
        async function fetchData() {
            console.log("FilterRooms2")  
            // filter out rooms that their capacity is less then the given capacity
            // let roomsAvailableByCapacity = new Map()
            // Object.keys(roomsAvailable).forEach((roomNum) => {
            //     const roomCapacity = roomsAvailable[roomNum]
            //     if (roomCapacity >= capacity){
            //         roomsAvailableByCapacity.set(roomNum, roomCapacity)
            //     }
            // })

            // for each day in the given month, for each available room, find all the hours that are available
            const docRefOfYearMonth = doc(collection(db, "Reservations"), `${year}${month}`)
            const day = "1"
            const docRefOfYearMonthDay = doc(collection(docRefOfYearMonth, `${year}${month}Reservations`), `${year}${month}${day}`)
            const room = "1"
            const docRefOfYearMonthDayRoom = query(collection(docRefOfYearMonthDay, `${year}${month}${day}Reservations`), where("roomNum", "==", room))
            const querySnapshot = await getDocs(docRefOfYearMonthDayRoom)
            let roomCapacity;
            let resByHours;
            querySnapshot.forEach((d) => {
                const data = d.data();
                roomCapacity = data.roomCapacity;
                resByHours = data.resByHours;
                              
            })
            console.log(roomCapacity)
            console.log(resByHours)
            let durationCounter = 0
            Object.keys(resByHours).forEach((hour) => {
                // this hour is available
                if (hour.size === 0) {
                    durationCounter++
                    if (durationCounter == duration){
                        addKeyValuePair(room, roomCapacity)
                        addValToArr(`${day}/${month}/${year}`)
                        return
                    } 
                } else {
                    durationCounter = 0
                }
            })

            // if (docSnap.exists) {
            //     const data = docSnap.data();
            //     const resByHours = data.resByHours;
            //     const roomCapacity = data.roomCapacity;
            //     console.log(roomCapacity)
            //     let durationCounter = 0
                // Object.keys(resByHours).forEach((hour) => {
                //     // this hour is available
                //     if (hour.size === 0) {
                //         durationCounter++
                //         if (durationCounter == duration){
                //             addKeyValuePair(room, roomCapacity)
                //             addValToArr(`${day}/${month}/${year}`)
                //             return
                //         } 
                //     } else {
                //         durationCounter = 0
                //     }
                // })
            // } else {
            //     console.log('No such document!');
            // }                 
        }
        fetchData();    
    }, [])
    return (
        <div>
        <h2>roomsAvailable And datesAvailable</h2>
            {/* {Object.keys(roomsAv).map(key => (
                <div key={key}>
                    {key}: {roomsAv[key]}
                </div>
            ))} */}
            {datesAv.map(date => (
                <div>
                    {date}
                </div>
            ))}
        </div>
    )  
}
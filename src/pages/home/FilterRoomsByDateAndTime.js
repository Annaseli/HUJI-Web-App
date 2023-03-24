import { useCollection } from "../hooks/useCollection"
import { useState, useEffect } from "react"
import { db } from "../firebase/config";
import { doc, getDoc, collection, onSnapshot, query, where, getDocs, limit } from "firebase/firestore";
import { useMyState } from "../hooks/useMyState";

export default function FilterRoomsByDateAndTime({ uid, capacity, duration, year, month, day, hour, roomsAvailable }) {
    const [roomsAv, setRoomsAv] = useState({}) 
 
    const addKeyValuePair = (key, value) => { 
        setRoomsAv(prevState => ({...prevState, [key]: value}));
    };
    
    //TODO: add a cleanup function
    //TODO: how to make the component to be re-created so roomsAv would be new Obj and new set. otherwise it's the previous one.
    //TODO: need a way to use the roomsAv that was calculated in the previous components and pass it here
    useEffect(() => {
        async function fetchData() {
            console.log("FilterRooms4")     
            // filter out rooms that their capacity is less then the given capacity
            let roomsAvailableByCapacity = {}
            Object.keys(roomsAvailable).forEach((roomNum) => {
                const roomCapacity = roomsAvailable[roomNum]             
                if (roomCapacity >= capacity){ 
                    roomsAvailableByCapacity[roomNum] = roomCapacity
                }
            })  
            
            // for the given date and time, find all the rooms that are available         
            const docRefOfYearMonth = doc(collection(db, "Reservations"), `${year}${month}`)
            const docRefOfYearMonthDay = doc(collection(docRefOfYearMonth, `${year}${month}Reservations`), `${year}${month}${day}`)
            Object.keys(roomsAvailableByCapacity).forEach(async (roomNum) => {
                const docRefOfYearMonthDayRoom = query(collection(docRefOfYearMonthDay, `${year}${month}${day}Reservations`), where("roomNum", "==", `${roomNum}`))
                const querySnapshot = await getDocs(docRefOfYearMonthDayRoom)
                let roomCapacity;  
                let resByHours;
                querySnapshot.forEach((d) => {  
                    const data = d.data();
                    roomCapacity = data.roomCapacity;
                    resByHours = data.resByHours;                                         
                })       
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

    console.log("roomsAv:", roomsAv)     
 
    return (
        <div>
        <h2>roomsAvailable for a Given Date And Time</h2>
            {/* {Object.keys(roomsAv).map(key => (
                <div key={key}>
                    {key}: {roomsAv[key]}
                </div>
            ))} */}
            {/* {datesAv.map(date => (
                <div key={date}>
                    {date}
                </div>
            ))} */}
        </div>
    )  
}
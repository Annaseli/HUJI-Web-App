import { useCollection } from "../hooks/useCollection"
import { useState, useEffect } from "react"
import { db } from "../firebase/config";
import { doc, getDoc, collection, onSnapshot, query, where, getDocs, limit } from "firebase/firestore";
import { useMyState } from "../hooks/useMyState";

export default function FilterRoomsByDate({ uid, capacity, duration, year, month, day, roomsAvailable }) {
    const [roomsAv, setRoomsAv] = useState({}) 
    const [hoursAv, setHoursAv] = useState(new Set()) 

    const addKeyValuePair = (key, value) => { 
        setRoomsAv(prevState => ({...prevState, [key]: value}));
    };

    const addValToArr = (value) => {
        setHoursAv(prevState => new Set([...prevState, value])) 
    };

    function range(start, end) {
        var ans = [];
        for (let i = start; i <= end; i++) {
            ans.push(i);
        }
        return ans;
    }
    
    //TODO: add a cleanup function
    //TODO: how to make the component to be re-created so roomsAv and hoursAv would be new Obj and new set. otherwise it's the previous one.
    //TODO: need a way to use the roomsAv that was calculated in the previous components and pass it here
    useEffect(() => {
        async function fetchData() {
            console.log("FilterRooms3")     
            // filter out rooms that their capacity is less then the given capacity
            let roomsAvailableByCapacity = {}
            Object.keys(roomsAvailable).forEach((roomNum) => {
                const roomCapacity = roomsAvailable[roomNum]
                
                if (roomCapacity >= capacity){ 
                    roomsAvailableByCapacity[roomNum] = roomCapacity
                }
            })
            console.log("roomsAvailableByCapacity:", roomsAvailableByCapacity)    
            
            // for the given date, for each available room, find all the hours that are available         
            const docRefOfYearMonth = doc(collection(db, "Reservations"), `${year}${month}`)
            const docRefOfYearMonthDay = doc(collection(docRefOfYearMonth, `${year}${month}Reservations`), `${year}${month}${day}`)
            Object.keys(roomsAvailableByCapacity).forEach(async (roomNum) => {
                const docRefOfYearMonthDayRoom = query(collection(docRefOfYearMonthDay, `${year}${month}${day}Reservations`), where("roomNum", "==", `${roomNum}`))
                const querySnapshot = await getDocs(docRefOfYearMonthDayRoom)
                const queryDoc = querySnapshot.docs[0] 
                const data = queryDoc.data();
                const roomCapacity = data.roomCapacity; 
                
                // find all the possible hours from which there are {duration} hours available in roomNum room in that date
                const hours = range(8, 18)
                let firstHourAvailable
                let lastHourAvailable      
                let i = 0
                let findFirst = true
 
                while (i < hours.length) {   
                    console.log("findFirst:", findFirst)                         
                    if (Object.keys(data[hours[i]]).length === 0 && (i !== (hours.length - 1))) {                         
                        if (findFirst){
                            firstHourAvailable = parseInt(hours[i])
                            findFirst = false
                        }                                        
                    } else {
                        console.log("else:")  
                        if (!findFirst) {
                            lastHourAvailable = parseInt(hours[i])
                            let compareTo = parseInt(duration)
                            // if last hour is empty
                            if (Object.keys(data[hours[hours.length - 1]]).length === 0){
                                compareTo--
                            } 
                            while (lastHourAvailable - firstHourAvailable >= compareTo){
                                addValToArr(`${firstHourAvailable}`) 
                                addKeyValuePair(roomNum, roomCapacity)
                                firstHourAvailable++
                            }
                            findFirst = true
                        }                    
                    }
                    i++
                }
            })
        }
        fetchData();   
    }, [])

    console.log("roomsAv:", roomsAv)    
    console.log("hoursAv:", hoursAv)   
 
    return (
        <div>
        <h2>roomsAvailable And hoursAvailable</h2>
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
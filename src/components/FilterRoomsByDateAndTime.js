import { useState, useEffect } from "react"
import { getDocRefFromReservations } from "./getDocRefFromReservations";

export default function FilterRoomsByDateAndTime({ duration, year, month, day, hour, roomsAvailable, setRoomsAvailable }) {
    const [roomsAv, setRoomsAv] = useState({})  
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    let roomsAvailableByCapacity = roomsAvailable
 
    const addKeyValuePair = (key, value) => { 
        setRoomsAv(prevState => ({...prevState, [key]: value}));
    }
    
    //TODO: add a cleanup function
    //TODO: how to make the component to be re-created so roomsAv would be new Obj and new set. otherwise it's the previous one.
    //TODO: need a way to use the roomsAv that was calculated in the previous components and pass it here
    useEffect(() => {
        async function fetchData() {
            try {
                console.log("FilterRooms4")                    
                // for the given date and time, find all the rooms that are available                        
                Object.keys(roomsAvailableByCapacity).forEach(async (roomNum) => {
                    const { data } = await getDocRefFromReservations(year, month, day, roomNum)
                    const roomCapacity = data.roomCapacity; 
                    let roomIsAv = true  
                    for (let i = 0; i < duration; i++) {
                        // this hour is available          
                        if (Object.keys(data[parseInt(hour) + i]).length !== 0) {                     
                            roomIsAv = false  
                            break 
                        } 
                    }
                    if (roomIsAv){
                        addKeyValuePair(roomNum, roomCapacity)
                    }
                })
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

    //setRoomsAvailable(roomsAv)  
 
    return (
        <div>
        <h2>roomsAvailable for a Given Date And Time</h2>
            {Object.keys(roomsAv).map(key => (
                <div key={key}>
                    {key}: {roomsAv[key]}
                </div>
            ))}
            {/* {datesAv.map(date => (
                <div key={date}>
                    {date}
                </div>
            ))} */}
        </div>
    )  
}
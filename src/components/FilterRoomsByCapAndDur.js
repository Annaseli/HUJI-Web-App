import { range } from "lodash";
import { useState, useEffect } from "react"
import { getDocRefFromReservations } from "./getDocRefFromReservations";

export default function FilterRoomsByCapAndDur({ capacity, duration, year, month, roomsAvailable, setRoomsAvailable }) {
    const [roomsAv, setRoomsAv] = useState({}) 
    const [datesAv, setDatesAv] = useState(new Set())  
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)

    // filter out rooms that their capacity is less then the given capacity
    let roomsAvailableByCapacity = {}
    Object.keys(roomsAvailable).forEach((roomNum) => {
        const roomCapacity = roomsAvailable[roomNum]       
        if (roomCapacity >= capacity){ 
            roomsAvailableByCapacity[roomNum] = roomCapacity
        }
    }) 
    
    useEffect(() => {
        async function fetchData() {
            try {
                console.log("FilterRooms2")                 
                // for each day in the given month, for each available room, find all the hours that are available         
                range(1, 31).forEach(async (day) => {               
                    Object.keys(roomsAvailableByCapacity).forEach(async (roomNum) => {
                        const { data } = await getDocRefFromReservations(year, month, day, roomNum)
                        const roomCapacity = data.roomCapacity;                     
                        let durationCounter = 0
                        const hours = range(8, 18)    
                        for (let i = 0; i < hours.length; i++) {
                            // this hour is available                                     
                            if (Object.keys(data[hours[i]]).length === 0) {                             
                                durationCounter++
                                if (durationCounter == duration){
                                    setRoomsAv(prevState => ({...prevState, [roomNum]: roomCapacity}));
                                    setDatesAv(prevState => new Set([...prevState, `${day}/${month}/${year}`])); 
                                    break 
                                } 
                            } else {
                                durationCounter = 0 
                            }
                        }                   
                    })
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
        <h2>roomsAvailable And datesAvailable</h2>
            {Object.keys(roomsAv).map(key => (
                <div key={key}>
                    {key}: {roomsAv[key]}
                </div>
            ))}
            {/* {Object.keys(datesAv).map(date => (
                <div key={date}>
                    {date}
                </div>
            ))}  */}
        </div>
    )     
}
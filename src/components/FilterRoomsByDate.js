import { useState, useEffect } from "react"
import { getDocRefFromReservations } from "./getDocRefFromReservations";

export default function FilterRoomsByDate({ duration, year, month, day, roomsAvailable, setRoomsAvailable }) {
    const [roomsAv, setRoomsAv] = useState({}) 
    const [hoursAv, setHoursAv] = useState(new Set()) 
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    let roomsAvailableByCapacity = roomsAvailable

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
    
    useEffect(() => {
        async function fetchData() {
            try {
                console.log("FilterRooms3")                    
                Object.keys(roomsAvailableByCapacity).forEach(async (roomNum) => {
                    // for the given date, for each available room, find all the hours that are available         
                    const { data } = await getDocRefFromReservations(year, month, day, roomNum)
                    const roomCapacity = data.roomCapacity; 
                    
                    // find all the possible hours from which there are {duration} hours available in roomNum room in that date
                    const hours = range(8, 18)
                    let firstHourAvailable
                    let lastHourAvailable      
                    let i = 0
                    let findFirst = true
    
                    while (i < hours.length) {                          
                        if (Object.keys(data[hours[i]]).length === 0 && (i !== (hours.length - 1))) {                         
                            if (findFirst){
                                firstHourAvailable = parseInt(hours[i])
                                findFirst = false
                            }                                        
                        } else {
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
        <h2>roomsAvailable And hoursAvailable</h2>
            {Object.keys(roomsAv).map(key => (
                <div key={key}>
                    {key}: {roomsAv[key]}
                </div>
            ))}
            {/* {hoursAv.map(date => (
                <div key={date}>
                    {date}
                </div>
            ))} */}
        </div>
    )  
}
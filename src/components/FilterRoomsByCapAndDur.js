import { useCollection } from "../hooks/useCollection"
import { useState, useEffect } from "react"
import { db } from "../firebase/config";
import { doc, getDoc, collection, onSnapshot, query, where, getDocs, limit } from "firebase/firestore";
import { useMyState } from "../hooks/useMyState";

export default function FilterRoomsByCapAndDur({ uid, capacity, duration, year, month, roomsAvailable, setRoomsAvailable }) {
    const [roomsAv, setRoomsAv] = useState({}) 
    const [datesAv, setDatesAv] = useState(new Set())  
    console.log("roomsAvailable:", roomsAvailable) 

    // const { state: roomsAv, setState: setRoomsAv, resetState: resetRoomsAv } = useMyState({});
    // const { state: datesAv, setState: setDatesAv, resetState: resetDatesAv } = useMyState(new Set());

    // resetRoomsAv()
    // resetDatesAv()

    const addKeyValuePair = (key, value) => { 
        setRoomsAv(prevState => ({...prevState, [key]: value}));
    }; 

    const addValToArr = (value) => {
        setDatesAv(prevState => new Set([...prevState, value])); 
    };

    function range(start, end) {
        var ans = [];
        for (let i = start; i <= end; i++) {
            ans.push(i);
        }
        return ans;
    }

    // filter out rooms that their capacity is less then the given capacity
    let roomsAvailableByCapacity = {}
    Object.keys(roomsAvailable).forEach((roomNum) => {
        const roomCapacity = roomsAvailable[roomNum]       
        if (roomCapacity >= capacity){ 
            roomsAvailableByCapacity[roomNum] = roomCapacity
        }
    }) 
    //setRoomsAvailable({})
    
    //TODO: add a cleanup function
    //TODO: how to make the component to be re-created so roomsAv and datesAv would be new Obj and new set. otherwise it's the previous arrays.
    useEffect(() => {
        async function fetchData() {
            console.log("FilterRooms2")  
            
            // for each day in the given month, for each available room, find all the hours that are available         
            range(1, 31).forEach(async (day) => {
                const docRefOfYearMonth = doc(collection(db, "Reservations"), `${year}${month}`)
                const docRefOfYearMonthDay = doc(collection(docRefOfYearMonth, `${year}${month}Reservations`), `${year}${month}${day}`)
                Object.keys(roomsAvailableByCapacity).forEach(async (roomNum) => {
                    const docRefOfYearMonthDayRoom = query(collection(docRefOfYearMonthDay, `${year}${month}${day}Reservations`), where("roomNum", "==", `${roomNum}`))
                    const querySnapshot = await getDocs(docRefOfYearMonthDayRoom)
                    const queryDoc = querySnapshot.docs[0] 
                    const data = queryDoc.data();
                    const roomCapacity = data.roomCapacity; 
                    
                    let durationCounter = 0
                    const hours = range(8, 18)    
                    for (let i = 0; i < hours.length; i++) {
                        // this hour is available                                     
                        if (Object.keys(data[hours[i]]).length === 0) {                             
                            durationCounter++
                            if (durationCounter == duration){
                                addKeyValuePair(roomNum, roomCapacity)
                                addValToArr(`${day}/${month}/${year}`)
                                break 
                            } 
                        } else {
                            durationCounter = 0 
                        }
                    }
                   
                    
                })
                
            })

            
        }
        fetchData();   
    }, [])  

    
    
    // Object.keys(roomsAv).forEach((roomNum) => {
    //     setRoomsAvailable(prevState => ({...prevState, [roomNum]: roomsAv[roomNum]}));
    // })
    // console.log("roomsAvailable:", roomsAvailable)    

    console.log("roomsAv:", roomsAv)      
    console.log("datesAv:", datesAv) 
    setRoomsAvailable(roomsAv)
    console.log("roomsAvailable2:", roomsAvailable) 
   
    return (
        <div>
        <h2>roomsAvailable And datesAvailable</h2>
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
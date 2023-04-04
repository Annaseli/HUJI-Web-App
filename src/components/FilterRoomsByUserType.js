//import { useColl } from "../hooks/useColl"
//import { useDoc } from "../hooks/useDoc";
//import { useRoomsByUserType } from "../hooks/useRoomsByUserType ";
import { useState, useEffect } from "react"
import { db } from "../firebase/config";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

export default function FilterRoomsByUserType({ uid }) {
    const [roomsAv, setRoomsAv] = useState({});
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    // const { data: userInfo } = useDoc('Users', uid)

    // const userType = userInfo?.userType;
    // console.log("userInfo", userInfo);
    // const roomsByUserType = useRoomsByUserType(userType);

    // useEffect(() => {
    //     console.log("roomsByUserType", roomsByUserType);
    //     setRoomsAv(roomsByUserType || {});
    // }, [roomsByUserType]);



    // useEffect(() => {
    //     if (userInfo) {
    //         setUserType(userInfo.userType);
    //     }      
    // }, [userInfo])   

    // console.log("userType", userType);
    // if (userType) {
    //     const { docs } = useColl('TypeOfUser', ["userType", "==", userType])
    //     setUserTypeInfo(docs)
    // }
    
    // useEffect(() => {   
    //     if (userTypeInfo) {
    //         const rooms = userTypeInfo[0]['roomsAvailable']
    //         console.log("rooms", rooms);
    //         setRoomsAv(rooms)
    //         console.log("roomsAv", roomsAv);
    //     }
    // }, [userType])   

    // setRoomsAvailable(roomsAv)

    useEffect(() => { 
        async function fetchData() {
            try {
                console.log("FilterRooms")  

                // search in Users for the current user id and get it's doc for finding it's userType.
                let userType;               
                const docRefInUsers = doc(db, "Users", uid);
                const docInUsersSnap = await getDoc(docRefInUsers)
                if (docInUsersSnap.exists) {
                    const data = docInUsersSnap.data();
                    userType = data.userType;
                    console.log("userType", userType);
                } else {
                    console.log('No such document!');
                }

                // get the roomsAvailable obj from the doc in the TypeOfUser collection corresponding to doc that 
                // belongs to the userType found earlier.  
                const docRefInTypeOfUsers = query(collection(db, "TypeOfUser"), where("userType", "==", userType))
                const querySnap = await getDocs(docRefInTypeOfUsers)
                const docSnap = querySnap.docs[0];
                const rooms = docSnap.data().roomsAvailable
                setRoomsAv(rooms)
                
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

    // i'll make a custom hook out of all this logic and return roomsAv and matan will render the roomsAv i'll send to him. So i won't have to sent roomsAvailable as prop
    //setRoomsAvailable(roomsAv)

    return (
        <div>
        <h2>roomsAvailable</h2>
            {roomsAv && Object.keys(roomsAv).map(key => (
                <div key={key}>
                    {key}: {roomsAv[key]}
                </div>
            ))}
        </div>
    )   
}
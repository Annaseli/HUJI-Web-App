import { useCollection } from "../hooks/useCollection"
import { useState, useEffect } from "react"
import { db } from "../firebase/config";
import { doc, getDoc, collection, onSnapshot, query, where, getDocs } from "firebase/firestore";

export default function FilterRoomsByUserType({ uid, roomsAv, setRoomsAv}) {

    const addKeyValuePair = (key, value) => {
        setRoomsAv(prevState => ({
          ...prevState,
          [key]: value
        }));
    };
    
    //TODO: add a cleanup function
    useEffect(() => {
        async function fetchData() {
            console.log("FilterRooms")
            //const { docs: userDoc } = useCollection('Users', ["uid", "==", uid])      
            let userType;
            //const [roomsAvailable, setRoomsAvailable] = useState(new Map());

            // search in Users for the current user id and gets it's doc for finding it's userType.
            const docRefInUsers = doc(db, "Users", uid);
            //console.log(docRefInUsers)  
            const docInUsersSnap = await getDoc(docRefInUsers)
            if (docInUsersSnap.exists) {
                const data = docInUsersSnap.data();
                userType = data.userType;
            } else {
                console.log('No such document!');
            }
            // catch((error) => {
            //     console.log('Error getting document:', error);
            // });

            // get the roomsAv map from the doc in the TypeOfUser collection corresponding to doc that 
            // belongs to the userType found earlier.      
            const docRefInTypeOfUsers = query(collection(db, "TypeOfUser"), where("userType", "==", userType))
            const querySnapshot = await getDocs(docRefInTypeOfUsers)
            //console.log(docRefInTypeOfUsers)
            querySnapshot.forEach((d) => {
                // d.data() is never undefined for query doc snapshots
                //console.log(d.id, " => ", d.data());
                const rooms = d.data().roomsAvailable
                Object.keys(rooms).forEach((roomNum) => {
                    addKeyValuePair(roomNum, rooms[roomNum])
                })
                
            })
            // catch((error) => {
            // console.log('Error getting document:', error);
            // });        
        }
        fetchData();    
        console.log(roomsAv)
    }, [])


    return (
        <div>
        <h2>roomsAvailable</h2>
            {Object.keys(roomsAv).map(key => (
                <div key={key}>
                    {key}: {roomsAv[key]}
                </div>
            ))}
        </div>
    )

    
}
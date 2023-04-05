import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useCollection } from "./useCollection";
import { db } from "../firebase/config";

export const useRoomsByUserType = (userType) => {
  const [roomsAv, setRoomsAv] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
        const q = query(
            collection(db, "TypeOfUser"),
            where("userType", "==", userType)
        );
        const querySnapshot = await getDocs(q);
        const docSnapshot = querySnapshot.docs[0];
        if (docSnapshot) {
            setRoomsAv(docSnapshot.data().roomsAvailable);
        }
        // const rooms = userTypeInfo[0]['roomsAvailable']
        // console.log("rooms", rooms);
        // setRoomsAv(rooms)
        // console.log("roomsAv", roomsAv);
    };

    if (userType) {
      //const { docs: userTypeInfo } = useCollection('TypeOfUser', ["userType", "==", userType])
      //userTypeInfo && fetchRooms(userTypeInfo);
      fetchRooms();
    }
  }, [userType]);

  return roomsAv;
};

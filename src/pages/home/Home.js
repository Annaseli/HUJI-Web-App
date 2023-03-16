import { useState } from "react"
import useAuthContext from "../../hooks/useAuthContext"
import ReservationForm from "./ReservationForm"
import RoomsForm from "./RoomsForm"
import { DisplayRooms } from "../../components/DisplayRooms"
import { useCollection } from "../../hooks/useCollection"
import TypeOfUserForm from "./TypeOfUserForm"

// styles
//import styles from './Home.module.css'

export default function Home() {
    const { user } = useAuthContext()
    const { docs: rooms } = useCollection('Rooms')
    console.log("home")
    const [ selectedRoomNum, setSelectedRoomNum ] = useState('');

    return (       
        <>
            <h2>Home</h2>   
            {rooms && <DisplayRooms rooms={rooms} setSelectedRoomNum={setSelectedRoomNum} />}
            <ReservationForm uid={user.uid} selectedRoomNum={selectedRoomNum}/> 
            <RoomsForm />
            <TypeOfUserForm />
        </>
           
    )
}
import { useState, useRef } from "react"
import useAuthContext from "../../hooks/useAuthContext"
import ReservationForm from "./ReservationForm"
import RoomsForm from "./RoomsForm"
import { DisplayRooms } from "../../components/DisplayRooms"
import { useCollection } from "../../hooks/useCollection"
import TypeOfUserForm from "./TypeOfUserForm"
import UsersForm from "./UsersForm"
import FilterRoomsByUserType from "../../components/FilterRoomsByUserType"
import MonthlyEmptyResvations from "./MonthlyEmptyResvations"
import FilterRoomsByCapAndDur from "../../components/FilterRoomsByCapAndDur"

// styles
//import styles from './Home.module.css'

//TODO: add the MonthlyEmptyResvations form when needed to check availability for a month that doesn't exist

export default function Home() {
    const { user } = useAuthContext()
    const { docs: rooms } = useCollection('Rooms')
    console.log("home")
    const [ selectedRoomNum, setSelectedRoomNum ] = useState('');
    // const [roomsAv, setRoomsAv] = useState(new Map());
    // const _roomsAv = useRef(roomsAv).current
    // const _setRoomsAv = useRef(setRoomsAv).current
    const [roomsAv, setRoomsAv] = useState({});

    return (       
        <>
            <h2>Home</h2>   
            {/* {rooms && <DisplayRooms rooms={rooms} setSelectedRoomNum={setSelectedRoomNum} />}
            <ReservationForm uid={user.uid} selectedRoomNum={selectedRoomNum}/> 
            <RoomsForm />
            <TypeOfUserForm /> */}
            {/* <UsersForm uid={user.uid} />            */}
            {/* <FilterRoomsByUserType uid={user.uid} roomsAv={roomsAv} setRoomsAv={setRoomsAv} /> */}
            <MonthlyEmptyResvations year={'2023'} month={'10'}/>
            {/* <FilterRoomsByCapAndDur capacity={'3'} duration={'1'} year={'2023'} month={'13'} roomsAvailable={roomsAv} /> */}
        </> 
    )
}
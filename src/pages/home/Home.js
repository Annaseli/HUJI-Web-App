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
import { useMyState } from "../../hooks/useMyState"
import FilterRoomsByDate from "../../components/FilterRoomsByDate"
import FilterRoomsByDateAndTime from "../../components/FilterRoomsByDateAndTime"

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

    // const { resetState: resetRoomsAv } = useMyState({});
    // const { resetState: resetDatesAv } = useMyState(new Set());

    // resetRoomsAv()
    // resetDatesAv()

    return (       
        <>
            <h2>Home</h2>   
            {/* {rooms && <DisplayRooms rooms={rooms} setSelectedRoomNum={setSelectedRoomNum} />}
            <ReservationForm uid={user.uid} selectedRoomNum={selectedRoomNum}/> 
            <RoomsForm />
            <TypeOfUserForm /> */}
            {/* <UsersForm uid={user.uid} />            */}
            <FilterRoomsByUserType uid={user.uid} roomsAv={roomsAv} setRoomsAv={setRoomsAv} />
            {/* <MonthlyEmptyResvations year={'2023'} month={'02'}/> */} 
            {/* <FilterRoomsByCapAndDur capacity={'5'} duration={'4'} year={'2023'} month={'02'} roomsAvailable={roomsAv} setRoomsAvailable={setRoomsAv} />    */}
            {/* <FilterRoomsByDate capacity={'5'} duration={'3'} year={'2023'} month={'02'} day={'2'} roomsAvailable={roomsAv} /> */}
            <FilterRoomsByDateAndTime capacity={'5'} duration={'3'} year={'2023'} month={'02'} day={'2'} hour={'8'} roomsAvailable={roomsAv} />

        </> 
    )
    
}
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
import GetUsersRes from "../../components/GetUsersRes"
import ConfirmedUsersForm from "./ConfirmedUsersForm"
import CenterContentForm from "./CenterContentForm"
import UserAprovalByAdmin from "../../components/UserAprovalByAdmin"
import DisplayDelUsersResForm from "./DisplayDelUsersResForm"
import ResetPassword from "../../components/ResetPassword"
import DisplayDelAllUsersResForm from "./DisplayDelAllUsersResForm"
import DisplayDelAllUsers from "./DisplayDelAllUsers"
//import DownloadResToCsvForm from "./DownloadResToCsvForm"

// styles
//import styles from './Home.module.css'

//TODO: add the MonthlyEmptyResvations form when needed to check availability for a month that doesn't exist

export default function Home() {
    //const { user } = useAuthContext()
    //const { docs: rooms } = useCollection('Rooms')
    console.log("home")

    // const [ selectedRoomNum, setSelectedRoomNum ] = useState('');
    // const [roomsAvailable, setRoomsAvailable] = useState({1:5, 3:10, 4:10});


    //let roomsAvailable = {}

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
            {/* <FilterRoomsByUserType uid={user.uid} roomsAvailable={roomsAvailable} setRoomsAvailable={setRoomsAvailable} />  */}
            {/* <MonthlyEmptyResvations year={'2023'} month={'04'}/>  */}
            {/* <FilterRoomsByCapAndDur capacity={'5'} duration={'4'} year={'2023'} month={'04'} roomsAvailable={roomsAvailable} setRoomsAvailable={setRoomsAvailable} />    */}
            {/* <FilterRoomsByDate capacity={'5'} duration={'3'} year={'2023'} month={'04'} day={'1'} roomsAvailable={roomsAvailable} setRoomsAvailable={setRoomsAvailable} /> */}
            {/* <FilterRoomsByDateAndTime capacity={'5'} duration={'3'} year={'2023'} month={'04'} day={'1'} hour={'8'} roomsAvailable={roomsAvailable} setRoomsAvailable={setRoomsAvailable} /> */}
            {/* <ReservationForm uid={user.uid} /> */}
            {/* <DisplayUsersRes uid={user.uid} /> */}
            {/* <ConfirmedUsersForm /> */}
            {/* <CenterContentForm /> */}
            {/* < UserAprovalByAdmin /> */}
            {/* <DisplayDelUsersResForm uid={user.uid} /> */}
            {/* <ResetPassword uid={'mr3kIK2hhBdupBj0IjQ8x1RLbUx1'} /> */}
            {/* <DisplayDelAllUsersResForm /> */}
            {/* <DisplayDelAllUsers /> */}
            {/* <DownloadResToCsvForm /> */}
        </> 
    )
    
}
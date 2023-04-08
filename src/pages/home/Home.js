import { useState, useRef } from "react"
import { db, projectAuth } from "../../firebase/config"
import useAuthContext from "../../hooks/useAuthContext"
import ReservationForm from "../../components/ReservationForm"
import RoomsForm from "../../components/RoomsForm"
import DisplayRooms from "../../components/DisplayRooms"
import { useCollection } from "../../hooks/useCollection"
import TypeOfUserForm from "../../components/TypeOfUserForm"
import UsersForm from "../../components/UsersForm"
import FilterRoomsByUserType from "../../components/FilterRoomsByUserType"
import FilterRoomsByCapAndDur from "../../components/FilterRoomsByCapAndDur"
import { useMyState } from "../../hooks/useMyState"
import FilterRoomsByDate from "../../components/FilterRoomsByDate"
import FilterRoomsByDateAndTime from "../../components/FilterRoomsByDateAndTime"
import GetUsersRes from "../../components/GetUsersRes"
import ConfirmedUsersForm from "../../components/ConfirmedUsersForm"
import CenterContentForm from "../../components/CenterContentForm"
import UserAprovalByAdmin from "../../components/UserAprovalByAdmin"
import ResetPassword from "../../components/ResetPassword"
import DisplayDelAllResForm from "../../components/DisplayDelAllResForm"
import DisplayDelAllUsers from "../../components/DisplayDelAllUsers"
import DisplayDelResForm from "../../components/DisplayDelResForm"
//import DownloadResToCsvForm from "./DownloadResToCsvForm"

// styles
//import styles from './Home.module.css'

export default function Home() {
    //const { user } = useAuthContext()
    const { docs: rooms } = useCollection('Rooms')
    console.log("home")

    const [ selectedRoomNum, setSelectedRoomNum ] = useState('');
    const [roomsAvailable, setRoomsAvailable] = useState({1:5, 3:10, 4:10});

    const uid = projectAuth.currentUser.uid
    
    return (       
        <>
            <h1>Home</h1>   
            {/* {rooms && <DisplayRooms rooms={rooms} setSelectedRoomNum={setSelectedRoomNum} />}
            <h2>{selectedRoomNum}</h2>  */}
            {/* <ReservationForm uid={user.uid} selectedRoomNum={selectedRoomNum}/> */}
            {/* <RoomsForm /> */}
            {/* <TypeOfUserForm />  */}
            {/* <UsersForm uid={uid} />            */}
            {/* <FilterRoomsByUserType uid={uid} />  */}
            {/* <FilterRoomsByCapAndDur capacity={'5'} duration={'4'} year={'2023'} month={'04'} roomsAvailable={roomsAvailable} setRoomsAvailable={setRoomsAvailable} />    */}
            {/* <FilterRoomsByDate capacity={'5'} duration={'3'} year={'2023'} month={'04'} day={'1'} roomsAvailable={roomsAvailable} setRoomsAvailable={setRoomsAvailable} /> */}
            {/* <FilterRoomsByDateAndTime capacity={'5'} duration={'3'} year={'2023'} month={'04'} day={'1'} hour={'8'} roomsAvailable={roomsAvailable} setRoomsAvailable={setRoomsAvailable} /> */}
            {/* <ReservationForm uid={uid} /> */}
            {/* <DisplayUsersRes uid={user.uid} /> */}
            {/* <ConfirmedUsersForm /> */}
            {/* <CenterContentForm /> */}
            {/* < UserAprovalByAdmin /> */}
            {/* <DisplayDelResForm uid={uid} /> */}
            {/* <ResetPassword uid={'mr3kIK2hhBdupBj0IjQ8x1RLbUx1'} /> */}
            {/* <DisplayDelAllResForm /> */}
            {/* {<DisplayDelAllUsers />} */}
            {/* <DownloadResToCsvForm /> */}
        </> 
    )
    
}
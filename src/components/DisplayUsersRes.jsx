import Box from '@mui/material/Box';
import {DataGrid} from '@mui/x-data-grid';
import {SemiTitle} from "./Title";
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from "@mui/material/IconButton";
import {useGetUsersRes} from "../hooks/useGetUsersRes";
import React, {useEffect, useState} from "react";
import {useFirestore} from "../hooks/useFirestore";
// firebase imports
import {db} from "../firebase/config";
import {collection, doc, deleteField} from "firebase/firestore";
import {getDocRefFromReservations} from "../pages/NewReservation/getDocRefFromReservations";
import {getCheckInCodeFromRoom} from "../hooks/useGetCheckInCodeFromRoom";
import './EmptyReservationMessage.css';


export default function DisplayUsersRes({uid, header, moveToNewReservation, displayCheckIn = true}) {
    console.log("DisplayUsersRes")
    const {usersReservations, resMapFromCurDay, noData, error} = useGetUsersRes(uid)
    const [reservations, setReservations] = useState([]);
    const [checkIn, setCheckIn] = useState('')
    const {setDocToFireStore, updateDocInFireStore, response} = useFirestore()
    const empty_reservation_msg = "You have no reservation"

    const columns = [
        {field: 'id', headerName: 'ID', width: 90},
        {
            field: 'uid',
            headerName: 'User ID',
            width: 150,
            editable: false,
        },
        {
            field: 'room',
            headerName: 'Room',
            width: 150,
            editable: false,
        },
        {
            field: 'date',
            headerName: 'Date',
            width: 150,
            type: 'date',
            editable: false,
        },
        {
            field: 'startHour',
            headerName: 'Start Time',
            type: 'time',
            width: 120,
            editable: false,
        },
        {
            field: 'endHour',
            headerName: 'End Time',
            type: 'time',
            width: 120,
            editable: false,
        },
        {
            field: 'peopleNum',
            headerName: 'Number of People Invited',
            type: 'number',
            width: 110,
            editable: false
        }, {
            field: 'delete',
            headerName: 'Delete',
            width: 150,
            renderCell: (params) => (
                <IconButton sx={{color: 'red'}} onClick={() => handleDelete(params.row.id)}>
                    <CancelIcon/>
                </IconButton>
            ),
        },
    ];

    //TODD - front: refresh the list after the deletion and informing the user
    const handleDelete = async (resId) => {
        if (window.confirm(`Are you sure you want to delete this reservation ?`)) {
            console.log(resId)
            const roomNum = resMapFromCurDay[resId]['roomNum']
            const year = resMapFromCurDay[resId]['year']
            const month = resMapFromCurDay[resId]['month']
            const day = resMapFromCurDay[resId]['day']
            const startHour = resMapFromCurDay[resId]['startHour']
            const duration = resMapFromCurDay[resId]['duration']

            // delete reservation from Users
            await updateDocInFireStore(doc(collection(db, "Users"), uid), {
                [`resMapFromCurDay.${resId}`]: deleteField()
            });

            // delete reservation from Reservations
            const {docRef: docRefRes} = await getDocRefFromReservations(year, month, day, roomNum)
            for (let i = 0; i < parseInt(duration); i++) {
                const hourToPlace = parseInt(startHour)
                await setDocToFireStore(docRefRes, {
                    [`${hourToPlace + i}`.padStart(2, '0')]: {}
                }, {merge: true});
            }
        }
    }

    // TODO - front: add check in option
    const handleCheckIn = async (resId) => {
        console.log(resId)
        const roomNum = resMapFromCurDay[resId]['roomNum']
        const year = resMapFromCurDay[resId]['year']
        const month = resMapFromCurDay[resId]['month']
        const day = resMapFromCurDay[resId]['day']
        const startHour = resMapFromCurDay[resId]['startHour']
        const startHourInt = parseInt(startHour)
        const duration = resMapFromCurDay[resId]['duration']

        // If the check in code is similar to the room's code and the time the user sent it is 15 mins before
        // his reservation time and max {duration + 15} time after, we'll set the checkedIn in this reservation (maybe delete if from the list later).
        // Either way letting him know
        const checkInCodeFromRoom = await getCheckInCodeFromRoom(roomNum)

        const curDate = new Date().toLocaleString('en-GB')
        const curHour = curDate.substring(12, 14);
        const curMinute = curDate.substring(15, 17);

        const checkedInEarly = ((curHour === startHourInt - 1) && curMinute > 44 && curMinute <= 59)
        const checkedInLate = (curHour > startHourInt - 1 && curHour < startHourInt + duration)

        // TODO: in production delete the true
        if (parseInt(checkIn) === checkInCodeFromRoom && (true || checkedInEarly || checkedInLate)) {
            const {docRef: docRefRes} = await getDocRefFromReservations(year, month, day, roomNum)
            for (let i = 0; i < duration; i++) {
                const hourToPlace = parseInt(startHour)
                await setDocToFireStore(docRefRes, {
                    [`${hourToPlace + i}`.padStart(2, '0')]: {"checkedIn": true}
                }, {merge: true});
            }
        }
    }


    // without the useEffect the component renders infinitely
    useEffect(() => {
        if (response.success) {
            setCheckIn('')
        } else if (response.error) {
            setCheckIn('')
            console.log(response.error)
        } else if (response.isPending) {
            console.log("loading...")
            // can I print the loading to the user too?
        }

    }, [response])
    function emptyReservationMessage() {
        return (
            <div className="reservation-message-container">
                <h5 className="reservation-message">{empty_reservation_msg}</h5>
                <a href="#" className="reservation-link" onClick={moveToNewReservation}>Click here to book your first reservation</a>
            </div>
        )
    }


    // TODO - front: display something if there are no reservations - noData indicates that
    return (
        <Box sx={{height: 400, width: '100%'}}>
            {header && <SemiTitle>{header}</SemiTitle>}
            {usersReservations && usersReservations.length > 0 && <DataGrid
                rows={usersReservations}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                // checkboxSelection
                disableSelectionOnClick
                // disableColumnFilter
                experimentalFeatures={{newEditingApi: true}}
            />}
            {!noData && usersReservations.length === 0 &&  emptyReservationMessage()}
        </Box>
    );
}
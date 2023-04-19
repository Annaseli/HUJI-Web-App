import Box from '@mui/material/Box';
import {DataGrid} from '@mui/x-data-grid';
import {SemiTitle} from "./Title";
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from "@mui/material/IconButton";
import {useGetUsersRes} from "../hooks/useGetUsersRes";
import {useEffect, useState} from "react";
import {useFirestore} from "../hooks/useFirestore";

// firebase imports
import {db} from "../firebase/config";
import {collection, doc, deleteField} from "firebase/firestore";
import {getDocRefFromReservations} from "../pages/NewReservation/getDocRefFromReservations";
import {getCheckInCodeFromRoom} from "../hooks/useGetCheckInCodeFromRoom";
import './EmptyReservationMessage.css';

export default function DisplayUsersRes({uid, header, moveToNewReservation}) {
    console.log("DisplayUsersRes")
    const {userRes, userReservations, noData, error} = useGetUsersRes(uid)
    const [reservations, setReservations] = useState([]);
    const [checkIn, setCheckIn] = useState('')
    const {setDocToFireStore, updateDocInFireStore, response} = useFirestore()
    const emptyReservationMsg = "You have no reservation"

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        !header && {
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
        },{
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
            const roomNum = userReservations[resId]['roomNum']
            const year = userReservations[resId]['year']
            const month = userReservations[resId]['month']
            const day = userReservations[resId]['day']
            const startHour = userReservations[resId]['startHour']
            const duration = userReservations[resId]['duration']

            // delete reservation from Users
            await updateDocInFireStore(doc(collection(db, "Users"), uid), {
                [`userReservations.${resId}`]: deleteField()
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
                <h5 className="reservation-message">{emptyReservationMsg}</h5>
                <a href="#" className="reservation-link" onClick={moveToNewReservation}>Click here to book your first reservation</a>
            </div>
        )
    }
    //TODO - place some timer before render so it will wait for usersReservations if there
    //are reservations
    return (
        <Box sx={{height: 400, width: '100%'}}>
            {header && <SemiTitle>{header}</SemiTitle>}
            {userReservations && !noData && <DataGrid
                rows={userRes}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                // checkboxSelection
                disableSelectionOnClick
                // disableColumnFilter
                experimentalFeatures={{newEditingApi: true}}
            />}
            {noData && emptyReservationMessage()}
        </Box>
    );
}
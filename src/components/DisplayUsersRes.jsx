import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";

// firebase imports
import { db } from "../firebase/config";
import { collection, doc, deleteField, updateDoc, setDoc } from "firebase/firestore";
import getDocRefFromReservations from "../pages/NewReservation/getDocRefFromReservations";

// components & custom hooks
import './EmptyReservationMessage.css';
import { SemiTitle } from "./Title";
import useGetUsersRes from "../hooks/useGetUsersRes";

export default function DisplayUsersRes({ uid, header }) {
    console.log("DisplayUsersRes")
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [isCancelled, setIsCancelled] = useState(false)
    const emptyReservationMsg = "You have no reservation"
    const {userRes, userReservations, noData, err} = useGetUsersRes(uid)
    // if (!isCancelled) {
    //     setIsPending(false)
    //     if (err){
    //         setError(err)
    //     }
    // }

    const columns = [
        { field: 'id', headerName: 'ID', width: 120 },

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
            headerName: 'People',
            type: 'number',
            width: 60,
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

    const handleDelete = async (resId) => {
        if (window.confirm("Are you sure you want to delete this reservation ?")) {
            setError(null)
            setIsPending(true)
            try {
                const roomNum = userReservations[resId]["roomNum"]
                const year = userReservations[resId]["year"]
                const month = userReservations[resId]["month"]
                const day = userReservations[resId]["day"]
                const startHour = userReservations[resId]["startHour"]
                const duration = userReservations[resId]["duration"]

                // delete reservation from Users
                await updateDoc(doc(collection(db, "Users"), uid), {
                    [`userReservations.${resId}`]: deleteField()
                });

                // delete reservation from Reservations
                const {docRef: docRefRes} =
                    await getDocRefFromReservations(year, month, day, roomNum)
                for (let i = 0; i < parseInt(duration); i++) {
                    const hourToPlace = parseInt(startHour)
                    await setDoc(docRefRes, {
                        [`${hourToPlace + i}`.padStart(2, '0')]: {}
                    }, {merge: true});
                }

                if (!isCancelled) {
                    setError(null)
                    setIsPending(false)
                }

            } catch (error) {
                if (!isCancelled) {
                    setError(error.message || "unknown error occurred")
                    setIsPending(false)
                }
            }

            //force refresh
        window.location.reload(true)
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);

    function emptyReservationMessage() {
        return (
            <div className="reservation-message-container">
                <h5 className="reservation-message">{emptyReservationMsg}</h5>
                {/*<a href="#" className="reservation-link" onClick={moveToNewReservation}>*/}
                {/*    Click here to book your first reservation</a>*/}
            </div>
        )
    }

    return (
        <Box sx={{height: 400, width: '100%'}}>
            {header && <SemiTitle>{header}</SemiTitle>}
            {userReservations && !noData &&
            <DataGrid
                rows={userRes}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                keyGetter={(row) => row.id}
                // checkboxSelection
                disableSelectionOnClick
                // disableColumnFilter
                experimentalFeatures={{newEditingApi: true}}
            />}
            {noData && header && header !== "All Reservations" }
            {isPending && <p>loading...</p>}
            {error && <p>{error}</p>}
        </Box>
    );
}
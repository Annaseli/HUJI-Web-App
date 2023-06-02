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
import AddToCalendar from "./AddToCalendar";
export default function DisplayUsersRes({ uid, header }) {
    console.log("DisplayUsersRes")
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [isCancelled, setIsCancelled] = useState(false)
    const [showComponent, setShowComponent] = useState(false)
    const emptyReservationMsg = "You have no reservation"
    const {userRes, userReservations, noData, err} = useGetUsersRes(uid)
    const [selectedRows, setSelectedRows] = useState([0]);
    const [addToCalenderFlag, setAddToCalenderFlag] = useState(false);

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
    const handleSelectionChange = (resId) => {
        setSelectedRows(resId);
        console.log(resId,"resId")
        // const roomNum = userReservations[resId]["roomNum"]
        // const year = userReservations[resId]["year"]
        // const month = userReservations[resId]["month"]
        // const day = userReservations[resId]["day"]
        // const startHour = userReservations[resId]["startHour"]
        // const duration = userReservations[resId]["duration"]
        // log
        console.log("aa","userRes")
        console.log(userRes,"userRes")
        console.log("abc", selectedRows)
    };


    useEffect(() => {
        if (userRes && userRes.length > 0 && !addToCalenderFlag) {
            const highestIdElement = userRes.reduce((prev, current) => {
                return prev.id > current.id ? prev : current;
            });
            setSelectedRows([highestIdElement.id]);
            setAddToCalenderFlag(true)
            console.log([highestIdElement],"highestIdElement.id")
        }
        return () => setIsCancelled(true);
    }, );

    function emptyReservationMessage() {
        return (
            <div className="reservation-message-container">
                <h5 className="reservation-message">{emptyReservationMsg}</h5>
                {/*<a href="#" className="reservation-link" onClick={moveToNewReservation}>*/}
                {/*    Click here to book your first reservation</a>*/}
            </div>
        )
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowComponent(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return ( showComponent ?
        (<Box sx={{height: 400, width: '100%'}}>
            {header && <SemiTitle>{header}</SemiTitle>}
            {userReservations && !noData &&
            <DataGrid
                rows={userRes}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                keyGetter={(row) => row.id}
                // checkboxSelection
                MultiSelect="False"
                FullRowSelect="Single"
                rowSelectionModel={selectedRows}
                // disableSelectionOnClick
                // disableColumnFilter
                onSelectionModelChange={handleSelectionChange}
                onRowSelectionModelChange={handleSelectionChange}
                experimentalFeatures={{newEditingApi: true}}
                initialState={{
                    sorting: {
                        sortModel: [{ field: 'id', sort: 'desc' }],
                    },
                }}
            />}

            {/*<button onClick={() => {*/}

            {/*} disabled={selectedRows.length !== 1}>*/}
                {selectedRows.length === 1 &&  addToCalenderFlag && <AddToCalendar
                    startHour={userReservations[selectedRows[0]]["startHour"]}
                    duration={userReservations[selectedRows[0]]["duration"]}
                    roomNum={userReservations[selectedRows[0]]["roomNum"]}
                    year={userReservations[selectedRows[0]]["year"]}
                    month={userReservations[selectedRows[0]]["month"]}
                    day={userReservations[selectedRows[0]]["day"]}
                    resId={selectedRows[0]}
                />

                }
                You can click on row To add it To your calender
            {/*</button>*/}

            {noData && header && header !== "All Reservations" && emptyReservationMessage()}
            {isPending && <p>loading...</p>}
            {error && <p>{error}</p>}


        </Box>) : null

    );
}
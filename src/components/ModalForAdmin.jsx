import {useEffect, useState} from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    TextField,
    Typography,
    Select,
    MenuItem, InputLabel
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import {Button} from '@material-ui/core';
import styled from 'styled-components';
import "./modalForAdminStyles.css"
import {collection, doc, getDocs, query, updateDoc, where} from "firebase/firestore";
import {db} from "../firebase/config";
import {useCollection} from "../hooks/useCollection";
// const useStyles = makeStyles((theme) => ({
//     title: {
//         textAlign: 'center',
//         fontSize: '1.5rem',
//         fontWeight: 'bold',
//         marginBottom: theme.spacing(2),
//     },
//     // form: {
//     //     display: 'flex',
//     //     flexDirection: 'column',
//     //     gap: theme.spacing(2),
//     // },
//     textField: {
//         marginBottom: theme.spacing(2),
//     },
// }));
const StyledButton = styled(Button)`
  && {
    margin-left: 16px;
    background-color: #211d42;
    color: #f1f1f1;

    &:hover {
      background-color: #f0c14b;
      opacity: 0.8;
    }
  }
`;

function ModalForAdmin(props) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [isCancelled, setIsCancelled] = useState(false);
    const [roomNum, setRoomNum] = useState(props.roomNum);
    const [title, setTitle] = useState(props.roomTitle);
    const [location, setLocation] = useState(props.location);
    const [capacity, setCapacity] = useState(props.capacity);
    const [checkInCode, setCheckInCode] = useState(props.checkInCode);
    const [allRoomsData, setAllRoomsData] = useState({});
    const {docs: userTypeDocs, err2} = useCollection("TypeOfUser")
    const [userType, setUserType] = useState("");
    const {docs: roomsDocs, err1} = useCollection("Rooms")

    useEffect(() => {
        async function fetchData() {
            const paddedRoom = roomNum.padStart(2, '0')
            setError(null)
            setIsPending(true)
            try {
                roomsDocs && roomsDocs.sort((a, b) => a.roomNum - b.roomNum);
                roomsDocs && Object.keys(roomsDocs).forEach((roomIdx) => {
                    let userTypeList = []
                    userTypeDocs && userTypeDocs.forEach((doc) => {
                        if (doc.roomsAvailable.includes(roomsDocs[roomIdx]["roomNum"])) {
                            userTypeList.push(doc.userType)
                        }
                    })
                    roomsDocs[roomIdx]["userTypeList"] = userTypeList
                    setAllRoomsData(roomsDocs)
                })

                setUserType(getMinPrivilege(allRoomsData[roomNum - 1]["userTypeList"]))

                // let userTypeList = []
                // userTypeDocs && userTypeDocs.forEach((doc) => {
                //     // TODO - change the "1" to roomNum after debug
                //     if (doc.roomsAvailable.includes("1")) {
                //         userTypeList.push(doc.userType)
                //     }
                // })
                // console.log("userTypeList", userTypeList)
                // const collRef = collection(db, "Rooms")
                // // TODO - change the "1" to roomNum after debug
                // const queryDocRef = query(collRef, where("roomNum", "==", "1"));
                // const querySnap =  await getDocs(queryDocRef)
                // const queryDoc = querySnap.docs[0]
                // const data = queryDoc.data();
                // console.log("data[\"capacity\"]", data["capacity"])
                // setRoomData([data["capacity"], data["checkIn"], data["location"], userTypeList])
                if (!isCancelled) {
                    setError(null)
                    setIsPending(false)
                }
            } catch (error) {
                if (!isCancelled) {
                    setError(error.message || "unknown error occurred")
                    console.log("error", error.message)
                    setIsPending(false)
                }
            }
        }

        // fetch the data only when editing == 0
        !editing && fetchData();
        return () => setIsCancelled(true);
    }, [userTypeDocs, roomsDocs]);

    const handleClickOpen = async (editing) => {
        console.log("view settings")
        // console.log(room)
        allRoomsData && console.log("allRoomsData", allRoomsData)
        // TODO - front : get the specific room data by: allRoomsData[roomNum - 1]
        //  for example roomNum 1 will be in allRoomsData[0] and show this room's details
        setOpen(true);
        setEditing(editing);
    };

    const handleClose = async () => {
        setOpen(false);
        setEditing(false);
    };

    const handleEdit = () => {
        setEditing(true);
    };

    const getMinPrivilege = (userTypeList) => {
        if (userTypeList.includes("Member")) {
            return "Member"
        }
        if (userTypeList.includes("Team")) {
            return "Team"
        }
        return "Admin"
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(roomNum, userType, capacity, title, checkInCode, location)
        const paddedRoomNum = roomNum.padStart(2, '0')
        const collRef = collection(db, "Rooms")
        const queryDocRef = query(collRef, where("roomNum", "==", roomNum));
        const querySnap = await getDocs(queryDocRef)
        const queryDoc = querySnap.docs[0]
        const data = queryDoc.data();
        const docRef = doc(collRef, queryDoc.id);
        await updateDoc(docRef, {
                ["capacity"]: capacity || data["capacity"],
                ["checkIn"]: checkInCode || data["checkIn"],
                ["location"]: location || data["location"]
            },
            {merge: true})

        let hierarchicalUserTypes = ["Admin"]
        if (userType === "Team") {
            hierarchicalUserTypes.push("Team")
        } else if (userType === "Member") {
            hierarchicalUserTypes.push("Team")
            hierarchicalUserTypes.push("Member")
        }

        const userTypeOptions = ["Admin", "Team", "Member"]
        for (let i = 0; i < userTypeOptions.length; i++) {
            console.log("hierarchicalUserTypes", hierarchicalUserTypes)
            let userType = userTypeOptions[i];
            console.log("userType", userType)
            const collRef = collection(db, "TypeOfUser")
            const queryDocRef = query(collRef, where("userType", "==", userType));
            const querySnap = await getDocs(queryDocRef)
            const queryDoc = querySnap.docs[0]
            const data = queryDoc.data()
            console.log("querySnap", querySnap)
            console.log("data", data)
            let newRoomsAvailable = []
            if (data["roomsAvailable"].includes(roomNum) && !hierarchicalUserTypes.includes(userType)) {
                // delete the room from the list
                newRoomsAvailable = data["roomsAvailable"].filter(room => room !== roomNum);

            } else if (!data["roomsAvailable"].includes(roomNum) && hierarchicalUserTypes.includes(userType)) {
                // add the room from the list
                newRoomsAvailable = [...data["roomsAvailable"], roomNum]
            } else {
                continue
            }
            const docRef = doc(collRef, queryDoc.id);
            await updateDoc(docRef, {
                    ["roomsAvailable"]: newRoomsAvailable
                },
                {merge: true})
        }
        handleClose();
    };

    return (
        <div>
            <div className="title">
                <Typography variant="h6">{title}</Typography>
            </div>
            <div className="btn">
                <Button onClick={() => handleClickOpen(false)}> view setting </Button>
                <IconButton onClick={() => handleClickOpen(true)}>
                    <EditIcon/>
                </IconButton>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    {editing ? 'Edit Room' : 'View Room Details'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Fill in the information about the room.
                    </DialogContentText>
                    <form onSubmit={handleSubmit} className="form">
                        <TextField
                            label="Room Number"
                            value={roomNum}
                            disabled={true}
                        />
                        <TextField
                            label="Title"
                            value={title}
                            disabled={true}
                        />

                        <TextField
                            label="Capacity"
                            disabled={!editing}

                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                        />
                        <TextField
                            label="Location"
                            value={location}
                            disabled={!editing}

                            onChange={(e) => setLocation(e.target.value)}
                        />
                        <TextField
                            label="Check in Code"
                            disabled={!editing}

                            value={checkInCode}
                            onChange={(e) => setCheckInCode(e.target.value)}
                        />
                        {!editing ? (<TextField
                            label="User Type (Min Privilege)"
                            value={userType}
                            disabled={!editing}

                            onChange={(e) => setUserType(e.target.value)}
                        />) : (<>
                            <InputLabel id="user-type-label">User Type</InputLabel>

                            <Select
                                labelId="user-type-label"
                                disabled={!editing}
                                id="user-type"
                                value={userType}
                                onChange={(e) => setUserType(e.target.value)}
                            >
                                <MenuItem value="Admin">Admin</MenuItem>
                                <MenuItem value="Team">Team</MenuItem>
                                <MenuItem value="Member">Member</MenuItem>
                            </Select>
                        </>)
                        }
                        {editing && (
                            <DialogActions>
                                {/*<StyledButton onClick={handleClose} color="secondary">*/}
                                {/*    Cancel*/}
                                {/*</StyledButton>*/}
                                {/*<Button color={"#211d42"} background={"#ffffff"} border={"#211D42"}>*/}
                                {/*Save*/}
                                {/*</Button>*/}
                                <StyledButton
                                    type="submit"
                                    variant="contained"
                                >
                                    Save
                                </StyledButton>
                            </DialogActions>

                        )}
                    </form>
                </DialogContent>
            </Dialog>

        </div>
    );
}

export default ModalForAdmin;

import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button, Typography, Box} from '@material-ui/core';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {addDoc, collection} from "firebase/firestore";
import {db} from "../../firebase/config";

const useStyles = makeStyles((theme) => ({

    formReport: {
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
            marginBottom: theme.spacing(2),
        },
    },
    submitButton: {
        alignSelf: 'center',
    },
    box: {
        height: 'auto',
        width: '80%',


    },
}));

export default function AddRooms() {
    console.log("Add Rooms")
    const classes = useStyles();
    const [roomNum, setRoomNum] = useState("")
    const [roomTitle, setRoomTitle] = useState("")
    const [capacity, setCapacity] = useState("")
    const [location, setLocation] = useState("")
    const [checkIn, setCheckIn] = useState("")
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        await addDoc(collection(db, "Rooms"), {
            // check for invalid data
            roomNum,
            roomTitle,
            capacity,
            location,
            checkIn
        })
        setTimeout(400)
        setIsLoading(false);
        setSuccess(true)
        setRoomNum("");
        setRoomTitle("");
        setCapacity("");
        setLocation("");
        setCheckIn("");

    };

    return (
        <div>
            <Box className={classes.box}
                 display="inline-block"
                 justifyContent="center"
                 alignItems="center"
                 flexDirection="column"
            >

                <Typography variant="h5" component="h2" gutterBottom className="title">
                    Add Rooms - For Developers
                </Typography>
                <form onSubmit={handleSubmit} className={classes.formReport}>
                    <TextField
                        label="RoomNum"
                        type="text"
                        variant="outlined"
                        value={roomNum}
                        onChange={(event) => setRoomNum(event.target.value)}
                        required
                    />
                    <TextField
                        label="RoomTitle"
                        type="text"
                        variant="outlined"
                        value={roomTitle}
                        onChange={(event) => setRoomTitle(event.target.value)}
                        required
                    />
                    <TextField
                        label="CheckInCode"
                        type="text"
                        variant="outlined"
                        value={checkIn}
                        onChange={(event) => setCheckIn(event.target.value)}
                        required
                    />
                    <TextField
                        label="Location"
                        type="text"
                        variant="outlined"
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}
                        required
                    />
                    <TextField
                        label="Capacity"
                        type="text"
                        variant="outlined"
                        value={capacity}
                        onChange={(event) => setCapacity(event.target.value)}
                        required
                    />
                    <hr style={{borderBottom: "1px solid #e0e0e0", marginBottom: "1rem"}}/>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submitButton}
                        disabled={isLoading}
                        style={{backgroundColor: '#211d42'}}
                    >
                        {isLoading ? "Adding..." : "Add Room"}
                    </Button>

                </form>
                {success && (
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <CheckCircleIcon sx={{fontSize: "5rem", color: "green"}}/>
                        <p>Added Room</p>
                    </div>
                )}
            </Box>
        </div>
    );
};

import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

// styles
import "./Modal.css";

// components & pages
import { Room } from './Room';
import { Button } from './Button';
import ConfirmationMessage from "./ConfirmationMessage";
import createReservation from "../pages/NewReservation/createReservation";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal({ title, date, startHour, endHour, peopleNum, duration, roomNum, uid, available,
                                       moveToMyReservation }) {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [isCancelled, setIsCancelled] = useState(false)
    const [open, setOpen] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);

    const handleOpen = () => {
        if (startHour) {
            setOpen(true);
        } else {
            alert("Please fill in all fields before choosing a room");
        }
    }

    const handleClose = async () => {
        setIsConfirm(true);
        setOpen(false);
        setError(null)
        setIsPending(true)
        try {
            await createReservation(uid, peopleNum, duration, date, startHour, endHour, roomNum)
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
    };

    const handleOpenNotAvailable = () => null;

    useEffect(() => {
        if (isConfirm) {
            setTimeout(() => {
                setIsConfirm(false);
                moveToMyReservation();
            }, 1000);
        }
        return () => setIsCancelled(true);
    }, [isConfirm]);

    return (
        <div>
            {!isConfirm &&
            <div>
            <Room onClick={ available ? handleOpen : handleOpenNotAvailable }
                  available={available}>{title}
            </Room>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: 'center'}}>
                        Reservation Information
                    </Typography>
                    <Typography id="modal-modal-description" sx={{m: 3, mt: 2, display: 'grid', gap: 2}}>
                        <span>Date: {date}</span>
                        <span>Start Time: {startHour + ":00"}</span>
                        <span>End Time: {endHour}</span>
                        <span>People Invited: {peopleNum}</span>
                    </Typography>
                    <Button sx={{backgroundColor: '#15CE49', color: 'white', '&:hover': {backgroundColor: '#0f9d58'}}}
                            onClick={handleClose}>Confirm Reservation</Button>
                </Box>
            </Modal>
            </div>}
            {isConfirm &&
              <ConfirmationMessage
              roomNum = {roomNum}
              />
            }
            {isPending && <p>loading...</p>}
            {error && <p>{error}</p>}
        </div>
    );
}

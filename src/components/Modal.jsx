import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

// styles
import "./Modal.css";

// components
import {Room} from './Room';
import {Button} from './Button';
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

export default function BasicModal(props) {
    // expects all of them to be strings except the available which is bool
    const {title, date, startHour, endHour, peopleNum, duration, roomNum, uid, available} = props;
    const dayObject = new Date(date)

    const [open, setOpen] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);

    const handleOpen = () => {
        setOpen(true);
        if (startHour) {
            setOpen(true);
        } else {
            alert('Please fill in all fields before choosing a room.');
        }
    }

    //TODO - front: add cancel to the confirm Order pop-up
    const handleClose = () => {
        setIsConfirm(true);
        setOpen(false);
        createReservation(uid, peopleNum, duration, date, startHour, endHour, roomNum)
    };

    const handleOpen_not_available = () => null;

    useEffect(() => {
        if (isConfirm) {
            setTimeout(() => {
                setIsConfirm(false);
            }, 2000);
        }
    }, [isConfirm]);

    return (
        <div>
            {!isConfirm &&
            <div>
            <Room onClick={ available ? handleOpen : handleOpen_not_available }
                  available={available}
            >{title}</Room>
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
                    <Button sx={{backgroundColor: '#15CE49', color: 'white', '&:hover': {backgroundColor: '#0f9d58'}}} onClick={handleClose}>Confirm Reservation</Button>
                </Box>
            </Modal>
            </div>}

            {isConfirm &&
              <ConfirmationMessage
              roomNum = {roomNum}
              />

            }
        </div>
    );
}

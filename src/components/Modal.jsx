import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import "./Modal.css";
import {Room} from './Room';
import {Button} from './Button';

import confirmReservation from "../pages/NewReservation/confirmReservation";
import ConfirmationMessage from "./ConfirmationMessage";


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
    const {title, date, startTime, endTime, peopleNum, duration, uid, available, room} = props;
    const dayObject = new Date(date)

    const [open, setOpen] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);

    const handleOpen = () => {
        if (startTime) {
            setOpen(true);
        } else {
            alert('Please fill in all fields before choosing a room.');
        }
    }

    const handleClose = () => {
        setIsConfirm(true);
        setOpen(false);
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
                        Order Information
                    </Typography>
                    <Typography id="modal-modal-description" sx={{m: 3, mt: 2, display: 'grid', gap: 2}}>
                        <span>Date: {date}</span>
                        <span>Start Time: {startTime + ":00" } </span>
                        <span>End Time: {endTime + ":00" }</span>
                        <span>People: {peopleNum}</span>
                    </Typography>
                    <Button sx={{backgroundColor: '#15CE49', color: 'white', '&:hover': {backgroundColor: '#0f9d58'}}} onClick={handleClose}>Confirm Reservation</Button>
                </Box>
            </Modal>
            </div>}

            {isConfirm &&

              <ConfirmationMessage
              roomNum = {room}
              />

            }
        </div>
    );
}

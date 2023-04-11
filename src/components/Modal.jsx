import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import "./Modal.css";
import {Room} from './Room';
import {Button} from './Button';
import confirmReservation from "../pages/NewReservation/confirmReservation";

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
    // expcets all of them to be strings except the available which is bool
    const {title, date, startTime, endTime, peopleNum, duration, uid, available} = props;
    const dayObject = new Date(date)

    const [open, setOpen] = useState(false);

    const handleOpen = () => {

        setOpen(true);
    }

    //TODO - front: add cancel to the confirm Order pop-up
    const handleClose = () => {
        console.log("year: ", dayObject.getFullYear())
        console.log("month: ", dayObject.getMonth() + 1)
        console.log("day (of month): ", dayObject.getDate())
        // confirmReservation(uid, peopleNum, duration, null, startTime, title)
        setOpen(false)

    };
    const handleOpen_not_available = () => null;

    return (
        <div>
            <Room onClick={ available ? handleOpen : handleOpen_not_available }
                  available={available}
            >{title}</Room>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: 'center'}}>
                        Order Information
                    </Typography>
                    <Typography id="modal-modal-description" sx={{m: 3, mt: 2, display: 'grid', gap: 2}}>
                        <span>Date: {date}</span>
                        <span>Start Time: {startTime}</span>
                        <span>End Time: {endTime}</span>
                        <span>People: {peopleNum}</span>
                    </Typography>
                    <Button background="#15CE49" onClick={handleClose}>Confirm Reservation</Button>
                </Box>
            </Modal>
        </div>
    );
}
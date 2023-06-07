import {Typography} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './ConfirmationMessage.css';
import {AddToCalendarButton} from 'add-to-calendar-button-react';

export default function ConfirmationMessage(props) {
    const start_date = props.date
    console.log(props)
    console.log(props.date)
    return (
        <div className="confirmation-message">
            <CheckCircleIcon sx={{fontSize: '6rem', color: '#15ce49'}}/>
            <Typography variant="subtitle1" sx={{fontWeight: 'bold', mt: 1}}>
                {`Your reservation for room ${props.roomTitle} is confirmed!`}</Typography>
        </div>


    )
        ;
}

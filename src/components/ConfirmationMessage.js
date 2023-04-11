import React from 'react';
import { Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './ConfirmationMessage.css';

export default function ConfirmationMessage(props) {
    const {roomNum} = props;
    return (
        <div className="confirmation-message">
            <CheckCircleIcon sx={{ fontSize: '6rem', color: '#15ce49' }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 1 }}>{`Your reservation for room ${roomNum} is confirmed!`}</Typography>
        </div>
    );
}

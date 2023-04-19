import React from 'react';
import './EmptyReservationMessage.css';
const empty_reservation_msg = "You have no reservation"

function EmptyReservationMessage(moveToNewReservation) {
    return (
        <div className="reservation-message-container">
            <h5 className="reservation-message">{empty_reservation_msg}</h5>
            <a href="#" className="reservation-link" onClick={moveToNewReservation}>Click here to book your first reservation</a>
        </div>
    );
}

export default EmptyReservationMessage;

import './EmptyReservationMessage.css';
const emptyReservationMsg = "You have no reservation"

export default function EmptyReservationMessage(moveToNewReservation) {
    return (
        <div className="reservation-message-container">
            <h5 className="reservation-message">{emptyReservationMsg}</h5>
            <a href="#" className="reservation-link" onClick={moveToNewReservation}>Click here to book your first reservation</a>
        </div>
    );
}


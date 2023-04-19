import React from 'react';
import { useCollection } from "../../hooks/useCollection";
import BasicModal from "../../components/Modal";
// import "./EditRoomsSettings.css";
import ModalForAdmin from "../../components/ModalForAdmin";

const empty_reservation_msg = "You have no reservation";

function EditRoomsSettings(moveToNewReservation) {
    const { docs: rooms } = useCollection('Rooms');

    const getRooms = () => {
        return (
            rooms.map((room) => (
                <ModalForAdmin
                    key={room.roomNum}
                    roomNum={room.roomNum}
                    roomTitle={"Room Num." + room.roomNum}
                >
                    {room.roomNum}
                </ModalForAdmin>
            ))
        );
    };

    return (
        <div>
            <div style={{textAlign: "center", fontWeight: "bold", fontSize: "1.5rem", marginBottom: "1rem"}}>
                Change Rooms Settings
            </div>
            <div className="rooms">
                {rooms && getRooms()}
            </div>
        </div>
    );
}

export default EditRoomsSettings;
// components & custom hooks
import { useCollection } from "../../hooks/useCollection";
import "./EditRoomsSettings.css";
import ModalForAdmin from "../../components/ModalForAdmin";
import { useState } from "react";
import React from "react";

export default function EditRoomsSettings() {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { docs: rooms, err } = useCollection("Rooms");
    // if (!isCancelled) {
    //     setIsPending(false)
    //     if (err) {
    //         setError(err)
    //     }
    // }

    const getRooms = () => {
        rooms.sort((a, b) => a.roomNum - b.roomNum);
        return (
            rooms.map((room) => (
                <ModalForAdmin
                    key={room.roomNum}
                    roomNum={room.roomNum}
                    roomTitle={room.roomTitle}
                    capacity={room.capacity}
                    location={room.location}
                    checkInCode={room.checkIn}
                >
                    {room.roomNum}
                </ModalForAdmin>
            ))
        );
    };

    return (
        <React.Fragment>
            <div style={{textAlign: "center", fontWeight: "bold", fontSize: "1.5rem", marginBottom: "1rem" }}>
                Change Rooms Settings
            </div>
            <hr style={{border: "none", borderBottom: "1px solid #e0e0e0", marginBottom: "1rem"}} />

            <div className="rooms">
                {rooms && getRooms()}
            </div>
            {isPending && <p>loading...</p>}
            {error && <p>{error}</p>}
        </React.Fragment>
    );
}
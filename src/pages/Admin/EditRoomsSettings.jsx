// components & custom hooks
import { useCollection } from "../../hooks/useCollection";
import "./EditRoomsSettings.css";
import ModalForAdmin from "../../components/ModalForAdmin";
import { useState } from "react";

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
            <div style={{textAlign: "center", fontWeight: "bold", fontSize: "1.5rem", marginBottom: "1rem" }}>
                Change Rooms Settings
            </div>
            <hr style={{border: "none", borderBottom: "1px solid #e0e0e0", marginBottom: "1rem"}} />

            <div className="rooms">
                {rooms && getRooms()}
            </div>
            {isPending && <p>loading...</p>}
            {error && <p>{error}</p>}
        </div>
    );
}
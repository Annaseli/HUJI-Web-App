import {CircularProgress} from "@material-ui/core";
import * as React from "react";
import BasicModal from "../../../components/Modal";
import useFilters from "../../../hooks/useFilters";

export default function BookARoom({
                                      rooms,
                                      roomsAvailableAfterFilter,
                                      moveToMyReservation,
                                      cleanAllFields,
                                      startHour,
                                      duration,
                                      peopleNum,
                                      date,
                                      uid
                                  }) {
    const isRoomAvailable = (roomNum) => {
        return roomsAvailableAfterFilter.includes(roomNum)
    }

    const getRooms = () => {
        console.log(rooms)
        if (!rooms || rooms.length === 0) {
            return (
                <div/>
            )
        }
        return (
            rooms.map((room) => (
                    <BasicModal
                        key={room.roomNum}
                        title={room.roomNum}
                        date={new Date(date).toString().substring(0, 15)}
                        startHour={startHour}
                        endHour={parseInt(startHour) + parseInt(duration) + ":00"}
                        peopleNum={peopleNum}
                        duration={duration}
                        roomTitle={room.roomTitle}
                        roomNum={room.roomNum}
                        uid={uid}
                        available={isRoomAvailable(room.roomNum)}
                        cleanAllFields={cleanAllFields}
                        moveToMyReservation={moveToMyReservation}
                    >
                    </BasicModal>
                )
            )
        )
    }
    return (
        <div>
            <div style={{textAlign: "center", fontWeight: "bold", fontSize: "1.5rem", marginBottom: "1rem"}}>
                Book a Room
            </div>
            <div className="roomsMobile">
                {rooms && roomsAvailableAfterFilter && getRooms()}

            </div>
        </div>
    );
}
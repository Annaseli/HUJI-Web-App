import { getDocRefFromReservations } from "./getDocRefFromReservations";

export default async function filterRoomsByDateAndTime(duration, year, month, day, hour, roomsAvailable) {
    console.log("FilterRooms4");

    let roomsAv = {};
    // for the given date and time, find all the rooms that are available
    const rooms = Object.keys(roomsAvailable);
    for (let j = 0; j < rooms.length; j++) {
        const roomNum = rooms[j];
        const { data } = await getDocRefFromReservations(year, month, day, roomNum);
        const roomCapacity = data.roomCapacity;
        let roomIsAv = true;
        for (let i = 0; i < parseInt(duration); i++) {
            // this hour is available
            const hourToPlace = `${parseInt(hour) + i}`.padStart(2, "0");
            if (Object.keys(data[hourToPlace]).length !== 0) {
                roomIsAv = false;
                break;
            }
        }
        if (roomIsAv) {
            roomsAv[roomNum] = roomCapacity;
        }
    }

    return roomsAv;
}

import getResDocs from "./getResDocs";

export default async function filterRoomsByDateAndTime(duration, year, month, day, hour, roomsAvailableByUserTypeAndCapAndDate) {
    console.log("filterRoomsByDateAndTime");
    let roomsAvailable = [];
    const roomsDocs = await getResDocs(year, month, day, roomsAvailableByUserTypeAndCapAndDate)

    // for the given date and time, find all the rooms that are available
    for (const roomDoc of roomsDocs) {
        const roomNum = roomDoc.roomNum
        const room = `${roomNum}`.padStart(2, '0');
        let roomIsAvailable = true;
        for (let i = 0; i < parseInt(duration); i++) {
            const PaddedHour = `${parseInt(hour) + i}`.padStart(2, '0');
            if (Object.keys(roomDoc[PaddedHour]).length !== 0) { // this hour is not available
                roomIsAvailable = false;
                break;
            }
        }
        if (roomIsAvailable) {
            roomsAvailable.push(roomNum);
        }
    }
    return roomsAvailable;
}

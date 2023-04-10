import { getDocRefFromReservations } from "./getDocRefFromReservations";

export default function filterRoomsByDateAndTime(duration, year, month, day, hour, roomsAvailable) {
    let roomsAv = {}
    let roomsAvailableByCapacity = roomsAvailable

    console.log("FilterRooms4")
    // for the given date and time, find all the rooms that are available
    Object.keys(roomsAvailableByCapacity).forEach(async (roomNum) => {
        const { data } = await getDocRefFromReservations(year, month, day, roomNum)
        const roomCapacity = data.roomCapacity;
        let roomIsAv = true
        for (let i = 0; i < parseInt(duration); i++) {
            // this hour is available
            let hourToPlace = `${parseInt(hour) + i}`
            if (parseInt(hour) + i < 10) {
                hourToPlace = `0${parseInt(hour) + i}`
            }
            if (Object.keys(data[hourToPlace]).length !== 0) {
                roomIsAv = false
                break
            }
        }
        if (roomIsAv){
            roomsAv[roomNum] = roomCapacity
        }
    })

    return roomsAv
}
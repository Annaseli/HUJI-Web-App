import { range } from "lodash";
import { getDocRefFromReservations } from "./getDocRefFromReservations";

export default async function filterRoomsByCapAndDur(capacity, duration, year, month, roomsAvailable) {
    console.log("FilterRooms2")
    let roomsAv = {}
    let datesAv = []
    let datesNotAv = []

    // filter out rooms that their capacity is less than the given capacity
    let roomsAvailableByCapacity = {}
    Object.keys(roomsAvailable).forEach((roomNum) => {
        const roomCapacity = roomsAvailable[roomNum]
        if (parseInt(roomCapacity) >= parseInt(capacity)){
            roomsAvailableByCapacity[roomNum] = roomCapacity
        }
    })

    const hours = range(8, 19)
    // for each day in the given month, for each available room, find all the hours that are available
    for (let day = 15; day < 32; day++) {
        const dayToUse = `${day}`.padStart(2, '0')
        datesNotAv.push(year + '-' + month + '-' + `${dayToUse}`)
        for (const roomNum of Object.keys(roomsAvailableByCapacity)) {
            const room = `${roomNum}`.padStart(2, "0");
            const { data } = await getDocRefFromReservations(year, month, dayToUse, roomNum)
            const roomCapacity = data.roomCapacity;
            let durationCounter = 0
            for (let i = 0; i < hours.length; i++) {
                // this hour is available
                const hourToCheck = `${hours[i]}`.padStart(2, '0')
                if (Object.keys(data[hourToCheck]).length === 0) {
                    durationCounter++
                    if (durationCounter === parseInt(duration)){
                        roomsAv[roomNum] = roomCapacity
                        datesAv.push(year + '-' + month + '-' + `${dayToUse}`)
                        break
                    }
                } else {
                    durationCounter = 0
                }
            }
        }
    }

    datesNotAv = datesNotAv.filter(date => !datesAv.includes(date));
    return { roomsAv, datesNotAv }
}

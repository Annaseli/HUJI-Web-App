import { range } from "lodash";
import { getDocRefFromReservations } from "./getDocRefFromReservations";

export default function filterRoomsByDate(duration, year, month, day, roomsAvailable) {
    let roomsAv = {}
    let hoursAv = new Set()
    let roomsAvailableByCapacity = roomsAvailable

    console.log("FilterRooms3")
    Object.keys(roomsAvailableByCapacity).forEach(async (roomNum) => {
        // for the given date, for each available room, find all the hours that are available
        const { data } = await getDocRefFromReservations(year, month, day, roomNum)
        const roomCapacity = data.roomCapacity;

        // find all the possible hours from which there are {duration} hours available in roomNum room in that date
        const hours = range(8, 18)
        let firstHourAvailable
        let lastHourAvailable
        let i = 0
        let findFirst = true

        while (i < hours.length) {
            let hourToCheck = `${hours[i]}`
            if (hours[i] < 10) {
                hourToCheck = `0${hours[i]}`
            }
            if (Object.keys(data[hourToCheck]).length === 0 && (i !== (hours.length - 1))) {
                if (findFirst){
                    firstHourAvailable = hours[i]
                    findFirst = false
                }
            } else {
                if (!findFirst) {
                    lastHourAvailable = hours[i]
                    let compareTo = parseInt(duration)
                    // if last hour is empty
                    if (Object.keys(data['18']).length === 0){
                        compareTo--
                    }
                    while (lastHourAvailable - firstHourAvailable >= compareTo){
                        hoursAv.add(`${firstHourAvailable}`)
                        roomsAv[roomNum] = roomCapacity
                        firstHourAvailable++
                    }
                    findFirst = true
                }
            }
            i++
        }
    })
    return { roomsAv, hoursAv }
}
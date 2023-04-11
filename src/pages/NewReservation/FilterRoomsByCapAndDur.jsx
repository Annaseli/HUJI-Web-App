import { range } from "lodash";
import { getDocRefFromReservations } from "./getDocRefFromReservations";
import {collection, doc, getDoc} from "firebase/firestore";
import {db} from "../../firebase/config";
import {createAnEmptyCollection} from "./createAnEmptyCollection";
import {useCollection} from "../../hooks/useCollection";

export default async function filterRoomsByCapAndDur(capacity, duration, year, month, roomsAvailable) {
    console.log("FilterRooms2")
    let roomsAv = {}
    let datesAv = new Set()

    // filter out rooms that their capacity is less than the given capacity
    let roomsAvailableByCapacity = {}
    Object.keys(roomsAvailable).forEach((roomNum) => {
        const roomCapacity = roomsAvailable[roomNum]
        if (parseInt(roomCapacity) >= parseInt(capacity)){
            roomsAvailableByCapacity[roomNum] = roomCapacity
        }
    })

    const hours = range(8, 18)
    // for each day in the given month, for each available room, find all the hours that are available
    for (let day = 1; day < 32; day++) {
        let dayToUse = `${day}`
        if (day < 10) {
            dayToUse = `0${day}`
        }
        for (const roomNum of Object.keys(roomsAvailableByCapacity)) {
            const { data } = await getDocRefFromReservations(year, month, dayToUse, roomNum)
            const roomCapacity = data.roomCapacity;
            let durationCounter = 0
            for (let i = 0; i < hours.length; i++) {
                // this hour is available
                let hourToCheck = `${hours[i]}`
                if (hours[i] < 10) {
                    hourToCheck = `0${hours[i]}`
                }
                if (Object.keys(data[hourToCheck]).length === 0) {
                    durationCounter++
                    if (durationCounter === parseInt(duration)){
                        roomsAv[roomNum] = roomCapacity
                        datesAv.add(`${dayToUse}-` + month + '-' + year)
                        break
                    }
                } else {
                    durationCounter = 0
                }
            }
        }
    }
    return { roomsAv, datesAv }
}

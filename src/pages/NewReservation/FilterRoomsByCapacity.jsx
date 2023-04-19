import { range } from "lodash";
import {getResDocs} from "./getResDocs";

export default async function filterRoomsByCapacity(capacity, year, month, roomsAvailableByUserType) {
    console.log("filterRoomsByCapacity")
    let roomsAvailableSet = new Set()
    let datesNotAvailable = []

    const hours = range(8, 19)
    // TODO - change the days here to run on the next 2 weeks
    // for each day in the given month, for each room, if the room is available add it to roomsAvailable and remove the date from datesNotAvailable
    for (let day = 1; day < 32; day++) {
        const paddedDay = `${day}`.padStart(2, '0')
        const fullDate = year + '-' + month + '-' + `${paddedDay}`

        const dateObject = new Date(fullDate)
        const dateObjectYear = dateObject.getFullYear()
        const dateObjectMonth = dateObject.getMonth()
        const dateObjectDay = dateObject.getDate()

        const curDate = new Date()
        const curYear = curDate.getFullYear()
        const curMonth = curDate.getMonth()
        const curDay = curDate.getDate()

        const numOfDayInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();

        const checkIfTheDatePassed = dateObjectYear < curYear ||
            (dateObjectYear === curYear && dateObjectMonth < curMonth) ||
            (dateObjectYear === curYear && dateObjectMonth === curMonth && dateObjectDay < curDay)
        // if the date has passed or it's friday or saturday do not check availability for this date
        if (dateObject.getDay() === 5 || dateObject.getDay() === 6 || day > numOfDayInMonth || checkIfTheDatePassed){
            console.log("continue")
            continue
        }
        console.log("after continue")
        datesNotAvailable.push(fullDate)
        const roomsDocs = await getResDocs(year, month, paddedDay, roomsAvailableByUserType)

        for (const roomDoc of roomsDocs) {
            const roomNum = roomDoc.roomNum
            const room = `${roomNum}`.padStart(2, "0");
            //const { data } = await getDocRefFromReservations(year, month, dayToUse, roomNum)
            //const roomCapacity = data.roomCapacity;
            if (parseInt(roomDoc.roomCapacity) < parseInt(capacity)){
                continue
            }
            for (let i = 0; i < hours.length; i++) {
                const hourToCheck = `${hours[i]}`.padStart(2, '0')
                if (Object.keys(roomDoc[hourToCheck]).length === 0) { // this hour is available
                    roomsAvailableSet.add(roomNum) // room is available
                    // the date is available ie there is at least one room that is available for at least 1 hour
                    datesNotAvailable.pop() // delete the last day added because it's an available date
                    break // no need to check all the hours if found 1 available
                }
            }
        }
    }
    const roomsAvailable = [...roomsAvailableSet]
    return { roomsAvailable, datesNotAvailable }
}
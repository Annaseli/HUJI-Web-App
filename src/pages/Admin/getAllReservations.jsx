import { range } from "lodash";
import {getResDocs} from "../NewReservation/getResDocs";
import {useCollection} from "../../hooks/useCollection";

export default async function getAllReservations(year, months, rooms) {
    console.log("allReservations")
    let allReservations = []
    let allRooms = rooms.map(roomDoc => roomDoc.roomNum)

    for (const month of months) {
        for (let day = 1; day < 32; day++) {
            const paddedDay = `${day}`.padStart(2, '0')
            const roomsDocs = await getResDocs(year, month, paddedDay, allRooms)
            for (const roomDoc of roomsDocs) {
                const roomNum = roomDoc.roomNum
                const room = `${roomNum}`.padStart(2, '0');
                for (let hour = 8; hour < 19; hour++) {
                    const paddedHour = `${hour}`.padStart(2, '0')
                    if (Object.keys(roomDoc[paddedHour]).length !== 0) {
                        console.log("roomsDocs[paddedHour]", roomDoc[paddedHour])
                        console.log("roomDoc[paddedHour][\"resId\"]", typeof roomDoc[paddedHour]["resId"])
                    }
                    allReservations.push({
                        resId: roomDoc[paddedHour]["resId"] || '',
                        date: new Date(roomDoc[paddedHour]["year"] + '-' + roomDoc[paddedHour]["month"] + '-' + roomDoc[paddedHour]["day"]) || '',
                        duration: roomDoc[paddedHour]["duration"] || '',
                        startHour: roomDoc[paddedHour]["startHour"] || '',
                        endHour: roomDoc[paddedHour]["endHour"] || '',
                        uid: roomDoc[paddedHour]["uid"] || '',
                        numOfPeople: roomDoc[paddedHour]["peopleNum"] || '',
                        roomNum: roomNum
                    })
                }
            }
        }
    }
    const myJSON = JSON.stringify(allReservations);
    console.log(myJSON);
}
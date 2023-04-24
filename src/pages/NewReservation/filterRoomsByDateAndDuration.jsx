import { range } from "lodash";
import { getResDocs } from "./getResDocs";

export default async function filterRoomsByDateAndDuration(duration, year, month, day, roomsAvailableByUserTypeAndCap) {
    console.log("filterRoomsByDateAndDuration");
    let roomsAvailableSet = new Set();
    let hoursAvailableSet = new Set();
    const hours = range(8, 19);
    const roomsDocs = await getResDocs(year, month, day, roomsAvailableByUserTypeAndCap)

    for (const roomDoc of roomsDocs) {
        const roomNum = roomDoc.roomNum
        const room = `${roomNum}`.padStart(2, '0');

        let firstHourAvailable = 0;
        let lastHourAvailable = 0;
        let findFirst = true;

        for (let j = 0; j < hours.length; j++) {
            const PaddedHour = `${hours[j]}`.padStart(2, '0');
            if (Object.keys(roomDoc[PaddedHour]).length === 0 && j !== hours.length - 1) {
                if (findFirst) {
                    firstHourAvailable = hours[j];
                    findFirst = false;
                }
            } else {
                if (!findFirst) {
                    lastHourAvailable = hours[j];
                    let compareTo = parseInt(duration);
                    if (Object.keys(roomDoc[`${lastHourAvailable}`.padStart(2, '0')]).length === 0) {
                        compareTo--;
                    }

                    while (lastHourAvailable - firstHourAvailable >= compareTo) {
                        hoursAvailableSet.add(`${firstHourAvailable}`);
                        roomsAvailableSet.add(roomNum);
                        firstHourAvailable++;
                    }
                    findFirst = true;
                }
            }
        }
    }
    const roomsAvailable = [...roomsAvailableSet]
    const hoursAvailable = [...hoursAvailableSet]
    return { roomsAvailable, hoursAvailable };
}

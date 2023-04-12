import { range } from "lodash";
import { getDocRefFromReservations } from "./getDocRefFromReservations";

export default async function filterRoomsByDate(duration, year, month, day, roomsAvailable) {
    let roomsAv = {};
    let hoursAv = new Set();
    let roomsAvailableByCapacity = roomsAvailable;

    console.log("FilterRooms3");

    const roomNumbers = Object.keys(roomsAvailableByCapacity);

    for (let i = 0; i < roomNumbers.length; i++) {
        const roomNum = roomNumbers[i];

        const { data } = await getDocRefFromReservations(year, month, day, roomNum);
        const roomCapacity = data.roomCapacity;

        const hours = range(8, 19);
        let firstHourAvailable = 0;
        let lastHourAvailable = 0;
        let findFirst = true;

        console.log("roomNum", roomNum);

        for (let j = 0; j < hours.length; j++) {
            const hourToCheck = `${hours[j]}`.padStart(2, "0");

            if (
                Object.keys(data[hourToCheck]).length === 0 &&
                j !== hours.length - 1
            ) {
                if (findFirst) {
                    firstHourAvailable = hours[j];
                    findFirst = false;
                }
            } else {
                if (!findFirst) {
                    lastHourAvailable = hours[j];
                    let compareTo = parseInt(duration);

                    if (Object.keys(data[`${lastHourAvailable}`.padStart(2, "0")]).length === 0) {
                        compareTo--;
                    }

                    while (lastHourAvailable - firstHourAvailable >= compareTo) {
                        hoursAv.add(`${firstHourAvailable}`);
                        console.log("hoursAv", hoursAv);
                        roomsAv[roomNum] = roomCapacity;
                        firstHourAvailable++;
                    }

                    findFirst = true;
                }
            }
        }
    }

    const hoursAva = [...hoursAv]
    return { roomsAv, hoursAva };
}

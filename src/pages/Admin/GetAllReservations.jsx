import getResDocs from "../NewReservation/getResDocs";

export default async function GetAllReservations(year, month, rooms) {
    console.log("getAllReservations")
    let allReservations = []
    let allRooms = rooms.map(roomDoc => roomDoc.roomNum)
    for (let day = 1; day < 32; day++) {
        const paddedDay = `${day}`.padStart(2, '0')
        const fullDate = year + '-' + month + '-' + `${paddedDay}`
        const dateObject = new Date(fullDate)
        const numOfDayInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();
        // if it's friday or saturday or there are less than 31 days in the month do not check availability for this date
        if (dateObject.getDay() === 5 || dateObject.getDay() === 6 || day > numOfDayInMonth ){
            continue
        }

        let roomsDocs;
        try {
            roomsDocs = await getResDocs(year, month, paddedDay, allRooms)
        } catch (error) {
            //setError(error.message || "unknown error occurred")
            console.log(error.message || "unknown error occurred")
        }

        for (const roomDoc of roomsDocs) {
            const roomNum = roomDoc.roomNum
            const room = `${roomNum}`.padStart(2, '0');
            for (let hour = 8; hour < 19; hour++) {
                const paddedHour = `${hour}`.padStart(2, '0')
                if (roomDoc[paddedHour]["resId"]) {
                    allReservations.push({
                        resId: roomDoc[paddedHour]["resId"],
                        year: roomDoc[paddedHour]["year"] || '',
                        month: roomDoc[paddedHour]["month"] || '',
                        day: roomDoc[paddedHour]["day"] || '',
                        duration: roomDoc[paddedHour]["duration"] || '',
                        startHour: roomDoc[paddedHour]["startHour"] || '',
                        endHour: roomDoc[paddedHour]["endHour"] || '',
                        uid: roomDoc[paddedHour]["uid"] || '',
                        numOfPeople: roomDoc[paddedHour]["peopleNum"] || '',
                        roomTitle: roomDoc[paddedHour]["roomTitle"] || '',
                        checkedIn: roomDoc[paddedHour]["checkedIn"] || 'false',
                        checkInTimeStamp: roomDoc[paddedHour]["checkInTimeStamp"] ?
                            roomDoc[paddedHour]["checkInTimeStamp"].toString() : ''
                    })
                }
            }
        }
    }
    return allReservations
}
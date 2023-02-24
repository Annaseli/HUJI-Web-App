

export const DB = {
    getRooms()  {
        return [
            {
                name: "A1",
                maxOccupancy: 2,
            },
            {
                name: "A2",
                maxOccupancy: 4,
            },
            {
                name: "A3",
                maxOccupancy: 8,
            },
            {
                name: "A4",
                maxOccupancy: 2,
            },
            {
                name: "A5",
                maxOccupancy: 10,
            },
            {
                name: "A6",
                maxOccupancy: 2,
            },
            {
                name: "A7",
                maxOccupancy: 4,
            },
            {
                name: "A8",
                maxOccupancy: 8,
            },
            {
                name: "A9",
                maxOccupancy: 2,
            },
        ];
    },
    isRoomAvailable(room, peopleNum) {
        return (parseInt(room.maxOccupancy) >= peopleNum)
    }


}
// styles

export default function DisplayRooms({ rooms, setSelectedRoomNum, setSelectedRoomCapacity, 
    roomsAvailable, setRoomsAvailable}) {
    return(
        <ul>
            {rooms.map((room) => (
                <li key={room.id}>
                    <p>{room.roomNum}</p>
                    <p>{room.capacity}</p>
                    <button
                        className="btn" 
                        onClick={() => {
                            if (roomsAvailable){
                                const arr = Array.from(roomsAvailable);
                                arr.push((room.roomNum, room.capacity))                        
                                setRoomsAvailable(arr)
                            }
                            if(setSelectedRoomNum)
                                setSelectedRoomNum(room.roomNum)
                            if(setSelectedRoomCapacity)
                                setSelectedRoomCapacity(room.capacity)                          
                            }}>
                        Select The Room
                    </button>
                </li>
            ))}
        </ul>
    )
}

export { DisplayRooms }
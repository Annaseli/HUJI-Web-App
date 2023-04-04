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
                                setRoomsAvailable(prevState => [...prevState, room.roomNum, room.capacity]); 
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

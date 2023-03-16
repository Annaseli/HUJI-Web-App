// styles

export default function DisplayRooms({ rooms, setSelectedRoomNum, setSelectedRoomCapacity}) {
    return(
        <ul>
            {rooms.map((room) => (
                <li key={room.id}>
                    <p>{room.roomNum}</p>
                    <p>{room.capacity}</p>
                    <button
                        className="btn" 
                        onClick={() => {
                            setSelectedRoomNum(room.roomNum)
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
import { useCollection } from "../../hooks/useCollection"

export default function FilterRooms() {
    // give me the doc where the user type us user's type so this 
    //doc.RoomsAv will be the array of rooms num I want
    //TODO: add a query where usetYype id staff
    const { docs: userTypeAvailableRooms } = useCollection('TypeOFUser')
    //I'll loop through this array and will give him map with room: av or not and capacity

    const [ selectedRoomNum, setSelectedRoomNum ] = useState('');
    const [ selectedRoomCapacity, setSelectedRoomCapacity ] = useState('');

    return(
        <ul>
            {rooms.map((room) => (
                <li key={room.id}>
                    <p>{room.roomNum}</p>
                    <p>{room.capacity}</p>
                    <button
                        className="btn" 
                        onClick={() => {setSelectedRoom(room.roomNum)}}>
                        Select The Room
                    </button>
                </li>
            ))}
        </ul>
    )
}
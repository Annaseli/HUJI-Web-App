import DisplayUsersRes from "../../components/DisplayUsersRes";
import { useCollection } from "../../hooks/useCollection";
import {SemiTitle} from "../../components/Title";

export default function AllReservations({allUsers}) {
    //const { docs: allUsers } = useCollection('Users')
    // allUsers.forEach(user => {
    //     console.log("uid in AllReservations", user.id)
    //     return DisplayUsersRes(user.id, 'All Reservations')
    // })
    return(
        <>
            <SemiTitle>{ "All Reservations" }</SemiTitle>
            {(allUsers).map(user => (
                <div key={user.id}>
                    {<DisplayUsersRes uid={user.id} header={null} displayCheckIn={false} />}
                </div>
            ))}
        </>
    )
}
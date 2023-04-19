import DisplayUsersRes from "../../components/DisplayUsersRes";
import { useCollection } from "../../hooks/useCollection";
import {SemiTitle} from "../../components/Title";

export default function AllReservations({allUsers}) {
    return(
        <>
            <SemiTitle>{ "All Reservations" }</SemiTitle>
            {(allUsers).map(user => (
                <div key={user.id}>
                    {<DisplayUsersRes uid={user.id} header={null} moveToNewReservation={() => {return 0}} />}
                </div>
            ))}
        </>
    )
}
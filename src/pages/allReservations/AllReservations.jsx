import DisplayUsersRes from "../../components/DisplayUsersRes";
import { SemiTitle } from "../../components/Title";

export default function AllReservations({allUsers}) {
    return(
        <>
            <SemiTitle>{ "All Reservations" }</SemiTitle>
            {(allUsers).map(user => (
                <div key={user.id}>
                    {<DisplayUsersRes uid={user.id} header={""} />}
                    <br /> {/* HTML line break */}
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
            ))}
        </>
    )
}
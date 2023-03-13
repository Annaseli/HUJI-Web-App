import { useAuthContext } from "../../hooks/useAuthContext"
import { useCollection } from "../../hooks/useCollection"

// styles

export default function UsersReservations() {
    const { user } = useAuthContext()
    const { docs, error } = useCollection('collection name')

    return ()

    
}
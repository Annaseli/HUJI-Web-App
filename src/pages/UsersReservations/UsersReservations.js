import { useAuthContext } from "../../hooks/useAuthContext"
import { useColl } from "../../hooks/useColl"

// styles

export default function UsersReservations() {
    const { user } = useAuthContext()
    const { docs, error } = useColl('collection name')

    //return ()

    
}
import { useState } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"
import ReservationForm from "./ReservationForm"

// styles
import styles from './Home.module.css'

export default function Home() {
    const { user } = useAuthContext()

    return (
        // code..
        <ReservationForm uid={user.id} />
        // code..
    )
}
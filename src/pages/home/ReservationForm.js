import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";

export default function ReservationForm({ uid }) {
    const [duration, setDuration] = useState('')
    const [capacity, setCapacity] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const { addDoc, response } = useFirestore('DateTimeRes')

    const handleSubmit = (event) => {
        event.preventDefault()
        addDoc({
            //TODO back: add a doc as I planned using uid, duration, capacity ...
        })
    }

    // when we have a successful response fire this function and reset it if it's true
    useEffect(() => {
        if (response.success) {
            setDuration('')
            setCapacity('')
            setDate('')
            setTime('')
        }
    }, [response.success])

    return()
}
import { useEffect, useState } from "react";
import filterRoomsByUserType from "../pages/NewReservation/FilterRoomsByUserType";
import filterRoomsByDateAndDuration from "../pages/NewReservation/filterRoomsByDateAndDuration";
import filterRoomsByDateAndTime from "../pages/NewReservation/filterRoomsByDateAndTime";
import filterRoomsByCapacity from "../pages/NewReservation/FilterRoomsByCapacity";

export default function useFilters(userType, uid, resetFields, peopleNum, duration, date, startHour, monthToCheck,
                                   yearToCheck, moveMonth, setMoveMonth, setHoursAvailable, setDatesNotAvailable) {
    const [roomsAvailableAfterFilter, setRoomsAvailableAfterFilter] = useState([]);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [isCancelled, setIsCancelled] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setError(null)
            setIsPending(true)
            try {
                const roomsAvailableByUserType = await filterRoomsByUserType(userType);
                console.log("roomsAvailableByUserType", roomsAvailableByUserType)
                setRoomsAvailableAfterFilter(roomsAvailableByUserType);
                console.log(isCancelled, "is cancelled")
                if (!isCancelled) {
                    console.log(isCancelled, "is not cancelled")

                    setError(null)
                    setIsPending(false)
                }
            } catch(error) {
                if (!isCancelled) {
                    setError(error.message)
                    setIsPending(false)
                }
            }
        }
        fetchData();
    }, [uid, resetFields]);

    useEffect(() => {
        // todo: when the user wants to change some param in the res, and nor start from the beginning it should work
        async function fetchData() {
            setError(null)
            setIsPending(true)
            try {
                if(date) {
                    const dayObject = new Date(date)
                    const year = `${dayObject.getFullYear()}`
                    const month = `${dayObject.getMonth() + 1}`.padStart(2, '0')
                    const day = `${dayObject.getDate()}`.padStart(2, '0')

                    if (peopleNum && duration && !startHour) {
                        const { roomsAvailable, hoursAvailable } = await filterRoomsByDateAndDuration(
                            duration, year, month, day, roomsAvailableAfterFilter);
                        console.log("roomsAvailable", roomsAvailable)
                        console.log("hoursAvailable", hoursAvailable)
                        // TODO - front: disable hours until it fetches the data and show some pending sign to the user
                        setRoomsAvailableAfterFilter(roomsAvailable);
                        setHoursAvailable(hoursAvailable)
                        // TODO: front if hoursAvailable is empty then tell the user to pick a different date or a smaller duration
                    } else if (peopleNum && duration && startHour) {
                        const roomsAvailable = await filterRoomsByDateAndTime(
                            duration, year, month, day, startHour, roomsAvailableAfterFilter);
                        console.log("roomsAvailable", roomsAvailable)
                        setRoomsAvailableAfterFilter(roomsAvailable);
                    }
                    console.log(isCancelled, "is cancelled if data()")
                }
                else if ((!date && peopleNum && !duration) ||
                    (moveMonth && peopleNum && duration && !date && !startHour)) {
                    const { roomsAvailable, datesNotAvailable } = await filterRoomsByCapacity(
                        peopleNum, yearToCheck, monthToCheck, roomsAvailableAfterFilter);
                    console.log("roomsAvailable", roomsAvailable)
                    console.log("datesNotAvailable", datesNotAvailable)
                    // TODO - front: disable dates and duration until it fetches the data and show some pending sign to the user
                    setRoomsAvailableAfterFilter(roomsAvailable);
                    setDatesNotAvailable(datesNotAvailable)
                    setMoveMonth(false)
                }
                console.log(isCancelled, "is cancelled else if data()")

                if (!isCancelled) {
                    setError(null)
                    setIsPending(false)
                }

            } catch(error) {
                if (!isCancelled) {
                    setError(error.message)
                    setIsPending(false)
                }
            }
        }
        roomsAvailableAfterFilter && fetchData();
        return () => setIsCancelled(true)
    }, [uid, peopleNum, duration, date, startHour, monthToCheck])

    return { roomsAvailableAfterFilter, error, isPending }
};
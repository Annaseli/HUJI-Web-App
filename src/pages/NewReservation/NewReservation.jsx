import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers";
import Box from "@mui/material/Box";
import { add, isSameDay } from 'date-fns';
import { CircularProgress } from '@material-ui/core';

// styles
import "./NewReservation.css";

// components & custom hooks
import BasicModal from "../../components/Modal";
import { useCollection } from "../../hooks/useCollection";
import filterRoomsByUserType from "./FilterRoomsByUserType";
import filterRoomsByCapacity from "./FilterRoomsByCapacity";
import filterRoomsByDateAndDuration from "./filterRoomsByDateAndDuration";
import filterRoomsByDateAndTime from "./filterRoomsByDateAndTime";
import useFilters from "../../hooks/useFilters";

export default function NewReservation({ uid, userType, moveToMyReservation, rooms }) {
    const [date, setDate] = useState("");
    const curDate = new Date();
    let curMonth = `${curDate.getMonth() + 1}`.padStart(2, '0')
    let curYear = `${curDate.getFullYear()}`;
    const [yearToCheck, setYearToCheck] = useState(curYear);
    const [monthToCheck, setMonthToCheck] = useState(curMonth);
    const [moveMonth, setMoveMonth] = useState(false);
    const [peopleNum, setPeopleNum] = useState("");
    const [duration, setDuration] = useState("");
    const [startHour, setStartHour] = useState("");
    const [datesNotAvailable, setDatesNotAvailable] = useState([]);
    const [hoursAvailable, setHoursAvailable] = useState([]);
    const [resetFields, setResetFields] = useState(false)
    const maxDate = add(curDate, {months: 3});
    rooms.sort((a, b) => a.roomNum - b.roomNum);

    const { roomsAvailableAfterFilter, error, isPending, setIsPending } = useFilters(
        userType, uid, resetFields, peopleNum, duration, date, startHour, monthToCheck, yearToCheck, moveMonth,
        setMoveMonth, setHoursAvailable, setDatesNotAvailable)

    useEffect(() => {
        if (hoursAvailable.length === 0) {
            return
        }
        let options = []
        // console.log("h:" , hoursAvailable)
        hoursAvailable.forEach(hour_val => {
            options.push({label: hour_val + ":00", value: hour_val})
        })

        setStartTimesOptions(options)
        // Object.keys(userReservations).forEach(res => {
        // hoursAvailable.forEach()

    }, [hoursAvailable]);
    const [peopleNumOptions, setPeopleNumOptions] = useState([
        {label: "", value: ""},
        {label: "1 person", value: 1},
        {label: "2 people", value: 2},
        {label: "3 people", value: 3},
        {label: "4 people", value: 4},
        {label: "5 people", value: 5},
        {label: "6 people", value: 6},
        {label: "7 people", value: 7},
        {label: "8 people", value: 8},
        {label: "9 people", value: 9},
        {label: "10 people", value: 10},
        {label: "11 people", value: 11},
        {label: "12 people", value: 12},
        {label: "13 people", value: 13},
        {label: "14 people", value: 14},
        {label: "15 people", value: 15}
    ]);

    const [durationsOptions, setDurationOptions] = useState([
        {label: "", value: ""},
        {label: "1 hour", value: 1},
        {label: "2 hours", value: 2},
        {label: "3 hours", value: 3},
        {label: "4 hours", value: 4},
        {label: "5 hours", value: 5},
        {label: "6 hours", value: 6}
    ]);

    const [startTimesOptions, setStartTimesOptions] = useState([
        {label: "", value: ""},
        {label: "", value: ""},
        {label: "8:00", value: 8},
        {label: "9:00", value: 9},
        {label: "10:00", value: 10},
        {label: "11:00", value: 11},
        {label: "12:00", value: 12},
        {label: "13:00", value: 13},
        {label: "14:00", value: 14},
        {label: "15:00", value: 15},
        {label: "16:00", value: 16},
        {label: "17:00", value: 17},
        {label: "18:00", value: 18}
    ]);

    function disableDates(date) {
        const dayObject = new Date(date);
        let day = dayObject.getDay();
        return day === 5 || day === 6 || datesNotAvailable.some(
            disabledDate => isSameDay(dayObject, new Date(disabledDate)));
    }

    const handleStartHourChange = (event) => {
        setStartHour(event.target.value);
    };

    function handleDurationChange(event) {
        setDuration(event.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleChangePeople = (e) => {
        setPeopleNum(e.target.value);
    };

    const cleanAllFields = async () => {
        setPeopleNum("")
        setDuration("")
        setDate("")
        setStartHour("")
        setResetFields(true)
    }


    const isRoomAvailable = (roomNum) => {
        return roomsAvailableAfterFilter.includes(roomNum)
    }

    const handleDateChange = (date) => {
        setDate(date);
    };

    const handleMonthChange = (date) => {
        const moveMonthByOne = (parseInt(monthToCheck) + 1) % 12
        setMonthToCheck(`${moveMonthByOne === 0 ? 12 : moveMonthByOne}`.padStart(2, '0'))
        setYearToCheck(`${monthToCheck === '1' ? `${parseInt(yearToCheck) + 1}` : yearToCheck}`)
        setMoveMonth(true)
    };

    const getRooms = () => {
        return (rooms.map((room) => (
                <BasicModal
                    key={room.roomNum}
                    title={room.roomNum}
                    date={new Date(date).toString().substring(0, 15)}
                    startHour={startHour}
                    endHour={parseInt(startHour) + parseInt(duration) + ":00" }
                    peopleNum={peopleNum}
                    duration={duration}
                    roomNum={room.roomNum}
                    uid={uid}
                    available={isRoomAvailable(room.roomNum)}
                    cleanAllFields={cleanAllFields}
                    moveToMyReservation={moveToMyReservation}
                >
                </BasicModal>
            ))
        )
    }
    const bookARoom = () => {
        if (isPending) {
            return (
                <div className="loading" style={{ height: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <CircularProgress> loading... </CircularProgress>
                </div>
            );

        } else {
            return (
                <div>
                    <div style={{textAlign: "center", fontWeight: "bold", fontSize: "1.5rem", marginBottom: "1rem"}}>
                        Book a Room
                    </div>
                    <div className="rooms">
                        {rooms && roomsAvailableAfterFilter && getRooms()}
                    </div>
                </div>
            );
        }
    }

    const handleClick = () => {
        console.log(isPending);
    }

    return (
        <div className="test">
            <div className="container">
                <div className="content">
                    <div className="text">Find a Room</div>
                    <div className="form2">
                        <form action="" >
                            <label htmlFor="book-people">Number of People</label>
                            <select
                                onChange={handleChangePeople}
                                style={{padding: '10px', borderRadius: '5px', border: '1px solid #ccc'}}
                                value={peopleNum}
                                disabled={isPending}
                            >
                                {peopleNumOptions.map((peopleNum) => (
                                    <option key={peopleNum.value} value={peopleNum.value}>
                                        {peopleNum.label}
                                    </option>
                                ))}
                            </select>
                            <div style={{display: 'flex', flexDirection: 'column'}}>


                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Box sx={{marginTop: '15px', marginBottom: '15px'}}>
                                    <label htmlFor="startDate">Date</label>
                                    <DatePicker
                                        type="date"
                                        id="startDate"
                                        value={date}
                                        onChange={handleDateChange}
                                        onMonthChange={handleMonthChange}
                                        renderInput={(params) => <TextField {...params} />}
                                        sx={{display: 'flex', marginTop: '15px'}}
                                        minDate={curDate}
                                        maxDate={maxDate}
                                        shouldDisableDate={disableDates}
                                        disabled={!peopleNum || isPending} // disable the select input if peopleNum is not set
                                    />
                                </Box>
                            </LocalizationProvider>

                                <label style={{marginBottom: '5px'}}>Duration </label>
                                <select
                                    onChange={handleDurationChange}
                                    style={{padding: '10px', borderRadius: '5px', border: '1px solid #ccc'}}
                                    disabled={!peopleNum || !date || isPending }
                                    value={duration}
                                >
                                    {durationsOptions.map((duration) => (
                                        <option key={duration.value} value={duration.value}>
                                            {duration.label}
                                        </option>
                                    ))}
                                </select>
                                <label style={{marginBottom: '5px'}}>Available Hours (Starting Time)  </label>
                                <select
                                    onChange={handleStartHourChange}
                                    style={{padding: '10px', borderRadius: '5px', border: '1px solid #ccc'}}
                                    disabled={!duration || !date || isPending} // disable the select input if startHour is not set
                                    value={startHour}
                                >
                                    {startTimesOptions.map((time) => (
                                        <option key={time.value} value={time.value
                                        }>
                                            {time.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div>
                {bookARoom()}
            </div>
            {error && <p>{error}</p>}
        </div>
    );
}
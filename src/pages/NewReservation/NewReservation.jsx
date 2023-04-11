import React, {useState, useRef, useEffect} from "react";
import {Button} from "../../components/Button";
import {Room} from "../../components/Room";
import BasicModal from "../../components/Modal";
import {DB} from "../../DB_TEST"
import "./NewReservation.css";
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {TextField, useMediaQuery} from "@mui/material";
import dayjs, {Dayjs} from 'dayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import {DatePicker, DesktopTimePicker, MobileTimePicker} from "@mui/x-date-pickers";
import Box from "@mui/material/Box";
// import {InputLabel, Select} from "@material-ui/core";
import MenuItem from "@mui/material/MenuItem";
import {add, isSameDay} from 'date-fns';

// custom hooks
import {useCollection} from "../../hooks/useCollection";
import filterRoomsByUserType from "./filterRoomsByUserType";
import filterRoomsByCapAndDur from "./filterRoomsByCapAndDur";
import filterRoomsByDate from "./filterRoomsByDate";
import filterRoomsByDateAndTime from "./filterRoomsByDateAndTime";
import confirmReservation from "./confirmReservation";
import {collection, doc, getDoc} from "firebase/firestore";
import {db} from "../../firebase/config";

export default function NewReservation({ uid }) {
    //const [rooms, setRooms] = useState(DB.getRooms());
    const { docs: rooms } = useCollection('Rooms')
    const [roomsAvailable, setRoomsAvailable] = useState({});
    const [peopleNum, setPeopleNum] = useState("");
    const [date, setDate] = useState("");
    const [duration, setDuration] = useState("");
    // const [endTime, setEndTime] = useState("");
    const peopleInputRef = useRef(1);
    // const [DateAndTime, setDateAndTime] = useState(dayjs('2022-08-18T21:11:54'));
    // const [isFormValid, setIsFormValid] = useState(false);
    const [isCancelled, setIsCancelled] = useState(false)
    // const [error, setError] = useState(null)

    const [durationsOptions, setDurationOptions] = useState([
        {label: "", value: ""},
        {label: '1 hour', value: 1},
        {label: '2 hour', value: 2},
    ]);

    const [startTimesOptions, setStartTimesOptions] = useState([
        {label: '8:00', value: 8},
        {label: '9:00', value: 9},
        {label: '10:00', value: 10},
        {label: '11:00', value: 11},
        {label: '12:00', value: 12},
        {label: '13:00', value: 13},
        {label: '14:00', value: 14},
        {label: '15:00', value: 15},
        {label: '16:00', value: 16},
        {label: '17:00', value: 17},
        {label: '18:00', value: 18}
    ]);
    const [startHour, setStartHour] = useState("");
    const currentDate = new Date();
    let month = `${currentDate.getMonth() + 1}`;
    if (currentDate.getMonth() + 1 < 10) {
        month = `0${currentDate.getMonth() + 1}`;
    }
    let year = `${currentDate.getFullYear()}`;

    const maxDate = add(currentDate, {months: 1});

    const disabledDates_arr = [
        new Date('2023-04-03'),
        new Date('2023-04-04'),
        new Date('2023-04-02'),
        new Date('2023-05-10')
    ];

    function disableDates(date) {
        const d = new Date(date);
        let day = d.getDay();
        return day === 5 || day === 6 || disabledDates_arr.some(disable_date => isSameDay(d, disable_date));
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

    useEffect(() => {
        async function fetchData() {
            try {
                const roomsAvailable = await filterRoomsByUserType(uid);
                setRoomsAvailable(roomsAvailable);
                if (!isCancelled) {
                    setError(null)
                }
            } catch(error) {
                if (!isCancelled) {
                    console.log(error.message)
                    setError(error.message)
                }
            }
        }
        fetchData();
        return () => setIsCancelled(true)
    }, [uid]);

    roomsAvailable && useEffect(() => {
        async function fetchData() {
            try {
                console.log(peopleNum, duration, startDate)
                if (peopleNum && duration && !startDate) {
                    const { roomsAv, datesAv } = await filterRoomsByCapAndDur(peopleNum, duration, year, month, roomsAvailable);
                    console.log("roomsAv", roomsAv)
                    setRoomsAvailable(roomsAv);
                } else if (peopleNum && duration && startDate && !startTime) {
                    const { roomsAv, hoursAv } = await filterRoomsByDate(duration, year, month, startDate.D, roomsAvailable);
                    setRoomsAvailable(roomsAv);
                } else if (peopleNum && duration && date && startTime) {
                    const { roomsAv, hoursAv } = await filterRoomsByDateAndTime(duration, year, month, startDate.D, startTime, roomsAvailable);
                    setRoomsAvailable(roomsAv);
                }
                // } else {
                //     setRoomsAvailable(roomsAvailable);
                // }
                if (!isCancelled) {
                    setError(null)
                }
            } catch(error) {
                if (!isCancelled) {
                    console.log(error.message)
                    setError(error.message)
                }
            }
        }
        fetchData();
        return () => setIsCancelled(true)
    }, [uid, peopleNum, duration, startDate, startTime]);

    const isRoomAvailable = (roomNum) => {
        //return DB.isRoomAvailable(room, peopleNum) // date and time
        return Object.keys(roomsAvailable).includes(roomNum)
    }

    //TODO - think with matan how to render it differently so the run time would decrease.
    // Now for wach room in all rooms we are searching if it's in the roomsAvailable list.
    const getRooms = () => {
        //console.log("date", date)
        return (rooms.map((room) => (
                <BasicModal
                    key={room.roomNum}
                    title={room.roomNum}
                    date={new Date(date).toString()}
                    startTime={startHour + ":00"}
                    endTime={parseInt(startHour) + parseInt(duration) + ":00" }
                    peopleNum={peopleNum}
                    duration={duration}
                    uid={uid}
                    available={isRoomAvailable(room.roomNum)}
                >
                </BasicModal>
            ))
        )
    }

    const handleStartDateChange = (date) => {
        setDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        setIsFormValid(validateDateRange(startHour, date));
    };

    const validateDateRange = (startDate, endDate) => {
        return startDate && endDate && startDate <= endDate;
    };
    const mediaQuery = useMediaQuery('(min-width:600px)');

    const TimePickerComponent = mediaQuery ? DesktopTimePicker : MobileTimePicker;

    const pickerProps = {
        // ampm: false,
        minutesStep: 60,
    };
    return (
        <div className="test">
            <div className="container">
                <div className="content">
                    <div className="text">Find a Room</div>
                    <div className="form2">
                        <form action="" onSubmit={handleSubmit}>
                            <label htmlFor="book-people">Number of People</label>
                            <input
                                type="number"
                                name=""
                                id="book-people"
                                min="1"
                                max="10"
                                onChange={handleChangePeople}
                                ref={peopleInputRef}
                            />
                            <div style={{display: 'flex', flexDirection: 'column'}}>

                            <label style={{marginBottom: '5px'}}>Duration </label>
                            <select
                                onChange={handleDurationChange}
                                style={{padding: '10px', borderRadius: '5px', border: '1px solid #ccc'}}
                                disabled={!peopleNum} // disable the select input if peopleNum is not set
                                value={duration}
                            >
                                {durationsOptions.map((duration) => (
                                    <option key={duration.value} value={duration.value
                                    }>
                                        {duration.label}
                                    </option>
                                ))}
                            </select>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Box sx={{marginTop: '15px', marginBottom: '15px'}}>
                                    <label htmlFor="startDate">Date</label>
                                    <DatePicker
                                        type="date"
                                        id="startDate"
                                        value={date}
                                        onChange={handleStartDateChange}
                                        renderInput={(params) => <TextField {...params} />}
                                        sx={{display: 'flex', marginTop: '15px'}}
                                        minDate={currentDate}
                                        maxDate={maxDate}
                                        shouldDisableDate={disableDates}
                                        disabled={!duration}
                                    />
                                </Box>
                            </LocalizationProvider>

                                <label style={{marginBottom: '5px'}}>Available Hours (Starting Time)  </label>
                                <select
                                    onChange={handleStartHourChange}
                                    style={{padding: '10px', borderRadius: '5px', border: '1px solid #ccc'}}
                                    disabled={!date} // disable the select input if startHour is not set
                                    value={date}
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
                <div style={{textAlign: "center", fontWeight: "bold", fontSize: "1.5rem", marginBottom: "1rem"}}>
                    Book a Room
                </div>
                <div className="rooms">
                    {rooms && roomsAvailable && getRooms()}
                    {/*{useEffect(() => {*/}
                    {/*    getRooms()*/}
                    {/*}, [rooms, roomsAvailable])}*/}
                </div>
            </div>
        </div>
    );
}
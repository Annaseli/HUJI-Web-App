import {useState, useRef, useEffect} from "react";
import BasicModal from "../../components/Modal";
import "./NewReservation.css";
import {TextField, useMediaQuery} from "@mui/material";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker, DesktopTimePicker, MobileTimePicker} from "@mui/x-date-pickers";
import Box from "@mui/material/Box";
import {add, isSameDay} from 'date-fns';

// custom hooks
import {useCollection} from "../../hooks/useCollection";
import filterRoomsByUserType from "./FilterRoomsByUserType";
import filterRoomsByCapAndDur from "./FilterRoomsByCapAndDur";
import filterRoomsByDate from "./filterRoomsByDate";
import filterRoomsByDateAndTime from "./filterRoomsByDateAndTime";

export default function NewReservation({ uid }) {
    //const [rooms, setRooms] = useState(DB.getRooms());
    const { docs: rooms } = useCollection('Rooms')
    const [roomsAvailable, setRoomsAvailable] = useState({});
    const [peopleNum, setPeopleNum] = useState("");
    const [date, setDate] = useState("");
    const [duration, setDuration] = useState("");
    const [startHour, setStartHour] = useState("");
    const [datesNotAv, setDatesNotAv] = useState([]);
    const [hoursAv, setHoursAv] = useState([]);
    const peopleInputRef = useRef(1);
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)

    const [durationsOptions, setDurationOptions] = useState([
        {label: "", value: ""},
        {label: '1 hour', value: 1},
        {label: '2 hours', value: 2},
        {label: '3 hours', value: 3},
        {label: '4 hours', value: 4},
        {label: '5 hours', value: 5},
        {label: '6 hours', value: 6}
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

    const curDate = new Date();
    let curMonth = `${curDate.getMonth() + 1}`;
    if (curDate.getMonth() + 1 < 10) {
        curMonth = `0${curDate.getMonth() + 1}`;
    }
    let curYear = `${curDate.getFullYear()}`;

    const maxDate = add(curDate, {months: 1});

    function disableDates(date) {
        const dayObject = new Date(date);
        let day = dayObject.getDay();
        return day === 5 || day === 6 || datesNotAv.some(disabledDate => isSameDay(dayObject, new Date(disabledDate)));
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

    // TODO: lear the fields after reservation is made
    roomsAvailable && useEffect(() => {
        async function fetchData() {
            try {
                let year;
                let month;
                let day;
                if (date) {
                    const dayObject = new Date(date)
                    year = `${dayObject.getFullYear()}`
                    month = `${dayObject.getMonth() + 1}`.padStart(2, '0')
                    day = `${dayObject.getDate()}`.padStart(2, '0')
                }
                // when date is not null it's an object that we covert to Date object
                if (peopleNum && duration && !date) {
                    const { roomsAv, datesNotAv } = await filterRoomsByCapAndDur(peopleNum, duration, curYear, curMonth, roomsAvailable);
                    // TODO - front: disable dates until it fetches the data and show some pending sign to the user
                    console.log("roomsAv1", roomsAv)
                    console.log("datesNotAv", datesNotAv)
                    setRoomsAvailable(roomsAv);
                    setDatesNotAv(datesNotAv)
                } else if (peopleNum && duration && date && !startHour) {
                    const { roomsAv, hoursAva } = await filterRoomsByDate(duration, year, month, day, roomsAvailable);
                    // TODO - front: disable hours until it fetches the data and show some pending sign to the user
                    console.log("roomsAv2", roomsAv)
                    console.log("hoursAva", hoursAva)
                    setRoomsAvailable(roomsAv);
                    setHoursAv(hoursAva)
                } else if (peopleNum && duration && date && startHour) {
                    const roomsAv = await filterRoomsByDateAndTime(duration, year, month, day, startHour, roomsAvailable);
                    console.log("roomsAv3", roomsAv)
                    setRoomsAvailable(roomsAv);
                }
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
    }, [uid, peopleNum, duration, date, startHour]);

    const isRoomAvailable = (roomNum) => {
        //return DB.isRoomAvailable(room, peopleNum) // date and time
        return Object.keys(roomsAvailable).includes(roomNum)
    }

    //TODO - think with matan how to render it differently so the run time would decrease.
    // Now for wach room in all rooms we are searching if it's in the roomsAvailable list.
    const getRooms = () => {
        return (rooms.map((room) => (
                <BasicModal
                    key={room.roomNum}
                    title={room.roomNum}
                    date={new Date(date).toString()}
                    startHour={startHour}
                    endHour={parseInt(startHour) + parseInt(duration) + ":00" }
                    peopleNum={peopleNum}
                    duration={duration}
                    uid={uid}
                    available={isRoomAvailable(room.roomNum)}
                >
                </BasicModal>
            ))
        )
    }

    const handleDateChange = (date) => {
        setDate(date);
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
                                        onChange={handleDateChange}
                                        renderInput={(params) => <TextField {...params} />}
                                        sx={{display: 'flex', marginTop: '15px'}}
                                        minDate={curDate}
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
                </div>
            </div>
        </div>
    );
}
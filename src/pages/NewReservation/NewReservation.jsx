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
import filterRoomsByCapacity from "./FilterRoomsByCapacity";
import filterRoomsByDateAndDuration from "./filterRoomsByDateAndDuration";
import filterRoomsByDateAndTime from "./filterRoomsByDateAndTime";
import {useNavigate} from "react-router";
import {Button} from "../../components/Button";

export default function NewReservation({ uid, userType, moveToMyReservation }) {
    //const [rooms, setRooms] = useState(DB.getRooms());
    const { docs: rooms } = useCollection('Rooms')
    const [roomsAvailableAfterFilter, setRoomsAvailableAfterFilter] = useState([]);
    const [peopleNum, setPeopleNum] = useState("");
    const [date, setDate] = useState("");
    const curDate = new Date();
    let curMonth = `${curDate.getMonth() + 1}`.padStart(2, '0')
    let curYear = `${curDate.getFullYear()}`;
    const [yearToCheck, setYearToCheck] = useState(curYear);
    const [monthToCheck, setMonthToCheck] = useState(curMonth);
    const [moveMonth, setMoveMonth] = useState(false);
    const [duration, setDuration] = useState("");
    const [startHour, setStartHour] = useState("");
    const [datesNotAvailable, setDatesNotAvailable] = useState([]);
    const [hoursAvailable, setHoursAvailable] = useState([]);
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [resetFields, setResetFields] = useState(false)


    const [peopleNumOptions, setPeopleNumOptions] = useState([
        {label: "", value: ""},
        {label: '1 person', value: 1},
        {label: '2 people', value: 2},
        {label: '3 people', value: 3},
        {label: '4 people', value: 4},
        {label: '5 people', value: 5},
        {label: '6 people', value: 6},
        {label: '7 people', value: 7},
        {label: '8 people', value: 8},
        {label: '9 people', value: 9},
        {label: '10 people', value: 10}
    ]);

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
        {label: "", value: ""},
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

    const maxDate = add(curDate, {months: 6});

    function disableDates(date) {
        const dayObject = new Date(date);
        let day = dayObject.getDay();
        return day === 5 || day === 6 || datesNotAvailable.some(disabledDate => isSameDay(dayObject, new Date(disabledDate)));
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

    useEffect(() => {
        async function fetchData() {
            try {
                const roomsAvailableByUserType = await filterRoomsByUserType(userType);
                setRoomsAvailableAfterFilter(roomsAvailableByUserType);
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
    }, [uid, resetFields]);

    useEffect(() => {
        // todo: when the user wants to change some param in the res, and nor start from the begining it should work
        async function fetchData() {
            try {
                // TODO: front if hoursAvailable is empty then tell the user this month has no available dates for this capacity
                if(date) {
                    const dayObject = new Date(date)
                    const year = `${dayObject.getFullYear()}`
                    const month = `${dayObject.getMonth() + 1}`.padStart(2, '0')
                    const day = `${dayObject.getDate()}`.padStart(2, '0')

                    if (peopleNum && duration && !startHour) {
                        const { roomsAvailable, hoursAvailable } = await filterRoomsByDateAndDuration(duration, year, month, day, roomsAvailableAfterFilter);
                        // const { roomsAvailable, hoursAvailable } = await filterRoomsByDateAndDuration(duration, '2023', '08', day, roomsAvailableAfterFilter);
                        // TODO - front: disable hours until it fetches the data and show some pending sign to the user
                        setRoomsAvailableAfterFilter(roomsAvailable);
                        setHoursAvailable(hoursAvailable)
                    // TODO: front if hoursAvailable is empty then tell the user to pick a different date or a smaller duration
                    } else if (peopleNum && duration && startHour) {
                        const roomsAvailable = await filterRoomsByDateAndTime(duration, year, month, day, startHour, roomsAvailableAfterFilter);
                        // const roomsAvailable = await filterRoomsByDateAndTime(duration, '2023', '08', day, startHour, roomsAvailableAfterFilter);
                        setRoomsAvailableAfterFilter(roomsAvailable);
                    }
                }
                else if ((!date && peopleNum && !duration) || (moveMonth && peopleNum && duration && !date && !startHour)) {
                    const { roomsAvailable, datesNotAvailable } = await filterRoomsByCapacity(peopleNum, yearToCheck, monthToCheck, roomsAvailableAfterFilter);
                    // const { roomsAvailable, datesNotAvailable } = await filterRoomsByCapacity(peopleNum, '2023', '08', roomsAvailableAfterFilter);
                    // TODO - front: disable dates and duration until it fetches the data and show some pending sign to the user
                    setRoomsAvailableAfterFilter(roomsAvailable);
                    setDatesNotAvailable(datesNotAvailable)
                    // TODO: front if hoursAvailable is empty then tell the user this month has no available dates for this capacity
                    setMoveMonth(false)
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
        roomsAvailableAfterFilter && fetchData();
        return () => setIsCancelled(true)
    }, [uid, peopleNum, duration, date, startHour, monthToCheck])

    const isRoomAvailable = (roomNum) => {
        //return DB.isRoomAvailable(room, peopleNum) // date and time
        return roomsAvailableAfterFilter.includes(roomNum)
    }

    //TODO - think with matan how to render it differently so the run time would decrease.
    // Now for wach room in all rooms we are searching if it's in the roomsAvailableAfterFilter list.
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

    const handleDateChange = (date) => {
        setDate(date);
    };

    const handleMonthChange = (date) => {
        const moveMonthByOne = (parseInt(monthToCheck) + 1) % 12
        setMonthToCheck(`${moveMonthByOne === 0 ? 12 : moveMonthByOne}`.padStart(2, '0'))
        setYearToCheck(`${monthToCheck === "1" ? `${parseInt(yearToCheck) + 1}` : yearToCheck}`)
        setMoveMonth(true)
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
                            {/*<input*/}
                            {/*    type="number"*/}
                            {/*    name=""*/}
                            {/*    id="book-people"*/}
                            {/*    min="1"*/}
                            {/*    max="10"*/}
                            {/*    onChange={handleChangePeople}*/}
                            {/*    value={peopleNum}*/}
                            {/*/>*/}
                            <select
                                onChange={handleChangePeople}
                                style={{padding: '10px', borderRadius: '5px', border: '1px solid #ccc'}}
                                value={peopleNum}
                            >
                                {peopleNumOptions.map((peopleNum) => (
                                    <option key={peopleNum.value} value={peopleNum.value}>
                                        {peopleNum.label}
                                    </option>
                                ))}
                            </select>
                            <div style={{display: 'flex', flexDirection: 'column'}}>

                            <label style={{marginBottom: '5px'}}>Duration </label>
                            <select
                                onChange={handleDurationChange}
                                style={{padding: '10px', borderRadius: '5px', border: '1px solid #ccc'}}
                                disabled={!peopleNum} // disable the select input if peopleNum is not set
                                value={duration}
                            >
                                {durationsOptions.map((duration) => (
                                    <option key={duration.value} value={duration.value}>
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
                                        onMonthChange={handleMonthChange}
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
                <div style={{textAlign: "center", fontWeight: "bold", fontSize: "1.5rem", marginBottom: "1rem"}}>
                    Book a Room
                </div>
                <div className="rooms">
                    {rooms && roomsAvailableAfterFilter && getRooms()}
                </div>


            </div>
            {/*<Button*/}
            {/*    onClick={cleanAllFields}*/}
            {/*>*/}
            {/*    move*/}
            {/*</Button>*/}

        </div>
    );
}
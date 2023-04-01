import React, {useState, useRef} from "react";
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
import {InputLabel, Select} from "@material-ui/core";
import MenuItem from "@mui/material/MenuItem";
import {add, isSameDay} from 'date-fns';

function NewReservation() {
    const [rooms, setrooms] = useState(DB.getRooms());

    const [date, setDate] = useState("");
    const [peopleNum, setPeopleNum] = useState(1);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const dateInputRef = useRef(null);
    const startTimeInputRef = useRef(null);
    const endTimeInputRef = useRef(null);
    const peopleInputRef = useRef(1);
    const [DateAndTime, setDateAndTime] = React.useState(dayjs('2022-08-18T21:11:54'));
    const [isFormValid, setIsFormValid] = useState(false);

    const [startTimes, setStartTimes] = useState([
        {label: '7:00', value: 7},
        {label: '8:00', value: 8},
        {label: '9:00', value: 9},
        {label: '10:00', value: 10},
        {label: '11:00', value: 11},
        {label: '12:00', value: 12},
        {label: '13:00', value: 13},
        {label: '14:00', value: 14},
        {label: '15:00', value: 15},
        {label: '16:00', value: 16},
    ]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const currentDate = new Date();
    const maxDate = add(currentDate, {months: 3});

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

    const handleStartTimeChange = (event) => {
        setStartTime(event.target.value);
    };

    const handleChangeDateAndTime = (newValue) => {
        setDateAndTime(newValue);
    };

    const handleSubmit = (e) => {
        console.log(date, peopleNum, startTime, endTime)
        // e.preventDefault();
    };

    const handleChangePeople = (e) => {
        setPeopleNum(e.target.value);
    };

    const isRoomAvailable = (room) => {
        return DB.isRoomAvailable(room, peopleNum) // date and time

    }
    const get_rooms = (rooms) => {
        return (rooms.map((room) => (
                <BasicModal
                    key={room.name}
                    title={room.name}
                    date={date}
                    startTime={startTime}
                    endTime={endTime}
                    people={peopleNum}
                    available={isRoomAvailable(room)}
                >
                </BasicModal>
            ))
        )
    }

    const handleStartDateChange = (date) => {
        setStartDate(date);
        setIsFormValid(validateDateRange(date, endDate));
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        setIsFormValid(validateDateRange(startDate, date));
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

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Box sx={{marginTop: '15px', marginBottom: '15px'}}>
                                    <label htmlFor="startDate">Date</label>
                                    <DatePicker
                                        type="date"
                                        id="startDate"
                                        value={startDate}
                                        onChange={handleStartDateChange}
                                        renderInput={(params) => <TextField {...params} />}
                                        sx={{display: 'flex', marginTop: '15px'}}
                                        minDate={currentDate}
                                        maxDate={maxDate}
                                        shouldDisableDate={disableDates}
                                    />
                                </Box>
                            </LocalizationProvider>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <label style={{marginBottom: '5px'}}>Available Hours </label>
                                <select
                                    onChange={handleStartTimeChange}
                                    style={{padding: '10px', borderRadius: '5px', border: '1px solid #ccc'}}
                                    disabled={!startDate} // disable the select input if startDate is not set
                                    value={startTime}
                                >
                                    {startTimes.map((time) => (
                                        <option key={time.value} value={time.value
                                        }>
                                            {time.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/*<Button type="submit" disabled={!isFormValid}>Find a Room</Button>*/}
                        </form>
                    </div>
                </div>
            </div>
            <div>
                <div style={{textAlign: "center", fontWeight: "bold", fontSize: "1.5rem", marginBottom: "1rem"}}>
                    Book a Room
                </div>
                <div className="rooms">

                    {get_rooms(rooms)}


                </div>
            </div>
        </div>
    );
}

export default NewReservation;
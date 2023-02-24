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

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleChangeDateAndTime = (newValue) => {
        setDateAndTime(newValue);
    };

    const handleSubmit = (e) => {
        console.log(date, peopleNum, startTime, endTime)
        // e.preventDefault();
    };

    const handleChangeDate = (e) => {
        setDate(e.target.value);
    };

    const handleChangeStartTime = (e) => {
        setStartTime(e.target.value);
    };

    const handleChangeEndTime = (e) => {
        setEndTime(e.target.value);
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
        minutesStep: 15,
    };
    return (
        <div className="test">
            <div className="container">
                <div className="content">
                    <div className="text">Find a Room</div>
                    <div className="form2">
                        <form action="" onSubmit={handleSubmit}>

                            <label htmlFor="book-date">Date</label>
                            <input
                                type="date"
                                name=""
                                id="book-date"
                                onChange={handleChangeDate}
                                ref={dateInputRef}
                            />


                            <label htmlFor="book-startTime">Start Time</label>
                            <input
                                type="time"
                                name=""
                                id="book-startTime"
                                step="3600000"
                                min="08:00"
                                max="18:00"
                                onChange={handleChangeStartTime}
                                ref={startTimeInputRef}
                            />
                            <label htmlFor="book-endTime">End Time</label>
                            <input
                                type="time"
                                name=""
                                id="book-endTime"
                                step="3600000"
                                min="8"
                                max="18"
                                onChange={handleChangeEndTime}
                                ref={endTimeInputRef}
                            />
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

                            {/*<LocalizationProvider dateAdapter={AdapterDayjs}                   >*/}
                            {/*    <DatePicker*/}
                            {/*        label="Start Date"*/}
                            {/*        value={startDate}*/}
                            {/*        onChange={handleStartDateChange}*/}
                            {/*        renderInput={(params) => <TextField {...params} />}*/}
                            {/*        sx={{ display: 'flex', marginTop: '5px' }}*/}
                            {/*    />*/}
                            {/*    <TimePickerComponent*/}
                            {/*        label="Start Time"*/}
                            {/*        value={startDate}*/}
                            {/*        onChange={handleStartDateChange}*/}
                            {/*        renderInput={(params) => <TextField {...params} />}*/}
                            {/*        {...pickerProps}*/}
                            {/*        sx={{ display: 'flex', marginTop: '5px' }}*/}
                            {/*    />*/}
                            {/*    <TimePickerComponent*/}
                            {/*        label="End Time"*/}
                            {/*        value={endDate}*/}
                            {/*        onChange={handleEndDateChange}*/}
                            {/*        renderInput={(params) => <TextField {...params} />}*/}
                            {/*        {...pickerProps}*/}
                            {/*        sx={{ display: 'flex', marginTop: '5px' }}*/}
                            {/*    />*/}
                            {/*    <label htmlFor="book-people">Number of People</label>*/}
                            {/*    <input*/}
                            {/*        type="number"*/}
                            {/*        name=""*/}
                            {/*        id="book-people"*/}
                            {/*        min="1"*/}
                            {/*        max="10"*/}
                            {/*        onChange={handleChangePeople}*/}
                            {/*        ref={peopleInputRef}*/}
                            {/*    />*/}
                            {/*<DateTimePicker*/}
                            {/*    label="Date&Time picker"*/}
                            {/*    value={DateAndTime}*/}
                            {/*    onChange={handleChangeDateAndTime}*/}
                            {/*    renderInput={(params) => <TextField {...params} />}*/}
                            {/*    {...pickerProps}*/}
                            {/*    sx={{*/}
                            {/*        boxSizing: 'border-box',*/}
                            {/*        margin: '10px 0',*/}
                            {/*        padding: '15px 30px',*/}
                            {/*        outline: 'none',*/}
                            {/*        // border:' 1px solid #ccc';*/}
                            {/*        borderRadius: '5px',*/}
                            {/*        width: '100%',*/}
                            {/*        display: 'flex',*/}
                            {/*        flexDirection: 'column',*/}
                            {/*        justifyContent: 'center',*/}
                            {/*        alignItems: 'stretch',*/}
                            {/*        marginTop: '5px',*/}
                            {/*    }}*/}
                            {/*/>*/}
                            {/*</LocalizationProvider>*/}


                            <Button type="submit" disabled={!isFormValid}>Find a Room</Button>
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

import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers";
import Box from "@mui/material/Box";
import { add, isSameDay } from 'date-fns';
import { CircularProgress } from '@material-ui/core';

// styles
import "./NewReservationMobile.css";

// components & custom hooks
import BasicModal from "../../components/Modal";
import { useCollection } from "../../hooks/useCollection";
import filterRoomsByUserType from "./FilterRoomsByUserType";
import filterRoomsByCapacity from "./FilterRoomsByCapacity";
import filterRoomsByDateAndDuration from "./filterRoomsByDateAndDuration";
import filterRoomsByDateAndTime from "./filterRoomsByDateAndTime";
import useFilters from "../../hooks/useFilters";
import BookARoom from "./Mobile/BookARoom";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from '../../components/Button.jsx'
import FindARoom from "./Mobile/FindARoom";
export default function NewReservation({ uid, userType, moveToMyReservation, rooms }) {

    const steps = ['Reservation Details', 'Choose a Room'];

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
    const maxDate = add(curDate, {months: 12});

    const {roomsAvailableAfterFilter, error, isPending, setIsPending} = useFilters(
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
        {label: "10 people", value: 10}
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
        {label: " ", value: " "},
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

// const getRooms = () => {
//     return (rooms.map((room) => (
//             <BasicModal
//                 key={room.roomNum}
//                 title={room.roomNum}
//                 date={new Date(date).toString().substring(0, 15)}
//                 startHour={startHour}
//                 endHour={parseInt(startHour) + parseInt(duration) + ":00" }
//                 peopleNum={peopleNum}
//                 duration={duration}
//                 roomNum={room.roomNum}
//                 uid={uid}
//                 available={isRoomAvailable(room.roomNum)}
//                 cleanAllFields={cleanAllFields}
//                 moveToMyReservation={moveToMyReservation}
//             >
//             </BasicModal>
//         ))
//     )
// }


    function getStepContent(step) {
        switch (step) {

            case 0:
                return <FindARoom
                    handleChangePeople={handleChangePeople}
                    peopleNum={peopleNum}
                    isPending={isPending}
                    peopleNumOptions={peopleNumOptions}
                    handleDateChange={handleDateChange}
                    handleMonthChange={handleMonthChange}
                    date     ={date}
                    handleDurationChange    ={handleDurationChange}
                    duration={duration}
                    handleStartHourChange={handleStartHourChange}
                    curDate={curDate}
                    maxDate={maxDate}
                    disableDates={disableDates}
                    durationsOptions={durationsOptions}
                    startHour={startHour}
                    startTimesOptions={startTimesOptions}
                />;
            case 1:
                return <BookARoom
                    rooms={rooms}
                    roomsAvailableAfterFilter={roomsAvailableAfterFilter}
                    date={date}
                    startHour={startHour}
                    duration={duration}
                    peopleNum={peopleNum}
                    uid={uid}
                    moveToMyReservation={moveToMyReservation}
                    isPending={isPending}
                    error={error}
                    cleanAllFields={cleanAllFields}
                />;
            default:
                throw new Error('Unknown step');
        }
    }

    const theme = createTheme();

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        if (activeStep === 0 && (startHour === "" || duration === "" || peopleNum === "" || date === "") ) {
            alert("Please Fill All Fields")
            return
        }
        console.log(activeStep,"step")
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>

            <Container component="main" maxWidth="sm" sx={{mb: 4}}>
                <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
                    <Typography component="h1" variant="h4" align="center">
                        Book a Room
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{pt: 3, pb: 5}}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                Thank you for your order.
                            </Typography>
                            <Typography variant="subtitle1">
                                Your order number is #2001539. We have emailed your order
                                confirmation, and will send you an update when your order has
                                shipped.
                            </Typography>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(activeStep)}
                            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{mt: 3, ml: 1}}>
                                        Back
                                    </Button>
                                )}

                                {activeStep !== steps.length - 1 && <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{mt: 3, ml: 1}}
                                >
                                    {activeStep === steps.length - 1 ? 'Book A room' : 'Next'}
                                </Button>}
                            </Box>
                        </React.Fragment>
                    )}
                </Paper>
            </Container>
        </ThemeProvider>
    );
}
import {useState, useEffect} from "react";
import {TextField} from "@mui/material";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from "@mui/x-date-pickers";
import Box from "@mui/material/Box";
import {add, isSameDay} from 'date-fns';
import {CircularProgress} from '@material-ui/core';

// styles
import "../NewReservation.css";

// components & custom hooks
import BasicModal from "../../../components/Modal";
import {useCollection} from "../../../hooks/useCollection";
import filterRoomsByUserType from "../FilterRoomsByUserType";
import filterRoomsByCapacity from "../FilterRoomsByCapacity";
import filterRoomsByDateAndDuration from "../filterRoomsByDateAndDuration";
import filterRoomsByDateAndTime from "../filterRoomsByDateAndTime";
import useFilters from "../../../hooks/useFilters";

export default function FindARoom({
                                      handleChangePeople,
                                      peopleNum,
                                      isPending,
                                      peopleNumOptions,
                                      handleDateChange,
                                      handleMonthChange,
                                      date,
                                      handleDurationChange,
                                      duration,
                                      handleStartHourChange,
                                      curDate,
                                      maxDate,
                                      disableDates,
                                      durationsOptions,
                                      startHour,
                                      startTimesOptions,
                                  }) {
    return (
        <div className="container">
            <div className="content">
                <div className="text">Find a Room</div>
                <div className="form2">
                    <form action="">
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
                                disabled={!peopleNum || !date || isPending}
                                value={duration}
                            >
                                {durationsOptions.map((duration) => (
                                    <option key={duration.value} value={duration.value}>
                                        {duration.label}
                                    </option>
                                ))}
                            </select>
                            <label style={{marginBottom: '5px'}}>Available Hours (Starting Time) </label>
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
                            {isPending && <div className="loading" style={{ height: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <CircularProgress> loading... </CircularProgress>
                            </div>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
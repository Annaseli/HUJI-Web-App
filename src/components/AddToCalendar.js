import {AddToCalendarButton} from "add-to-calendar-button-react";

export default function AddToCalendar(props) {
    console.log("test", props)
    const startDate_ = props.year + '-' + props.month + '-' + props.day
    console.log(startDate_)

    // calc end time (start time + duration)
    const [startHourHours] = props.startHour.split(':').map(Number);
    console.log("startHourHours", startHourHours)
    const endHHours = (startHourHours + parseInt(props.duration)).toString() + ":00"
    console.log(endHHours)
    // console.log("endTime", endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))


    return (
        <AddToCalendarButton
            name={"Huji Event" + props.roomNum}
            options={['Google', 'Apple', 'iCal']}
            location="location"
            // startDate="2023-05-22"
            startDate={startDate_}
            endDate={startDate_}
            startTime={props.startHour}
            endTime={endHHours}
            timeZone="Asia/Jerusalem"
        />
    )
}
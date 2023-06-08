import {AddToCalendarButton} from "add-to-calendar-button-react";

export default function AddToCalendar(props) {
    const startDate_ = props.year + '-' + props.month + '-' + props.day

    // calc end time (start time + duration)
    const [startHourHours] = props.startHour.split(':').map(Number);
    const endHHours = (startHourHours + parseInt(props.duration)).toString() + ":00"

    return (
        <AddToCalendarButton
            name={"Reservation for Room: " + props.roomTitle}
            options={['Google', 'Apple', 'iCal']}
            location={"Edmund J. Safra Campus (Givat Ram), Herman Building, 2nd floor, " + props.roomTitle + ", Jerusalem"}
            startDate={startDate_}
            endDate={startDate_}
            startTime={props.startHour}
            endTime={endHHours}
            timeZone="Asia/Jerusalem"
        />
    )
}
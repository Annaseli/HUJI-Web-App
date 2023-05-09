import { useEffect, useState } from "react";
import { Divider } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// components && custom hooks
import Button from '../../components/Button';
import { SemiTitle } from '../../components/Title';
import { StyledTextField } from '../../components/Input';
import getCheckInCodeFromRoom from "../../hooks/getCheckInCodeFromRoom";
import getDocRefFromReservations from "../NewReservation/getDocRefFromReservations";
import getUserReservations from "../../hooks/getUserReservations";

// firebase
import { setDoc } from "firebase/firestore";


const styledDivider = {
    width: '400px',
}

export default function CheckIn({uid}) {
    const [checkInCode, setCheckInCode] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const [isCancelled, setIsCancelled] = useState(false)
    let userReservations = {}

    async function findRes() {
        userReservations = await getUserReservations(uid)

        const curDate = new Date()
        const curHour = curDate.getHours()
        const curMinute = curDate.getMinutes()

        // let year = null;
        // let month = null;
        // let day = null;
        // let roomNum = null;
        // let duration = null;
        // let startHour = null;
        let completed = false
        let possibleReservations = {}

        Object.keys(userReservations).forEach(res => {
            const resYear = userReservations[res]["year"]
            const resMonth = userReservations[res]["month"]
            const resDay = userReservations[res]["day"]
            const resRoomNum = userReservations[res]["roomNum"]
            const resDuration = userReservations[res]["duration"]
            const resStartHour = userReservations[res]["startHour"].substring(0, 2)

            // checkedIn half an hour before the reservation
            const checkedInEarly = ((`${curHour + 1}` === resStartHour) && curMinute > 29 && curMinute <= 59)
            // checkedIn max in the end time of the reservation
            const checkedInLate = (curHour + 1 > parseInt(resStartHour) &&
                curHour <= parseInt(resStartHour) + parseInt(resDuration) + 1)

            // todo - change the check after debug
            if (`${curDate.getFullYear()}` === resYear &&
                // `${curDate.getMonth() + 1}`.padStart(2, '0') === resMonth &&
                // `${curDate.getDate()}`.padStart(2, '0') === resDay &&
                "07" === resMonth &&
                "09" === resDay &&
                (checkedInEarly || checkedInLate)) {
                possibleReservations[res] = {year: resYear, month: resMonth, day: resDay,
                    roomNum: resRoomNum, duration: resDuration, startHour: resStartHour}
                completed = true
                //
                // // Update the variables
                // year = resYear;
                // month = resMonth;
                // day = resDay;
                // roomNum = resRoomNum;
                // duration = resDuration;
                // startHour = resStartHour;
                //return { year, month, day, roomNum, duration, startHour, completed }
            }
        })
        //return { year, month, day, roomNum, duration, startHour, completed }
        return { possibleReservations, completed }
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        // If the check in code is similar to the room's code and the time the user sent it is 30 mins before
        // his reservation time and max {duration} time after, we'll set the checkedIn in this reservation (maybe delete if from the list later).
        // Either way letting him know

        setError(null)
        setIsPending(true)
        try {
            //const { year, month, day, roomNum, duration, startHour, completed } = await findRes()
            const { possibleReservations, completed } = await findRes()
            if (!completed) {
                // TODO - front show this message to the user
                console.log("Have no reservations or checkedIn too early or too late")
                setSuccess(false)
                setError("Have no reservations or checkedIn too early or too late")
                return
            }

            for (const res of Object.keys(possibleReservations)) {
                const resObj = possibleReservations[res]
                const checkInCodeFromRoom = await getCheckInCodeFromRoom(resObj["roomNum"])
                if (checkInCode === checkInCodeFromRoom) {
                    const {docRef} = await getDocRefFromReservations(resObj["year"],
                        resObj["month"], resObj["day"], resObj["roomNum"])
                    for (let i = 0; i < parseInt(resObj["duration"]); i++) {
                        await setDoc(docRef, {
                            [`${parseInt(resObj["startHour"]) + i}`.padStart(2, '0')]:
                                {"checkedIn": true, "checkInTimeStamp": new Date()}
                        }, {merge: true});
                    }
                    // TODO - front show this message to the user
                    console.log("rooms code match")
                    setSuccess(true)
                    break
                } else {
                    // TODO - front show this message to the user
                    console.log("rooms code do not match")
                    setError("rooms code do not match. Have no reservations or checked in too early/late")

                    setSuccess(false)
                }

                if (!isCancelled) {
                    setIsPending(false)
                }
            }

        } catch (error) {
            if (!isCancelled) {
                setError(error.message || "unknown message occurred")
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <SemiTitle>Check-In your room</SemiTitle>
                <div className="form">
                    <p>Please enter the room check in password </p>
                    <StyledTextField
                        id=""
                        label="Code"
                        required
                        size="small"
                        variant="filled"
                        onChange={(e) => setCheckInCode(e.target.value)}
                        value={checkInCode}
                    />
                </div>
                <div className="submit">
                    <Button>Submit</Button>
                    <Divider sx={styledDivider}/>
                </div>

            </form>
            {success && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <CheckCircleIcon sx={{ fontSize: "5rem", color: "green" }} />
                    <p>Check in completed</p>
                </div>
            )}
            {error && <p style={{ color: "red" }}>  check In failed</p>}
            {isPending && <p>checking you in...</p>}
            {error && <p >{error}</p>}

        </div>

    );
}

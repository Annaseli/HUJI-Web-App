import {useEffect, useState} from "react";
import {Divider} from '@mui/material';

// components
import {Button} from '../../components/Button';
import {SemiTitle} from '../../components/Title';
import {StyledTextField} from '../../components/Input';
import {getCheckInCodeFromRoom} from "../../hooks/useGetCheckInCodeFromRoom";
import {getDocRefFromReservations} from "../NewReservation/getDocRefFromReservations";
import { setDoc } from "firebase/firestore";
import {getUserReservations} from "../../hooks/getUserReservations";


const styledDivider = {
    width: '400px',
}

export default function CheckIn({uid}) {
    const [checkInCode, setCheckInCode] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    //const [userReservations, setUserReservations] = useState({})
    let userReservations = {}

    async function findRes() {
        // TODO - move this try catch code outside since there is a duplicate code of it in the code
        // get user's reservations
        try {
            // const docRef = doc(collection(db, "Users"), uid);
            // const docSnap = await getDoc(docRef)
            // if (docSnap.exists()) {
            //     const data = docSnap.data();
            //     setUserReservations({...userReservations, ...data.userReservations})
            // } else {
            //     console.log('No such document!');
            // }
            userReservations = await getUserReservations(uid)
            //setUserReservations(usersRes)
            console.log("userReservations", userReservations)
        } catch (error) {
            setError(error.message)
            return
        }

        const curDate = new Date()
        const curHour = curDate.getHours()
        // TODO - change this after i'll make a new reservations table for "04"
        const curMinute = "07"//curDate.getMinutes()

        let year = null;
        let month = null;
        let day = null;
        let roomNum = null;
        let duration = null;
        let startHour = null;
        let completed = false

        console.log("userReservations2", userReservations)
        Object.keys(userReservations).forEach(res => {
            const resYear = userReservations[res]["year"]
            const resMonth = userReservations[res]["month"]
            const resDay = userReservations[res]["day"]
            const resRoomNum = userReservations[res]["roomNum"]
            const resDuration = userReservations[res]["duration"]
            const resStartHour = userReservations[res]["startHour"].substring(0, 2)

            const checkedInEarly = ((`${curHour + 1}` === resStartHour) && curMinute > 29 && curMinute <= 59) // checkedIn half an hour before the reservation
            const checkedInLate = (curHour + 1 > parseInt(resStartHour) && curHour <= parseInt(resStartHour) + parseInt(resDuration)) // checkedIn max in the end time of the reservation

            console.log(resYear, resMonth, resDay, startHour, )
            console.log(`${curDate.getFullYear()}` === resYear, "07" === resMonth, `${curDate.getDate()}`.padStart(2, '0') === resDay, checkedInEarly, checkedInLate)
            if (`${curDate.getFullYear()}` === resYear &&
                // `${curDate.getMonth() + 1}`.padStart(2, '0') === resMonth &&
                "07" === resMonth &&
                `${curDate.getDate()}`.padStart(2, '0') === resDay && (checkedInEarly || checkedInLate)) {
                completed = true

                // Update the variables
                year = resYear;
                month = resMonth;
                day = resDay;
                roomNum = resRoomNum;
                duration = resDuration;
                startHour = resStartHour;
                return { year, month, day, roomNum, duration, startHour, completed }
            }
        })
        return { year, month, day, roomNum, duration, startHour, completed }
    }
    const handleSubmit = async (event) => {
        event.preventDefault()

        // If the check in code is similar to the room's code and the time the user sent it is 30 mins before
        // his reservation time and max {duration} time after, we'll set the checkedIn in this reservation (maybe delete if from the list later).
        // Either way letting him know

        const { year, month, day, roomNum, duration, startHour, completed } = await findRes()

        if (!completed) {
            // TODO - front show this message to the user
            console.log('Have no reservations or checkedIn too early or too late')
            return
        }

        const checkInCodeFromRoom = await getCheckInCodeFromRoom(roomNum)
        if (checkInCode === checkInCodeFromRoom) {
            const {docRef} = await getDocRefFromReservations(year, month, day, roomNum)
            for (let i = 0; i < parseInt(duration); i++) {
                await setDoc(docRef, {
                    [`${parseInt(startHour) + i}`.padStart(2, '0')]: {"checkedIn": true, "checkInTimeStamp": new Date()}
                }, {merge: true});
            }
            console.log("rooms code match")
            setSuccess(true)
        } else {
            console.log("rooms does not code match")
            setSuccess(false)
        }

        // TODO - front - let the user know that the code doesn't match the code given
    }

    return (
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
                {success && <p>check In completed.</p>}
                {error && <p>{error.message}</p>}
                <Divider sx={styledDivider}/>
            </div>
        </form>
    );
}

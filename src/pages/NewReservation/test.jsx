import { range } from "lodash";
import {getDocRefFromReservations} from "./getDocRefFromReservations";
import {updateDoc} from "firebase/firestore";

export default function test(){
    const roomsNum = range(1, 10)
    const hours = range(8, 19)
    roomsNum.forEach(async room => {
        const { docRef } = await getDocRefFromReservations('2023', '05', '31', `${room}`)
        hours.forEach(async hour => {
            await updateDoc(docRef, {[`${hour}`.padStart(2, '0')]: {'1':'1'}}, {merge:true})
            // await updateDoc(docRef, {[`${hour}`.padStart(2, '0')]: {}}, {merge:true})

        })

        // const { docRef: ref } = await getDocRefFromReservations('2023', '08', '28', `${room}`)
        // await updateDoc(ref, {["13"]: {'1':'1'}}, {merge:true})
    })
}


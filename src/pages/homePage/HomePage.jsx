import {useEffect, useState} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

// components & pages & custom hooks
import DisplayUsersRes from "../../components/DisplayUsersRes";
import NewReservation from '../NewReservation/NewReservation';
import { useCollection } from "../../hooks/useCollection";
import CheckIn from "../CheckIn/CheckIn";

// firebase imports
import { getAuth } from "firebase/auth";
import createAnEmptyCollection from "../NewReservation/createAnEmptyCollection";
import {collection, doc, getDoc} from "firebase/firestore";
import {db} from "../../firebase/config";

function TabPanel(props) {
    const {children, value, index, ...other} = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function HomePage({userType}) {
    console.log("HomePage")
    const [TabValue, setValue] = useState(0);
    //const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { docs: rooms, error: err } = useCollection("Rooms")
    // if (!isCancelled) {
    //     setIsPending(false)
    //     if (err) {
    //         setError(err)
    //     }
    // }

    const uid = getAuth().currentUser.uid
    async function create() {
        const curDate = new Date()
        const year = `${curDate.getFullYear()}`
        const month = curDate.getMonth() + 1
        // create empty reservations year+month docs in Reservation for 3 month in advance
        for (let m = month; m < month + 3; m++) {
            const monthStr = `${m}`.padStart(2, '0')
            const checkDoc = doc(collection(db, "Reservations"),
                year + monthStr)
            const docSnap = await getDoc(checkDoc)
            if (!docSnap.exists()) {
                setIsPending(true)
                //console.log(`creates ${year}${monthStr} doc in Reservations`)
                rooms && await createAnEmptyCollection(year, monthStr, rooms)
                setIsPending(false)
            } else {
                //console.log(`doesn't create ${year}${monthStr} doc in Reservations`)
            }
        }
    }
    create()

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const moveToMyReservation = () => {
        setValue(0);
    }
    const moveToNewReservation = () => {
        setValue(1);
    }

    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={TabValue} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="My Reservations" {...a11yProps(1)} />
                    <Tab label="Book A Reservation" {...a11yProps(0)} />
                    <Tab label="Check-In" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={TabValue} index={1}>
                {uid && <NewReservation
                    uid={uid}
                    userType={userType}
                    moveToMyReservation={moveToMyReservation}
                    rooms={rooms}
                />}
            </TabPanel>
            <TabPanel value={TabValue} index={0}>
                {uid && <DisplayUsersRes uid={uid}
                                         header={"My Reservations"}
                    //moveToNewReservation={moveToNewReservation}
                />}
            </TabPanel>
            <TabPanel value={TabValue} index={2}>
                {uid && <CheckIn uid={uid}/>}
            </TabPanel>
            {isPending && <p>loading...</p>}
            {error && <p>{ error }</p>}
        </Box>
    );
}


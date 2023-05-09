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
    //test()
    //rooms && getAllReservations('2023',['07'], rooms)

    // TODO - back: move this initialization of the DB to the Admin - every time that he will log in, I'll check
    // that there are collections for the next 3 month and if not will create them. I'll move to storage the
    // the earliests 3 month. Need to check the option of doing that without his log in because it's riscy -
    // if he won't log in there would be bugs in Reservations.
    // async function create(year, month) {
    //     const checkDoc = doc(collection(db, "Reservations"), year + month)
    //     const docSnap = await getDoc(checkDoc)
    //     if (!docSnap.exists()) {
    //         rooms && await createAnEmptyCollection(year, month, rooms)
    //     }
    // }
    //
    // create('2023', '08')

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const moveToMyReservation = () => {
        setValue(0);
    }
    const moveToNewReservation = () => {
        setValue(1);
    }

    // TODO: maybe make routes instead of the indices
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


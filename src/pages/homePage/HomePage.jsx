import {useState} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import Reservations from '../myReservations/MyReservations';
import LogIn from '../LogIn/LogIn';
import NewReservation from '../NewReservation/NewReservation';
import SignUp from "../SignUp/SignUp";
import ApproveUsers from '../Admin/ApproveUsers';
import AboutUs from "../AboutUs/AboutUs";
import ManageUsers from "../Admin/ManageUsers";
import MyReservations from "../myReservations/MyReservations";
import {db, projectAuth} from "../../firebase/config";
import {collection, doc, getDoc} from "firebase/firestore";
import {createAnEmptyCollection} from "../NewReservation/createAnEmptyCollection";
import {useCollection} from "../../hooks/useCollection";
import {getAuth} from "firebase/auth";
import CheckIn from "../CheckIn/CheckIn";
import {useNavigate} from "react-router";
import {Button} from "../../components/Button";
import DisplayUsersRes from "../../components/DisplayUsersRes";

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

export default function HomePage() {
    const [TabValue, setValue] = useState(0);
    const [randValue, setRandValue] = useState({ value: 10 })

    const uid = getAuth().currentUser.uid
    const {docs: rooms} = useCollection('Rooms')

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
    function rendFunc() {
        setRandValue((prev) => {
            return { ...prev };
        });
    }

    // TODO: back - make routes instead of the indices
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
                <NewReservation
                    uid={uid}
                    moveToMyReservation={moveToMyReservation}
                />

            </TabPanel>
            <TabPanel value={TabValue} index={0}>
                <DisplayUsersRes uid={uid}
                                 header={'My Reservations'}
                                 moveToNewReservation={moveToNewReservation}
                />
            </TabPanel> <TabPanel value={TabValue} index={2}>
            <CheckIn uid={uid}/>

        </TabPanel>

        </Box>

    );
}


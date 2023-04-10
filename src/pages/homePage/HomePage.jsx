import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import Reservations from '../myReservations/MyReservations';
import LogIn from '../logIn/LogIn';
import NewReservation from '../newReservation/NewReservation';
import SignUp from "../signUp/SignUp";
import ApproveUsers from '../admin/ApproveUsers';
import AboutUs from "../aboutUs/AboutUs";
import ManageUsers from "../admin/ManageUsers";
import MyReservations from "../myReservations/MyReservations";
import {db, projectAuth} from "../../firebase/config";
import {collection, doc, getDoc} from "firebase/firestore";
import {createAnEmptyCollection} from "../newReservation/createAnEmptyCollection";
import {useCollection} from "../../hooks/useCollection";

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
    const uid = projectAuth.currentUser.uid

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // TODO: back - make routes instead of the indices
    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={TabValue} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Book A Reservation" {...a11yProps(0)} />
                    <Tab label="My Reservations" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={TabValue} index={0}>
                <NewReservation uid={uid} />
            </TabPanel>
            <TabPanel value={TabValue} index={1}>
                <MyReservations uid={uid} />
            </TabPanel>
        </Box>

    );
}


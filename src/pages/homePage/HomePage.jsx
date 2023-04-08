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

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const a = "reservations"
    if (a === "reservations") {
        return (
            <Box sx={{width: '100%'}}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={TabValue} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Book A Reservation" {...a11yProps(0)} />
                        <Tab label="My Reservations" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={TabValue} index={0}>
                    <NewReservation/>
                </TabPanel>
                <TabPanel value={TabValue} index={1}>
                    <Reservations/>
                </TabPanel>
            </Box>

        );

    } else if (a === "ApproveUsers") {
        return (
            <ApproveUsers/>
        );
    } else if (a === "ManegeUseres") {
        return (
            <ManageUsers/>
        );
    }
    else if (a === "log in") {
            return (
                <LogIn/>
            )
    }
    else if (a === "aboutus"){
        return  (
            <AboutUs/>
        )

    }

    else {
        return (
            <SignUp/>
        )
    }


}


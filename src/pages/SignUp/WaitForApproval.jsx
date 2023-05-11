import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";

export default function WaitForApproval({ showWaitingForApproval, setShowWaitingForApproval }) {
    console.log("WaitForApproval")
    //const [showComponent, setShowComponent] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowWaitingForApproval(false);
            navigate("/logIn")
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return showWaitingForApproval ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
            <Typography variant="h4" component="h2" gutterBottom style={{ color: "#5cb85c" }}>
                We've received your registration!
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Thank you for signing up. Your account is pending approval from an admin.
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
                You'll receive an email notification once your account is approved.
            </Typography>
        </Box>
    ) : null
}

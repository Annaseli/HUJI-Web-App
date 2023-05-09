import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function WaitForApproval() {
    return (
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
    );
}

export default WaitForApproval;
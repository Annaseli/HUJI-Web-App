import {useState} from "react";
import {Link} from "react-router-dom"
import {Divider} from '@mui/material';

// styles
// import "./ForgotPassword.css";

// components
import {Button} from '../../components/Button';
import {SemiTitle} from '../../components/Title';
import {StyledTextField} from '../../components/Input';

// custom hooks
// import {useForgotPassword} from "../../hooks/useForgotPassword";

const styledDivider = {
    width: '400px',
}

export default function CheckIn() {
    const [checkInCode, setCheckInCode] = useState('')
    const [error, setError] = useState(true)
    // const {error, success} = useResetPassword('')
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()

        // await checkCode(checkInCode)
        setSuccess(true)
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

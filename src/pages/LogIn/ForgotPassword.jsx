import {useState} from "react";
import {Link} from "react-router-dom"
import {Divider} from '@mui/material';

// styles
import "./ForgotPassword.css";

// components
import {Button} from '../../components/Button';
import {SemiTitle} from '../../components/Title';
import {StyledTextField} from '../../components/Input';

// custom hooks

const styledDivider = {
    width: '400px',
}

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState(true)
    // const {error, success} = useResetPassword('')
    const success = false
    const handleSubmit = async (event) => {
        event.preventDefault()
        // await forgotPassword(email)
    }

    return (
        <form onSubmit={handleSubmit}>
            <SemiTitle>FORGOT PASSWORD</SemiTitle>
            <div className="form">
                <p>Please enter your email address below to receive a password reset link:</p>
                <StyledTextField
                    id=""
                    label="Email Address"
                    required
                    size="small"
                    variant="filled"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </div>
            <div className="submit">
                <Button>Submit</Button>
                {success && <p>A password reset link has been sent to your email.</p>}
                {error && <p>{error.message}</p>}
                <Divider sx={styledDivider}/>
                <Link to="/login"><Button color={"#211d42"} background={"#ffffff"} border={"#211D42"}>Back to
                    Login</Button></Link>
            </div>
        </form>
    );
}

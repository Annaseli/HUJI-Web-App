import {useEffect, useState} from "react";
import { Link } from "react-router-dom"
import { Divider } from '@mui/material';

// styles
import "./ForgotPassword.css";

// components
import Button from '../../components/Button';
import { SemiTitle } from '../../components/Title';
import { StyledTextField } from '../../components/Input';

// firebase
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const styledDivider = {
    width: '400px',
}

export default function ForgotPassword() {
    const [email, setEmail] = useState("")
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError(null)
        setIsPending(true)
        try {
            email && await sendPasswordResetEmail(getAuth(), email)
            setSuccess(true)

            if (!isCancelled) {
                setError(null)
                setIsPending(false)
                setEmail("")
            }
        } catch (error) {
            if (!isCancelled) {
                setError(error.message)
                setIsPending(false)
                setEmail("")
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

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
                <Divider sx={styledDivider}/>
                <Link to="/login"><Button color={"#211d42"} background={"#ffffff"} border={"#211D42"}>Back to
                    Login</Button></Link>
            </div>
            {isPending && <p>loading...</p>}
            {success && <p>A password reset link has been sent to your email.</p>}
            {error && <p>{error}</p>}
        </form>
    );
}

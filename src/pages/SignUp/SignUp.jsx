import {useState} from "react";
import {Link} from "react-router-dom"

// styles
import "./SignUp.css";

import Button from "../../components/Button";
import {SemiTitle} from "../../components/Title";
import {StyledTextField} from "../../components/Input";
import {Box} from "@mui/material";

import {useSignUp} from "../../hooks/useSignUp";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";

export default function SignUp() {

    const [email, setEmail] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    let displayName = ""
    let confirmedPassword = ""
    const {signUp, error, isPending} = useSignUp()
    const [errorDialogOpen, setErrorDialogOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault()
        // validate form
        if (!validateForm()) {
            setErrorDialogOpen(true) && console.log("error", errorMsg)
            return
        }
        // check that the 2 password are the same, if not there would be an error from firebase since confirmedPassword
        // is an empty string
        password1 && password2 && (password1 === password2) && (confirmedPassword = password1)
        firstName && lastName && (displayName = firstName + ' ' + lastName)
        await signUp(email, confirmedPassword, displayName)
        console.log(error)
        if (error && error !== "No such email in ConfirmedUsers collection!" || error !== "No such email in ConfirmedUsers collection!\n") {
            setErrorMsg(error)
            setErrorDialogOpen(true)
        }
        // sleep 5 seconds
        // navigate to waitingForApproval
        if (error === "No such email in ConfirmedUsers collection!" || error === "No such email in ConfirmedUsers collection!\n" || !error) {
            window.location.href = "/waitingForApproval"
            // #TODO: add better navigate function
        }

    }
    const handleOpenErrorDialog = () => {
        setErrorDialogOpen(true);
    };

    const handleCloseErrorDialog = () => {
        setErrorDialogOpen(false);
    };

    const validateEmail = () => {

        let error = "";
        const value = email
        if (!value) {
            setErrorMsg("Email is required");
            return false
        } else if (!/\S+@\S+\.\S+/.test(value)) {
            setErrorMsg("Invalid email format");
            return false
        }
        return true;
    };

    const validatePassword = () => {

        if (!password1) {
            setErrorMsg("Password is required");
            return false
        } else if (password1.length < 6) {
            setErrorMsg( "Password should be at least 6 characters long");
            return false

        }
        return true;
    };

    const validateFirstName = () => {
        if (!firstName) {
            setErrorMsg("First name is required");
            return false
        }
        return true;
    };

    const validateLastName = () => {
        console.log(lastName, "last")
        if (!lastName) {
            console.log("errrrrr")
            setErrorMsg("Last name is required");
            return  false
        }
        return true;
    };

    const validatePasswordMatch = () => {
        if (password1 && password2 && (password1 === password2)) {
            return true
        }
        setErrorMsg("Passwords do not match")
        return false
    }

    const validateForm = () => {
        setErrorMsg("")
        if (!validateFirstName()) return false
        if(!validateLastName()) return false
        if (!validateEmail()) return false
        if (!validatePassword()) return false
        return validatePasswordMatch();

    };

    return (
        <div>
            <Box
                component="form"
                sx={{
                    "& .MuiTextField-root": {m: 2, width: "30ch"},
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <SemiTitle>REGISTRATION PAGE</SemiTitle>
                <div>
                    <StyledTextField
                        id="FirstName"
                        label="First Name"
                        variant="filled"
                        size="small"
                        required
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                    />
                    <StyledTextField
                        id="LastName"
                        label="Last Name"
                        variant="filled"
                        size="small"
                        required
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                    />
                </div>
                <div>
                    <StyledTextField
                        id="email"
                        label="Email"
                        variant="filled"
                        type="email"
                        size="small"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <div>
                    <StyledTextField
                        id="password1"
                        label="Password"
                        variant="filled"
                        size="small"
                        type="password"
                        required
                        onChange={(e) => setPassword1(e.target.value)}
                        value={password1}
                    />
                    <StyledTextField
                        id="password2"
                        label="Confirm Password"
                        variant="filled"
                        size="small"
                        type="password"
                        required
                        onChange={(e) => setPassword2(e.target.value)}
                        value={password2}
                    />
                </div>
                {!isPending && <Button>Sign Up</Button>}
                {isPending && <p>loading...</p>}
                {error && <p>{error}</p>}
                <p>Already a member? <Link to="/logIn" component="button">Log In</Link></p>
            </Box>
            <Dialog open={errorDialogOpen} onClose={handleCloseErrorDialog}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent>
                    <DialogContentText>{errorMsg}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseErrorDialog}>
                        Let's Try Again
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}

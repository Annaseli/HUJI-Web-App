import {useEffect, useState} from "react";
import { Link } from "react-router-dom"
import { Divider } from "@mui/material"

// styles
import "./LogIn.css";

// components && custom hooks
import Button from "../../components/Button"
import { SemiTitle } from "../../components/Title"
import { StyledTextField } from "../../components/Input"
import { useLogIn } from "../../hooks/useLogIn"
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";

const styledDivider = {
  width: "400px"
}

export default function LogIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showComponent, setShowComponent] = useState(false)
    const { logIn, error, isPending } = useLogIn()
    const [errorDialogOpen, setErrorDialogOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!validateForm()) {
            setErrorDialogOpen(true) && console.log("error", errorMsg)
            return
        }
        await logIn(email, password)
        if (error) {
            setErrorMsg(error)
            setErrorDialogOpen(true)
        }
    }

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
        if (!password) {
            setErrorMsg("Password is required");
            return false
        } else if (password.length < 6) {
            setErrorMsg("Password should be at least 6 characters long");
            return false
        }
        return true;
    };

    // const validateInvalidUsernameOrPassword = () => {
    //     error && console.log("error", error)
    //     return !!(error && (error.includes("user-not-found") || error.includes("wrong-password")));
    // };

    const validateForm = () => {
        setErrorMsg("")
        if (!validateEmail()) return false
        return validatePassword();
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowComponent(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    // if (validateInvalidUsernameOrPassword()) {
    //     setErrorDialogOpen(true) && console.log("error", errorMsg)
    //     return
    // }
    return ( showComponent ?
        (<form onSubmit={handleSubmit}>
            <SemiTitle>LOGIN PAGE</SemiTitle>
            <div className="form">
              <StyledTextField
                  id=""
                  label="Email Address"
                  required
                  size="small"
                  variant="filled"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
              />
              <StyledTextField
                 className="input"
                 id="filled-basic"
                 label="Password"
                 type="password"
                 required
                 size="small"
                 variant="filled"
                 onChange={(e) => setPassword(e.target.value)}
                 value={password}
              />
              <Link component="button" to="/forgotPassword">Forgot Password?</Link>
            </div>
            <div className="submit">
            {!isPending && <Button>Log In</Button>}
            {isPending && <p>loading...</p>}
            {error && <p>{error.substring(22).replace(").", "")}</p>}
            <Divider sx={styledDivider}/>
            <Link to="/signUp"><Button color={"#211d42"} background={"#ffffff"} border={"#211D42"}>Sign Up</Button></Link>
            </div>
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
        </form>) : null
    );
}
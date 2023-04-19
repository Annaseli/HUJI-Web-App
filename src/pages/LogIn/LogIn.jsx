import { useState } from "react";
import { Link } from "react-router-dom"
import { Divider } from "@mui/material"

// styles
import "./LogIn.css";

// components && custom hooks
import {Button} from "../../components/Button"
import {SemiTitle} from "../../components/Title"
import {StyledTextField} from "../../components/Input"
import {useLogIn} from "../../hooks/useLogIn"

const styledDivider = {
  width: "400px"
}

export default function LogIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { logIn, error, isPending } = useLogIn("")

    const handleSubmit = async (event) => {
        event.preventDefault()
        await logIn(email, password)
    }

  return (
    <form onSubmit={handleSubmit}>
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
      {error && <p>{error}</p>}
      <Divider sx={styledDivider}/>
      <Link to="/signUp"><Button color={"#211d42"} background={"#ffffff"} border={"#211D42"}>Sign Up</Button></Link>
      </div>
    </form>
  );
}
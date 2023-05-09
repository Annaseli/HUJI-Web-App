import { useState } from "react";
import { Link } from "react-router-dom"

// styles
import "./SignUp.css";

import Button from "../../components/Button";
import { SemiTitle } from "../../components/Title";
import { StyledTextField } from "../../components/Input";
import { Box } from "@mui/material";

import { useSignUp } from "../../hooks/useSignUp";

export default function SignUp() {
  const [email, setEmail] = useState("")
  const [password1, setPassword1] = useState("")
  const [password2, setPassword2] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  let displayName = ""
  let confirmedPassword = ""
  const { signUp, error, isPending } = useSignUp()

  const handleSubmit = async (event) => {
    event.preventDefault()

    // check that the 2 password are the same, if not there would be an error from firebase since confirmedPassword is an empty string
    password1 && password2 && (password1 === password2) && (confirmedPassword = password1)
    firstName && lastName && (displayName = firstName + ' ' + lastName)
    await signUp(email, confirmedPassword, displayName)
  }

  return (
      <div>
        <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 2, width: "30ch" },
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
      </div>
  );
}

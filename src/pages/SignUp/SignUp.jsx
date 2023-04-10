import { useState } from "react";
import { Link } from "react-router-dom"

// styles
import "./SignUp.css";

import { Button } from "../../components/Button";
import { SemiTitle } from "../../components/Title";
import { StyledTextField } from "../../components/Input";
import { MenuItem, Box } from "@mui/material";

import { useSignUp } from "../../hooks/useSignUp";

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  //const [displayName, setDisplayName] = useState('')
  let displayName = ''
  const { signUp, error, isPending } = useSignUp('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    await signUp(email, password, displayName)
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
                id="password"
                label="Password"
                variant="filled"
                size="small"
                type="password"
                required
            />
            <StyledTextField
                id="password2"
                label="Confirm Password"
                variant="filled"
                size="small"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
          </div>
          {firstName && lastName && (displayName = firstName + ' ' + lastName)}
          {!isPending && <Button>Sign Up</Button>}
          {isPending && <p>loading...</p>}
          {error && <p>{error}</p>}
          <p>Already a member? <Link to="/logIn" component="button">Log In</Link></p>
        </Box>
      </div>
  );
}

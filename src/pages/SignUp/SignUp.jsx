import React from "react";
import "./SignUp.css";

import { Button } from "../../components/Button";
import { SemiTitle } from "../../components/Title";
import { StyledTextField } from "../../components/Input";

import { MenuItem, Box, Link } from "@mui/material";

function SignUp() {
  const roles = [

    {
      value: "Team member",
      label: "Team member",
    },
    {
      value: "Student",
      label: "Student",
    },
  ];

  return (
    <div >
      
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 2, width: "30ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <SemiTitle>REGISTRATION PAGE</SemiTitle>
        <div>
          <StyledTextField
            id="FirstName"
            label="First Name"
            variant="filled"
            size="small"
            required
          />
          <StyledTextField
            id="LastName"
            label="Last Name"
            variant="filled"
            size="small"
            required
          />
        </div>
        <div>
          <StyledTextField
            id="email"
            label="Email"
            variant="filled"
            size="small"
            required
          />
          <StyledTextField
            id="Role"
            label="Role"
            variant="filled"
            size="small"
            sx={{ minWidth: 130 }}
            select
          >
            {roles.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </StyledTextField>
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
            id="password"
            label="Confirm Password"
            variant="filled"
            size="small"
            type="password"
            required
          />
        </div>
        <div className="submit">
          <Button>Register</Button>
          <p>Already a member? <Link component="button">Sign In</Link></p>
        </div>
      </Box>
    </div>
  );
}

export default SignUp;

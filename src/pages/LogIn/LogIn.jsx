import React from "react";
import "./LogIn.css";


import {Button} from '../../components/Button';
import {SemiTitle} from '../../components/Title';
import {StyledTextField} from '../../components/Input';

import {Divider, Link} from '@mui/material';

const styledDivider = {
  width: '400px',
}

function LogIn() {

  return (
    <div>
      <SemiTitle>LOGIN PAGE</SemiTitle>
      <div className="form">
      <StyledTextField  id="" label="Email Address" required size="small" variant="filled" />
      <StyledTextField className="input" id="filled-basic" label="Password"  type="password" required  size="small" variant="filled" />
      <Link component="button" to="/forgot-password">Forgot Password?</Link>
      </div>
      <div className="submit">
      <Button>Login Now</Button>
      <Divider  sx={styledDivider}/>
      <Button color={"#211d42"} background={"#ffffff"} border={"#211D42"}>Register</Button>
      </div>
    </div>
  );
}

export default LogIn;
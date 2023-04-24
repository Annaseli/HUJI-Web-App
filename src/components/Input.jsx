import styled from "styled-components";
import { TextField } from "@mui/material";


export const StyledTextField = styled(TextField)`
& label.Mui-focused {
  color: #211D42;
}
'& .MuiInputBase-input': {
  color: #211D42;
}
& .MuiFilledInput-root {
  border-color:  #211D42 !important;
  color: #211D42 !important;

  &.Mui-focused fieldset {
    color: #211D42;
  }
  &::after {
    border-color: #211D42;
  }
}
`;
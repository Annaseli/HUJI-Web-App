import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import HomePage from './pages/HomePage/HomePage';
import TopBar from "./TopBar";
import ResponsiveTopBar from "./ResponsiveTopBar";

const THEME = createTheme({
  typography: {
    a: {
      fontFamily: `Poppins, sans-serif`,
    },
   fontFamily: `Poppins, sans-serif`,
  }
});

function App() {
  return (
    <div className="App">
      <ThemeProvider  theme={THEME}>
          <ResponsiveTopBar/>
        <HomePage/>
      </ThemeProvider>
    </div>
  );
}

export default App;

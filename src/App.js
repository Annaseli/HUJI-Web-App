import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import HomePage from './pages/HomePage/HomePage';

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
        <HomePage></HomePage>
      </ThemeProvider>
    </div>
  );
}

export default App;

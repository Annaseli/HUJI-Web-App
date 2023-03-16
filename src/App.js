import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import useAuthContext from './hooks/useAuthContext';
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"

// pages & components
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Navbar from './components/Navbar';

export default function App() {
  const { user, authIsReady } = useAuthContext()

  return (   
    <div className="App">  
      { authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route 
              path="/" 
              element={ user ? <Home /> : <Navigate to="/login" />}
            />
            <Route 
              path="/login" 
              element={ user ? <Navigate to="/" /> : <Login />}
            />
            <Route 
              path="/signup" 
              element={ user ? <Navigate to="/" /> : <Signup />}
            />                            
          </Routes>
        </BrowserRouter>    
      )} 
      
    </div>
  );
}


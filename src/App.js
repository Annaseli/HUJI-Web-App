import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useContext, useState, useEffect } from "react"
import { AuthContext } from "./context/AuthContext"
import { projectAuth } from './firebase/config';

// pages & components
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Navbar from './components/Navbar';

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = projectAuth.onAuthStateChanged((user) => {
      setUser(user);
      console.log("currentUser", user);
    });

    setTimeout(() => {
      setIsLoading(false); // set isLoading to false when done
    }, 2000);

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (   
    <div className="App">  
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
    </div>
  );
}



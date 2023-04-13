import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from "react"
import { projectAuth } from './firebase/config';

// styles
import './App.css';

// pages & components & hooks
import HomePage from './pages/homePage/HomePage';
//import Home from './pages/home/Home';
import LogIn from './pages/LogIn/LogIn';
import ForgotPassword from "./pages/LogIn/ForgotPassword";
import SignUp from './pages/SignUp/SignUp';
import MyReservations from './pages/myReservations/MyReservations';
import AllReservations from './pages/allReservations/AllReservations';
import AboutUs from './pages/AboutUs/AboutUs';
import ApproveUsers from './pages/Admin/ApproveUsers';
import ManageUsers from './pages/Admin/ManageUsers';
import AddRooms from "./pages/rooms/AddRooms";
import Articles from './pages/articles/Articles';
import ContactUs from './pages/contactUs/ContactUs';
import NavBar from './components/NavBar';
import { isAdmin } from './pages/Admin/isAdmin';
import {useCollection} from "./hooks/useCollection";
import AddAboutUs from "./pages/centerContent/AddAboutUs";
import AddArticle from "./pages/centerContent/AddArticle";

const THEME = createTheme({
    typography: {
        a: {
            fontFamily: `Poppins, sans-serif`,
        },
        fontFamily: `Poppins, sans-serif`,
    }
});

// function App() {
//   return (
//     <div className="App">
//       <ThemeProvider  theme={THEME}>
//           <ResponsiveTopBar/>
//         <HomePage/>
//       </ThemeProvider>
//     </div>
//   );
// }

export default function App() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { docs: allUsers } = useCollection('Users')

    useEffect(() => {
        const unsubscribe = projectAuth.onAuthStateChanged((user) => {
            setUser(user);
        });

        setTimeout(() => {
            setIsLoading(false); // set isLoading to false when done
        }, 1000);

        return () => unsubscribe();
    }, []);


    // TODO: front - style this
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="App">
            <ThemeProvider theme={THEME}>
                <BrowserRouter>
                    <NavBar />
                    <Routes>
                        <Route
                            path="/"
                            element={ user ? <HomePage /> : <Navigate to="/logIn" />}
                        />
                        <Route
                            path="/bookAReservation"
                            element={ user ? <HomePage /> : <Navigate to="/logIn" />}
                        />
                        <Route
                            path="/myReservations"
                            element={ user ? <MyReservations /> : <Navigate to="/logIn" />}
                        />
                        <Route
                            path="/aboutUs"
                            element={ user ? <AboutUs /> : <Navigate to="/logIn" />}
                        />
                        <Route
                            path="/articles"
                            element={ user ? <Articles /> : <Navigate to="/logIn" />}
                        />
                        <Route
                            path="/contactUs"
                            element={ user ? <ContactUs /> : <Navigate to="/logIn" />}
                        />
                        <Route
                            path="/approveUsers"
                            element={ user && isAdmin() ? <ApproveUsers /> : <Navigate to="/logIn" />}
                        />
                        <Route
                            path="/manageUsers"
                            element={ user && isAdmin() ? <ManageUsers /> : <Navigate to="/logIn" />}
                        />
                        <Route
                            path="/addRooms"
                            element={ user && isAdmin() ? <AddRooms /> : <Navigate to="/logIn" />}
                        />
                        <Route
                            path="/allReservations"
                            element={ user && isAdmin() && allUsers ? <AllReservations allUsers={allUsers}/> : <Navigate to="/logIn" />}
                        />
                        <Route
                            path="/addAboutUs"
                            element={ user && isAdmin() ? <AddAboutUs /> : <Navigate to="/logIn" />}
                        />
                        <Route
                            path="/addArticle"
                            element={ user && isAdmin() ? <AddArticle /> : <Navigate to="/logIn" />}
                        />
                        <Route
                            path="/logIn"
                            element={ user ? <Navigate to="/" /> : <LogIn />}
                        />
                        <Route
                            path="/forgotPassword"
                            element={ user ? <Navigate to="/" /> : <ForgotPassword />}
                        />
                        <Route
                            path="/signUp"
                            element={ user ? <Navigate to="/" /> : <SignUp />}
                        />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
}




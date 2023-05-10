import {ThemeProvider, createTheme} from '@mui/material/styles';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import {useState, useEffect} from "react"
import {getAuth} from "firebase/auth";

// styles
import './App.css';

// pages & components & hooks
import HomePage from './pages/homePage/HomePage';
import LogIn from './pages/LogIn/LogIn';
import ForgotPassword from "./pages/LogIn/ForgotPassword";
import SignUp from './pages/SignUp/SignUp';
import MyReservations from './pages/myReservations/MyReservations';
import AllReservations from './pages/allReservations/AllReservations';
import AboutUs from './pages/AboutUs/AboutUs';
import ApproveUsers from './pages/Admin/ApproveUsers';
import ManageUsers from './pages/Admin/ManageUsers';
import AddRooms from "./pages/rooms/AddRooms";
import ContactUs from './pages/contactUs/ContactUs';
import NavBar from './components/NavBar';
import checkUserType from "./pages/Admin/checkUserType";
import {useCollection} from "./hooks/useCollection";
import AddAboutUs from "./pages/centerContent/AddAboutUs";
import EditRoomsSettings from "./pages/Admin/EditRoomsSettings";
import UsageReport from "./pages/Admin/UsageReport";
import ReportProblem from "./pages/ReportProblem/ReportProblem";
import ProblemsList from "./pages/Admin/ProblemsList";
import WaitForApproval from "./pages/SignUp/WaitForApproval";

const THEME = createTheme({
    typography: {
        a: {
            fontFamily: `Poppins, sans-serif`,
        },
        fontFamily: `Poppins, sans-serif`,
    }
});

// TODO: what happens with 404 problem?
export default function App() {
    const [user, setUser] = useState(null);
    const [isCancelled, setIsCancelled] = useState(false)
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false)
    const [userType, setUserType] = useState("")
    const {docs: allUsers, error: err} = useCollection("Users")
    // if (!isCancelled) {
    //     setIsPending(false)
    //     if (err) {
    //         setError(err)
    //     }
    // }

    useEffect(() => {
        setError(null)
        const unsub = getAuth().onAuthStateChanged((user) => {
            setUser(user);
        });

        setTimeout(() => {
            setIsPending(false);
        }, 500);

        return () => unsub();
    }, []);

    useEffect(() => {
        setIsPending(true)
        setError(null)

        async function checkAdmin() {
            try {
                console.log("user.uid", user.uid)
                const res = await checkUserType(user.uid)
                setUserType(res)
                setIsAdmin(res === "Admin")

                if (!isCancelled) {
                    setError(null)
                    setIsPending(false)
                }
            } catch (error) {
                if (!isCancelled) {
                    setError(error.message || "unknown error occurred")
                    setIsPending(false)
                }
            }
        }

        user && checkAdmin()

        setTimeout(() => {
            setIsPending(false);
        }, 500);
        return () => setIsCancelled(true);
    }, [user])


    if (isPending) {
        return <div>Loading...</div>;
    }

    return (
        <div className="App">
            <ThemeProvider theme={THEME}>
                <BrowserRouter>
                    <NavBar isAdmin={isAdmin}/>
                        <Routes>
                        <Route
                            path="/"
                            element={user ? <HomePage userType={userType}/> : <Navigate to="/logIn"/>}
                        />
                        <Route
                            path="/aboutUs"
                            element={user ? <AboutUs/> : <Navigate to="/logIn"/>}
                        />
                        <Route
                            path="/contactUs"
                            element={user ? <ContactUs/> : <Navigate to="/logIn"/>}
                        />
                        <Route
                            path="/approveUsers"
                            element={
                                user
                                    ? isAdmin
                                    ? <ApproveUsers/>
                                    : <Navigate to="/"/>
                                    : <Navigate to="/logIn"/>
                            }
                        />
                        <Route
                            path="/manageUsers"
                            element={
                                user
                                    ? isAdmin
                                    ? <ManageUsers allUsers={allUsers}/>
                                    : <Navigate to="/"/>
                                    : <Navigate to="/logIn"/>
                            }
                        />
                        <Route
                            path="/addRooms"
                            element={
                                <AddRooms/>
                            }
                        />
                        <Route
                            path="/allReservations"
                            element={
                                user
                                    ? isAdmin
                                    ? <AllReservations allUsers={allUsers}/>
                                    : <Navigate to="/"/>
                                    : <Navigate to="/logIn"/>
                            }
                        />
                        <Route
                            path="/addAboutUs"
                            element={
                                user
                                    ? isAdmin
                                    ? <AddAboutUs/>
                                    : <Navigate to="/"/>
                                    : <Navigate to="/logIn"/>
                            }
                        />
                        <Route
                            path="/editRoomsSettings"
                            element={
                                user
                                    ? isAdmin
                                    ? <EditRoomsSettings/>
                                    : <Navigate to="/"/>
                                    : <Navigate to="/logIn"/>
                            }
                        />
                        <Route
                            path="/reportProblem"
                            element={
                                user
                                    ? isAdmin
                                    ? <ReportProblem/>
                                    : <ReportProblem/>
                                    : <ReportProblem/>
                            }
                        />
                        <Route
                            path="/problemsList"
                            element={
                                user
                                    ? isAdmin
                                    ? <ProblemsList/>
                                    : <Navigate to="/"/>
                                    : <Navigate to="/logIn"/>
                            }
                        />
                        <Route
                            path="/usageReport"
                            element={
                                <UsageReport/>
                            }
                        />
                        <Route
                            path="/logIn"
                            element={user ? <Navigate to="/"/> : <LogIn/>}
                        />
                        <Route
                            path="/forgotPassword"
                            element={user ? <Navigate to="/"/> : <ForgotPassword/>}
                        />
                        <Route
                            path="/signUp"
                            element={user ? <Navigate to="/"/> : <SignUp/>}
                        />
                        <Route
                            path="/waitingForApproval"
                            element={ <WaitForApproval/>}
                        />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
            {error && <p>{error}</p>}
        </div>
    )
}




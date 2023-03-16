import { Link } from "react-router-dom"
import { useLogout } from '../hooks/useLogout'
import useAuthContext from "../hooks/useAuthContext"

// styles
//import styles from 

export default function Navbar() {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    return (
        //<nav className={StyleSheet.navbar}>
        //<li className={StyleSheet.title}>HUJI Innovate Center</li>
        <nav>
            <ul>               
                <li>HUJI Innovate Center</li>
                {!user && (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                    </>
                )}              
                {user && (
                    <>
                        <li>hello, {user.displayName}</li>
                        <li>
                            <button className="btn" onClick={logout}>Logout</button>
                        </li>
                    </>                   
                )}              
            </ul>
        </nav>
    )
}
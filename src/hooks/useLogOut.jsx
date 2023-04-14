import { useEffect, useState } from 'react'

// firebase imports
import { projectAuth } from '../config'
//import useAuthContext from './useAuthContext'
import { signOut } from 'firebase/auth'
import { getAuth } from "firebase/auth";

export const useLogOut = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    //const { dispatch } = useAuthContext()

    const logOut = async () => {
        setError(null)
        setIsPending(true)

        // sign the user out
        try {
            await signOut(getAuth())
            console.log('user signed out')
            //dispatch({ type: 'LOGOUT' })

            // Any time we are using a hook that updates states in a component, we should use a clean up
            // function in case that component that uses that hook unmaunts (going to other component in the middle of of the process)
            // update state
            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }

        } catch(error) {
            if (!isCancelled) {
                console.log(error.message)
                setError(error.message)
                setIsPending(false)
            }
        }
    }

    // If we use the useLogout hook in a component then the useEffect function will fire just once
    // because the dependency array is empty. Returning a cleanup function inside the useEffect.
    // setIsCancelled will be fired only when unmounted
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { logOut, isPending, error }
}
import { async } from '@firebase/util'
import { useEffect, useState } from 'react'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const logout = async () => {
        setError(null)
        setIsPending(true)

        // sign the user out
        try {
            await projectAuth.signOut()

            // dispatch logout action
            dispatch({ type: 'LOGOUT' })

            // Any time we are using a hook that updates states in a component, we should use a clean up 
            // function in case that component that uses that hook unmaunts (going to other component in the middle of of the process)
            // update state
            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }           
        }
        catch(error) {
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

    return { logout, isPending, error }
}
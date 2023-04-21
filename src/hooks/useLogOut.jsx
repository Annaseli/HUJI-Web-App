import { useEffect, useState } from 'react'

// firebase imports
import { signOut, getAuth } from 'firebase/auth'

export const useLogOut = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    const logOut = async () => {
        setError(null)
        setIsPending(true)

        try {
            await signOut(getAuth())

            // Any time we are using a hook that updates states in a component, we should use a clean up
            // function in case that component that uses that hook unmaunts (going to other component in the middle of the process)
            // update state
            if (!isCancelled) {
                setError(null)
                setIsPending(false)
            }

        } catch(error) {
            if (!isCancelled) {
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

    return { logOut, error, isPending }
}
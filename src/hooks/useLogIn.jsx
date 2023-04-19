import { useEffect, useState } from 'react'

// firebase imports
import { signInWithEmailAndPassword } from "firebase/auth"
import { getAuth } from "firebase/auth";

export const useLogIn = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    const logIn = async (email, password) => {
        setError(null)
        setIsPending(true)
        try {
            const res = await signInWithEmailAndPassword(getAuth(), email, password);

            // Any time we are using a hook that updates states in a component, we should use a clean-up
            // function in case that component that uses that hook unmaunts (going to other component in the middle of the process)
            // update state
            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }

        } catch(error) {
            if (!isCancelled) {
                setError(error.message || "unknown error accured")
                setIsPending(false)
            }
        }
    }

    // If we use the useLogin hook in a component then the useEffect function will fire just once
    // because the dependency array is empty. Returning a cleanup function inside the useEffect.
    // setIsCancelled will be fired only when unmounted
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { logIn, isPending, error }
}
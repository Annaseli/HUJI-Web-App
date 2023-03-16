import { async } from '@firebase/util'
import { useEffect, useState } from 'react'

// firebase imports
import { projectAuth } from '../firebase/config'
import useAuthContext from './useAuthContext'
import { signInWithEmailAndPassword } from "firebase/auth"

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const login = (email, password) => {
        setError(null)
        setIsPending(true)
        signInWithEmailAndPassword(projectAuth, email, password)
            .then((res) => {
                console.log('user logged in:', res.user)
                dispatch({ type: 'LOGIN', payload: res.user })
            })
            .catch((err) => {
                setError(err.message)
            })

        // // sign the user out
        // try {
        //     const res = await projectAuth.signInWithEmailAndPassword(email, password)

        //     // dispatch logout action
        //     dispatch({ type: 'LOGIN', payload: res.user })

        //     // Any time we are using a hook that updates states in a component, we should use a clean up 
        //     // function in case that component that uses that hook unmaunts (going to other component in the middle of of the process)
        //     // update state
        //     if (!isCancelled) {
        //         setIsPending(false)
        //         setError(null)
        //     }           
        // }
        // catch(error) {
        //     if (!isCancelled) {
        //         console.log(error.message)
        //         setError(error.message)
        //         setIsPending(false)
        //     }            
        // }
    }

    // If we use the useLogout hook in a component then the useEffect function will fire just once
    // because the dependency array is empty. Returning a cleanup function inside the useEffect.
    // setIsCancelled will be fired only when unmounted
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { login, isPending, error }
}
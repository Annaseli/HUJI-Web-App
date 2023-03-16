import { async } from '@firebase/util'
import { useState, useEffect } from 'react'

// firebase imports
import { projectAuth } from '../firebase/config'
import useAuthContext from './useAuthContext'
import { createUserWithEmailAndPassword } from "firebase/auth"

export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = (email, password) => {
        setError(null)
        setIsPending(true)
        createUserWithEmailAndPassword(projectAuth, email, password)
        .then((res) => {
            console.log('user signed up:', res.user)
            dispatch({ type: 'LOGIN', payload: res.user })
        })
        .catch((err) => {
            setError(err.message)
        })

        // try {
        //     // signup user
        //     const res = await createUserWithEmailAndPassword(auth, email, password)

        //     // if network connection is bad
        //     if (!res) {
        //         throw new Error('Could not complete signup')
        //     }
        //     // if there is a response but the email wasn't found in the users collection
        //     // TODO for back: need to separate between an email that is used by other account and email
        //     // that is stored in the users collections - maybe create 2 collections for it 
        //     // (pending for signup and users)
        //     // else if () {
        //     //     // TODO for back: need to send a registration request to the admin for this user
        //     //     throw new Error('This email is not registered in the innovate center,' + 
        //     //     'please wait for confirmation')               
        //     // }

        //     // add display name to user
        //     await res.user.updateProfile({ displayName})

        //     // dispatch login action
        //     dispatch({ type: 'LOGIN', payload: res.user })

        //     if (!isCancelled) {
        //         setIsPending(false)
        //         setError(null)
        //     }   
        // }
        // // an error if the password is not copliance to a standart , email has already been taken...
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

    return { signup, error, isPending }
}
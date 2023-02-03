import { async } from '@firebase/util'
import { useState } from 'react'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, displayName) => {
        setError(null)
        setIsPending(true)

        try {
            // signup user
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)

            // if network connection is bad
            if (!res) {
                throw new Error('Could not complete signup')
            }
            // if there is a response but the email wasn't found in the users collection
            // TODO for back: need to separate between an email that is used by other account and email
            // that is stored in the users collections - maybe create 2 collections for it 
            // (pending for signup and users)
            else if () {
                // TODO for back: need to send a registration request to the admin for this user
                throw new Error('This email is not registered in the innovate center,' + 
                'please wait for confirmation')               
            }

            // add display name to user
            await res.user.updateProfile({ displayName})

            // dispatch login action
            dispatch({ type: 'LOGIN', payload: res.user })

            setIsPending(false)
            setError(null)
        }
        // an error if the password is not copliance to a standart , email has already been taken...
        catch(error) {
            console.log(error.message)
            setError(error.message)
            setIsPending(false)
        }
    }

    return { signup, error, isPending }
}
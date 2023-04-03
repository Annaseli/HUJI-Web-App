import { useState, useEffect } from 'react'

// firebase imports
import { db, projectAuth } from '../firebase/config'
import useAuthContext from './useAuthContext'
import { createUserWithEmailAndPassword, updateUser, getAuth, updateProfile } from "firebase/auth"
import { collection, doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore'

export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    //const { dispatch } = useAuthContext()
    let resMapFromCurDay = {}

    const signup = async (email, password, displayName) => {
        setError(null)
        setIsPending(true)   

        try {
            const res = await createUserWithEmailAndPassword(projectAuth, email, password)

            // if network connection is bad
            if (!res) {
                throw new Error('Could not complete signup')
            }

            const user = res.user
            console.log('user signed up:', user)
            //dispatch({ type: 'LOGIN', payload: res.user })

            // add display name to user
            await updateProfile(projectAuth.currentUser, { displayName })
            console.log('displayName', displayName)

            const docRef = doc(collection(db, 'ConfirmedUsers'), email)
            const docSnap = await getDoc(docRef)
            if (docRef.exists) {
                const data = docSnap.data();
                const userType = data.userType

                // if exists add the user to "Users" collection   
                await setDoc(doc(collection(db, 'Users') , user.uid), {
                    userType,
                    resMapFromCurDay
                })

                // if exists delete this user from the ConfirmedUsers collection
                try {
                    await deleteDoc(docRef);
                    console.log('Document deleted successfully.');
                } catch (err) {
                    console.error('Error deleting document:', err);
                }

            } else {
                // TODO: back - send an email to the admin to ask for 
                //confimations to the user and add this to the pending list matan created
                // disable the user account in firebase Authentication - doesn't work!!!!!!!!!!!
                // TODO: front - let the user know that he is pending for approval
                console.log('No such email in ConfirmedUsers collection!');

                // disable the user from Authentication
                // try {
                //     //await getAuth().updateUser(user.uid, {disabled: true})
                //     await admin.auth().setCustomUserClaims(user.uid, { disabled: true });
                //     console.log("user disabled successfuly")
                // } catch (error) {
                //     console.log("an error in disabling the user", error.message)
                // }  
                  
            }

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

    return { signup, error, isPending }
}
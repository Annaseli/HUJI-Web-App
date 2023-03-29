import { async } from '@firebase/util'
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
    const { dispatch } = useAuthContext()
    let resMapFromCurDay = {}

    const signup = async (email, password) => {
        setError(null)
        setIsPending(true)   
        const res = await createUserWithEmailAndPassword(projectAuth, email, password)
        try {
            console.log('user signed up:', res.user)
            dispatch({ type: 'LOGIN', payload: res.user })

            const docRef = doc(collection(db, 'ConfirmedUsers'), email)
            const docSnap = await getDoc(docRef)
            if (docRef.exists) {
                console.log("docRef", docRef);
                const data = docSnap.data();
                const userType = data.userType

                // if exists delete this doc and add the user to "Users" collection
                const ref = collection(db, 'Users')       
                await setDoc(doc(ref, email), {
                    userType,
                    resMapFromCurDay
                })

                try {
                    await deleteDoc(docRef);
                    console.log('Document deleted successfully.');
                  } catch (error) {
                    console.error('Error deleting document:', error);
                  }

            } else {
                // TODO: back - send an email to the admin to ask for confimations to the user
                // disable the user account in firebase Authentication - doesn't work!!!!!!!!!!!
                // TODO: front - let the user know that he is pending for approval
                console.log('No such document!');

                // try {
                //     await updateProfile(getAuth(), res.user.uid, {disabled: true})
                //     console.log("user disabled successfuly")
                // } catch (error) {
                //     console.log("an error in disabling the user", error.message)
                // }  
                
                // updateProfile(getAuth(), res.user, {disabled: true})
                //     .then((userRecord) => {
                //         // See the UserRecord reference doc for the contents of userRecord.
                //         console.log('Successfully updated user', userRecord.toJSON());
                //     })
                //     .catch((error) => {
                //         console.log('Error updating user:', error);
                //     }); 
                
                // getAuth().updateUser(res.user.uid, {disabled: true})
                //     .then((userRecord) => {
                //         // See the UserRecord reference doc for the contents of userRecord.
                //         console.log('Successfully updated user', userRecord.toJSON());
                //         console.log("user disabled successfuly")
                //     })
                //     .catch((error) => {
                //         console.log('Error updating user:', error);
                //     });
            }
        } catch (err)  {
            setError(err.message)
        }

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
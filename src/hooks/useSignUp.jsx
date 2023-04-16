import { useState, useEffect } from 'react'
import { getFunctions, httpsCallable } from "firebase/functions";

// firebase imports
import { db, projectAuth } from '../firebase/config'
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth"
import {collection, doc, setDoc, getDoc, deleteDoc, addDoc} from 'firebase/firestore'

import PendingUser from "../pages/SignUp/PendingUser";

// TODO - use the useFirestore functions instead for the try catch for await funcs
export const useSignUp = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    const signUp = async (email, password, displayName) => {
        setError(null)
        setIsPending(true)
        try {
            // sign the user up to firebase
            const res = await createUserWithEmailAndPassword(getAuth(), email, password)
            // if network connection is bad
            // TODO: check if I need it or maybe I catch it in the catch block. If I need it then
            //need to do the same with all the rest await funcs
            if (!res) {
                throw new Error('Could not complete SignUp')
            }
            const user = res.user
            console.log('user signed up:', user)

            // add display name to user
            await updateProfile(user, { displayName })

            const docRef = doc(collection(db, 'ConfirmedUsers'), email)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                const data = docSnap.data();
                const userType = data.userType

                // if the user exists in ConfirmedUsers - add the user to "Users" collection
                await setDoc(doc(collection(db, 'Users') , user.uid), {
                    userType,
                    email,
                    name: displayName,
                    reservations: {}
                })

                // if the user exists in ConfirmedUsers - delete this user from the ConfirmedUsers collection
                await deleteDoc(docRef);
            } else {
                console.log('No such email in ConfirmedUsers collection!');
                // disable the user from Authentication
                //TODO: after deploy do this:
                // const functions = getFunctions();
                // const enableDisableUser = httpsCallable(functions, 'enableDisableUser');
                // try {
                //     const result = await enableDisableUser({ uid: user.uid, disable: true })
                //     console.log(result.data); // 'Successfully updated user'
                // } catch(error) {
                //     console.log('Error updating user:', error);
                //     setError(error.message)
                // }

                // add the user to the PendingUsers collection
                await setDoc(doc(collection(db, 'PendingUsers') , email), {
                    uid: user.uid,
                    email,
                    displayName
                })
            }

            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }

        }
        catch(error) {
            if (!isCancelled) {
                console.log("error:", error.message)
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

    return { signUp, error, isPending }
}
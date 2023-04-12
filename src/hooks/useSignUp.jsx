import { useState, useEffect } from 'react'

// firebase imports
import { db, projectAuth } from '../firebase/config'
import { createUserWithEmailAndPassword, updateUser, getAuth, updateProfile } from "firebase/auth"
import {collection, doc, setDoc, getDoc, deleteDoc, addDoc} from 'firebase/firestore'
import {Link} from "react-router-dom";

import PendingUser from "../pages/SignUp/PendingUser";

export const useSignUp = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    const signUp = async (email, password, displayName) => {
        setError(null)
        setIsPending(true)

        try {
            const docRef = doc(collection(db, 'ConfirmedUsers'), email)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                const data = docSnap.data();
                const userType = data.userType

                // if the user exists in ConfirmedUsers - sign the user up to firebase
                const res = await createUserWithEmailAndPassword(projectAuth, email, password)
                // if network connection is bad
                if (!res) {
                    throw new Error('Could not complete SignUp')
                }

                const user = res.user
                console.log('user signed up:', user)

                // add display name to user
                await updateProfile(projectAuth.currentUser, { displayName })

                // if the user exists in ConfirmedUsers - add the user to "Users" collection
                await setDoc(doc(collection(db, 'Users') , user.uid), {
                    userType,
                    email,
                    resMapFromCurDay: {}
                })

                // if the user exists in ConfirmedUsers - delete this user from the ConfirmedUsers collection
                try {
                    await deleteDoc(docRef);
                    console.log('Document deleted successfully from ConfirmedUsers');
                } catch (err) {
                    console.error('Error deleting document:', err);
                }
            } else {
                // TODO: back - send an email to the Admin to ask for and add the user to the approveUser
                //  form front and dont show this user the home page (in routes need to check that user isn't disabled before showing the home page)
                //confimations to the user and add this to the pending list matan created
                // disable the user account in firebase Authentication - doesn't work!!!!!!!!!!!
                console.log('No such email in ConfirmedUsers collection!');
                // TODO: front - let the user know that he is pending for approval in this page:
                //PendingUser()


                // disable the user from Authentication
                // try {
                //     //await getAuth().updateUser(user.uid, {disabled: true})
                //     await Admin.auth().setCustomUserClaims(user.uid, { disabled: true });
                //     console.log("user disabled successfuly")
                // } catch (error) {
                //     console.log("an error in disabling the user", error.message)
                // }


                // add the user to the pending users collection
                // TODO - back: check functionality
                await setDoc(doc(collection(db, 'PendingUsers') , email), {
                    email,
                    displayName,
                    password
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
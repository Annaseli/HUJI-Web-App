import { useState, useEffect } from "react"
import { getFunctions, httpsCallable } from "firebase/functions";

// firebase imports
import { db } from "../firebase/config"
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth"
import {collection, doc, setDoc, getDoc, deleteDoc, addDoc} from "firebase/firestore"

// TODO - use the useFirestore functions instead for the try catch for await funcs
export const useSignUp = () => {
    console.log("useSignUp");
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    const signUp = async (email, password, displayName) => {
        setError(null)
        setIsPending(true)
        try {
            // sign the user up to firebase
            const res = await createUserWithEmailAndPassword(getAuth(), email, password)
            const user = res.user

            // add display name to user
            await updateProfile(user, { displayName })
            const docRef = doc(collection(db, "ConfirmedUsers"), email)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                const data = docSnap.data();
                // if the user exists in ConfirmedUsers - add the user to "Users" collection
                await setDoc(doc(collection(db, "Users") , user.uid), {
                    userType: data.userType,
                    email,
                    name: displayName,
                    userReservations: {}
                })

                // if the user exists in ConfirmedUsers - delete this user from the ConfirmedUsers collection
                await deleteDoc(docRef);
            } else {
                console.log("No such email in ConfirmedUsers collection!");

                // disable the user from Authentication
                // TODO: after deploy do this: also check that the user can't see any page
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
                await setDoc(doc(collection(db, "PendingUsers") , email), {
                    uid: user.uid,
                    email,
                    displayName
                })
            }

            if (!isCancelled) {
                setError(null)
                setIsPending(false)
            }

        }
        catch(error) {
            if (!isCancelled) {
                const errorMessage = error.message.replace(/^Firebase: /i, "");
                setError(errorMessage || "unknown error occurred")
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
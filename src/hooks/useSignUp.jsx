import { useState, useEffect } from "react"

// firebase imports
import { getFunctions, httpsCallable } from "firebase/functions";
import { db } from "../firebase/config"
import {createUserWithEmailAndPassword, getAuth, signOut, updateProfile} from "firebase/auth"
import {collection, doc, setDoc, getDoc, deleteDoc} from "firebase/firestore"
import { useNavigate } from 'react-router-dom';

export const useSignUp = (setShowWaitingForApproval) => {
    console.log("useSignUp");
    const navigate = useNavigate();
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    const signUp = async (email, password, displayName) => {
        setError(null)
        setIsPending(true)
        try {
            const auth =  getAuth();

            // sign the user up to firebase
            const res = await createUserWithEmailAndPassword(auth, email, password)
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
                // const enableDisable = httpsCallable(functions, "enableDisable");
                // console.log("before try");
                // try {
                //     console.log("after try");
                //     const result = await enableDisable({ uid: user.uid, disable: true })
                //     console.log("result.data", result); // 'Successfully updated user'
                // } catch(error) {
                //     console.log("Error updating user:", error);
                //     setError(error.message)
                // }

                // add the user to the PendingUsers collection
                await setDoc(doc(collection(db, "PendingUsers") , email), {
                    uid: user.uid,
                    email,
                    displayName
                })
                setShowWaitingForApproval(true)
                await signOut(auth)
                console.log("done signOut ");
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
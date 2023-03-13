import { useEffect, useState } from "react";
import { db } from "../firebase/config";

// Takes in a collection and updating the documents to match whatever documents are inside the collection 
// in that moment in time.
export const useCollection = (collection) => {
    const [docs, setDocs] = useState(null)
    const [error, setError] = useState(null)

    useEffect (() => {
        let ref = db.collection(collection)

        // This function is gonna fire a function for us every time we get a snapshot back from firestore
        // collection. We get a snapshot back once initially when we first make the connection and it sends
        // us back the snapshot so we can recieve it inside the onSnapshot function. That snapshot represents
        // a specific collection in a the moment in time when we first connect to that connection. And then
        // it's going to fire this func again whenever the firestore collection changes. That's why we can update
        // the setDocs state every time we get a snapshot back. 
        const unsub = ref.onSnapshot((snapshot) => {
            let results = []
            // an array of docs from that snapshot
            snapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id })
            });

            // update state
            setDocs(results)
            setError(null)
        }, (error) => {
            console.log(error)
            setError('Could not fetch the data')
        })

        // unsubscribe on unmount - if we move away from this page we are no longer listening for a snapshot
        // events i.e no longer updating states when we get them.
        return () => unsub()

    }, [collection])

    return {docs, error}
}